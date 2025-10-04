# Crux API

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

<p align="center">
  Uma API robusta para gerenciamento de desenvolvedores, construída com NestJS.
</p>

<p align="center">
  <a href="https://github.com/samuelcsantana/crux/actions/workflows/ci.yml"><img src="https://github.com/samuelcsantana/crux/actions/workflows/ci.yml/badge.svg" alt="CI"></a>
  <a href="https://opensource.org/licenses/MIT"><img src="https://img.shields.io/badge/License-MIT-blue.svg" alt="License"></a>
</p>

---

## 📖 Sobre o Projeto

**Crux** é uma API RESTful poderosa e escalável, projetada para o gerenciamento de um cadastro de desenvolvedores. Ela fornece um conjunto completo de endpoints para operações de CRUD (Criar, Ler, Atualizar, Deletar). Construída com o moderno e eficiente framework [NestJS](https://nestjs.com/), serve como um excelente ponto de partida para aplicações mais complexas e como um portfólio técnico.

Este projeto foi desenvolvido como uma demonstração de habilidades em desenvolvimento backend, aplicando as melhores práticas em design de APIs, validação de dados e estrutura de aplicação.

### ✨ Tecnologias Utilizadas

*   **[NestJS](https://nestjs.com/)**: Um framework Node.js progressivo para construir aplicações server-side eficientes e escaláveis.
*   **[TypeScript](https://www.typescriptlang.org/)**: Superset de JavaScript que adiciona tipagem estática opcional.
*   **[TypeORM](https://typeorm.io/)**: Um ORM que pode rodar em diversas plataformas e suporta TypeScript e JavaScript.
*   **[SQLite](https://www.sqlite.org/index.html)**: Um banco de dados SQL embutido, leve e que não necessita de um servidor.
*   **[Class Validator](https://github.com/typestack/class-validator)**: Biblioteca para validação de dados baseada em decorators.
*   **[Jest](https://jestjs.io/)**: Framework de testes em JavaScript com foco em simplicidade.

---

## 🚀 Como Começar

Siga as instruções abaixo para obter uma cópia do projeto e executá-la em sua máquina local para desenvolvimento e testes.

### ✅ Pré-requisitos

Certifique-se de que você tem os seguintes softwares instalados:

*   [Node.js](https://nodejs.org/en/) (versão 18 ou superior)
*   [npm](https://www.npmjs.com/) (geralmente vem com o Node.js)

### 📦 Instalação

1.  Clone o repositório para a sua máquina local:
    ```sh
    git clone https://github.com/samuelcsantana/crux.git
    ```
2.  Navegue até o diretório do projeto:
    ```sh
    cd crux
    ```
3.  Instale as dependências do projeto:
    ```sh
    npm install
    ```

---

## 💻 Uso da Aplicação

Após a instalação, você pode executar a aplicação em diferentes modos.

### 🔥 Modo de Desenvolvimento

Para executar a aplicação em modo de desenvolvimento com hot-reloading, use o comando abaixo. O servidor reiniciará automaticamente sempre que houver alterações no código.

```bash
npm run start:dev
```
A API estará disponível em `http://localhost:3000`.

### 🏭 Modo de Produção

Para construir e executar a aplicação em modo de produção, utilize os seguintes comandos:

```bash
# 1. Compila o projeto para JavaScript
npm run build

# 2. Inicia o servidor em modo de produção
npm run start:prod
```

---

## 🧪 Executando os Testes

O projeto possui uma suíte de testes para garantir a qualidade e o funcionamento correto da API.

```bash
# Executa os testes unitários
npm run test

# Executa os testes end-to-end (E2E)
npm run test:e2e

# Gera um relatório de cobertura de testes
npm run test:cov
```

---

## Endpoints da API

A API fornece os seguintes endpoints para gerenciar os desenvolvedores:

### `POST /developers`

Cria um novo desenvolvedor.

**Corpo da Requisição (Body):**
```json
{
  "name": "Ada Lovelace",
  "email": "ada.lovelace@example.com",
  "dateOfBirth": "1815-12-10"
}
```

**Resposta de Sucesso (201 Created):**
```json
{
  "id": "some-unique-id",
  "name": "Ada Lovelace",
  "email": "ada.lovelace@example.com",
  "dateOfBirth": "1815-12-10"
}
```

**Resposta de Erro (400 Bad Request):**
```json
{
    "message": [
        "email must be an email",
        "dateOfBirth must be a valid ISO 8601 date string"
    ],
    "error": "Bad Request",
    "statusCode": 400
}
```

### `GET /developers`

Retorna uma lista com todos os desenvolvedores cadastrados.

**Resposta de Sucesso (200 OK):**
```json
[
  {
    "id": "some-unique-id-1",
    "name": "Ada Lovelace",
    "email": "ada.lovelace@example.com",
    "dateOfBirth": "1815-12-10"
  },
  {
    "id": "some-unique-id-2",
    "name": "Grace Hopper",
    "email": "grace.hopper@example.com",
    "dateOfBirth": "1906-12-09"
  }
]
```

### `GET /developers/:id`

Busca um desenvolvedor específico pelo seu `id`.

**Resposta de Sucesso (200 OK):**
```json
{
  "id": "some-unique-id",
  "name": "Ada Lovelace",
  "email": "ada.lovelace@example.com",
  "dateOfBirth": "1815-12-10"
}
```

**Resposta de Erro (404 Not Found):**
```json
{
  "message": "Developer with ID some-invalid-id not found",
  "error": "Not Found",
  "statusCode": 404
}
```

### `PATCH /developers/:id`

Atualiza os dados de um desenvolvedor existente. Apenas os campos enviados serão atualizados.

**Corpo da Requisição (Body):**
```json
{
  "name": "Ada King, Countess of Lovelace"
}
```

**Resposta de Sucesso (200 OK):**
```json
{
  "id": "some-unique-id",
  "name": "Ada King, Countess of Lovelace",
  "email": "ada.lovelace@example.com",
  "dateOfBirth": "1815-12-10"
}
```

### `DELETE /developers/:id`

Remove um desenvolvedor do banco de dados.

**Resposta de Sucesso (204 No Content):**
A resposta não contém corpo.

**Resposta de Erro (404 Not Found):**
```json
{
  "message": "Not Found",
  "statusCode": 404
}
```

---

## 📜 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.
