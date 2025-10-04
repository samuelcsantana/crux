import { Test, TestingModule } from '@nestjs/testing';
import { DevelopersController } from './developers.controller';
import { DevelopersService } from './developers.service';
import { CreateDeveloperDto } from './dto/create-developer.dto';
import { UpdateDeveloperDto } from './dto/update-developer.dto';
import { Developer } from './entities/developer.entity';
import { NotFoundException } from '@nestjs/common';

const createDeveloperDto: CreateDeveloperDto = {
  name: 'John Doe',
  email: 'john.doe@example.com',
  dateOfBirth: '1990-01-01',
};

const mockDeveloper: Developer = {
  id: '1',
  ...createDeveloperDto,
  generateId: jest.fn(),
};

const developersList: Developer[] = [
  mockDeveloper,
  { id: '2', name: 'Jane Doe', email: 'jane.doe@example.com', dateOfBirth: '1992-02-02', generateId: jest.fn() },
];

describe('DevelopersController', () => {
  let controller: DevelopersController;
  let service: DevelopersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DevelopersController],
      providers: [
        {
          provide: DevelopersService,
          useValue: {
            create: jest.fn().mockResolvedValue(mockDeveloper),
            findAll: jest.fn().mockResolvedValue(developersList),
            findOne: jest.fn().mockResolvedValue(mockDeveloper),
            update: jest.fn().mockResolvedValue(mockDeveloper),
            remove: jest.fn().mockResolvedValue(mockDeveloper),
          },
        },
      ],
    }).compile();

    controller = module.get<DevelopersController>(DevelopersController);
    service = module.get<DevelopersService>(DevelopersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a developer', async () => {
      const result = await controller.create(createDeveloperDto);
      expect(service.create).toHaveBeenCalledWith(createDeveloperDto);
      expect(result).toEqual(mockDeveloper);
    });
  });

  describe('findAll', () => {
    it('should return an array of developers', async () => {
      const result = await controller.findAll();
      expect(service.findAll).toHaveBeenCalled();
      expect(result).toEqual(developersList);
    });
  });

  describe('findOne', () => {
    it('should return a single developer', async () => {
      const result = await controller.findOne('1');
      expect(service.findOne).toHaveBeenCalledWith('1');
      expect(result).toEqual(mockDeveloper);
    });

    it('should throw NotFoundException if developer is not found', async () => {
      jest.spyOn(service, 'findOne').mockResolvedValue(null);
      await expect(controller.findOne('99')).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('should update a developer', async () => {
      const updateDto: UpdateDeveloperDto = { name: 'Johnathan Doe' };
      const updatedDeveloper = { ...mockDeveloper, ...updateDto } as Developer;
      jest.spyOn(service, 'update').mockResolvedValue(updatedDeveloper);

      const result = await controller.update('1', updateDto);

      expect(service.update).toHaveBeenCalledWith('1', updateDto);
      expect(result).toEqual(updatedDeveloper);
    });

    it('should throw NotFoundException if developer to update is not found', async () => {
      jest.spyOn(service, 'update').mockResolvedValue(undefined);
      const updateDto: UpdateDeveloperDto = { name: 'Not Found' };
      await expect(controller.update('99', updateDto)).rejects.toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('should remove a developer', async () => {
      await controller.remove('1');
      expect(service.remove).toHaveBeenCalledWith('1');
    });

    it('should throw NotFoundException if developer to remove is not found', async () => {
      jest.spyOn(service, 'remove').mockResolvedValue(undefined);
      await expect(controller.remove('99')).rejects.toThrow(NotFoundException);
    });
  });
});
