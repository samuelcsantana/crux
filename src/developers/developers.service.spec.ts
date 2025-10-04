import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateDeveloperDto } from './dto/create-developer.dto';
import { Developer } from './entities/developer.entity';
import { DevelopersService } from './developers.service';

// Helper function to create a developer-like object
const createDeveloper = (props: Partial<Developer>): Developer => {
  const dev = new Developer();
  return Object.assign(dev, props);
};

const developersList: Developer[] = [
  createDeveloper({ id: '1', name: 'John Doe', email: 'john.doe@example.com', dateOfBirth: '1990-01-01' }),
  createDeveloper({ id: '2', name: 'Jane Doe', email: 'jane.doe@example.com', dateOfBirth: '1992-02-02' }),
];

const createDeveloperDto: CreateDeveloperDto = {
  name: 'New Developer',
  email: 'new.dev@example.com',
  dateOfBirth: '1995-03-03',
};

const newDeveloperEntity = createDeveloper({ id: '3', ...createDeveloperDto });
const createdDeveloperEntity = createDeveloper(createDeveloperDto);

describe('DevelopersService', () => {
  let service: DevelopersService;
  let repository: Repository<Developer>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DevelopersService,
        {
          provide: getRepositoryToken(Developer),
          useValue: {
            create: jest.fn().mockReturnValue(createdDeveloperEntity),
            save: jest.fn().mockResolvedValue(newDeveloperEntity),
            find: jest.fn().mockResolvedValue(developersList),
            findOneBy: jest.fn().mockResolvedValue(developersList[0]),
            merge: jest.fn(),
            remove: jest.fn().mockResolvedValue(developersList[0]),
          },
        },
      ],
    }).compile();

    service = module.get<DevelopersService>(DevelopersService);
    repository = module.get<Repository<Developer>>(getRepositoryToken(Developer));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new developer', async () => {
      const developer = await service.create(createDeveloperDto);
      expect(repository.create).toHaveBeenCalledWith(createDeveloperDto);
      expect(repository.save).toHaveBeenCalledWith(createdDeveloperEntity);
      expect(developer).toEqual(newDeveloperEntity);
    });
  });

  describe('findAll', () => {
    it('should return an array of developers', async () => {
      const developers = await service.findAll();
      expect(repository.find).toHaveBeenCalled();
      expect(developers).toEqual(developersList);
    });
  });

  describe('findOne', () => {
    it('should return a single developer', async () => {
      const developer = await service.findOne('1');
      expect(repository.findOneBy).toHaveBeenCalledWith({ id: '1' });
      expect(developer).toEqual(developersList[0]);
    });

    it('should return null if developer not found', async () => {
      jest.spyOn(repository, 'findOneBy').mockResolvedValue(null);
      const developer = await service.findOne('99');
      expect(repository.findOneBy).toHaveBeenCalledWith({ id: '99' });
      expect(developer).toBeNull();
    });
  });

  describe('update', () => {
    it('should update a developer', async () => {
      const updateDto = { name: 'Johnathan Doe' };
      const existingDeveloper = developersList[0];
      const updatedDeveloper = createDeveloper({ ...existingDeveloper, ...updateDto });
      
      jest.spyOn(repository, 'findOneBy').mockResolvedValue(existingDeveloper);
      jest.spyOn(repository, 'save').mockResolvedValue(updatedDeveloper);

      const result = await service.update('1', updateDto);

      expect(repository.findOneBy).toHaveBeenCalledWith({ id: '1' });
      expect(repository.merge).toHaveBeenCalledWith(existingDeveloper, updateDto);
      expect(repository.save).toHaveBeenCalledWith(existingDeveloper);
      expect(result).toEqual(updatedDeveloper);
    });

    it('should return undefined if developer to update is not found', async () => {
      jest.spyOn(repository, 'findOneBy').mockResolvedValue(null);
      const result = await service.update('99', { name: 'Not Found' });
      expect(repository.findOneBy).toHaveBeenCalledWith({ id: '99' });
      expect(result).toBeUndefined();
    });
  });

  describe('remove', () => {
    it('should remove a developer', async () => {
      const existingDeveloper = developersList[0];
      jest.spyOn(repository, 'findOneBy').mockResolvedValue(existingDeveloper);
      jest.spyOn(repository, 'remove').mockResolvedValue(existingDeveloper);

      const result = await service.remove('1');

      expect(repository.findOneBy).toHaveBeenCalledWith({ id: '1' });
      expect(repository.remove).toHaveBeenCalledWith(existingDeveloper);
      expect(result).toEqual(existingDeveloper);
    });

    it('should return undefined if developer to remove is not found', async () => {
      jest.spyOn(repository, 'findOneBy').mockResolvedValue(null);
      const result = await service.remove('99');
      expect(repository.findOneBy).toHaveBeenCalledWith({ id: '99' });
      expect(result).toBeUndefined();
    });
  });
});
