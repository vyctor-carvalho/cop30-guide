# Angel Visitor API

API RESTful desenvolvida com **Node.js**, **TypeScript**, **Express**, **TypeORM** e **PostgreSQL**, com foco no gerenciamento de **eventos** e **presenças** durante a **COP-30** em Belém. A aplicação permite a interação de diferentes tipos de usuários — `admin`, `angel` e `visitor` — com funcionalidades específicas para cada papel.

---

## Tecnologias Utilizadas

* Node.js
* Express
* TypeScript
* TypeORM
* PostgreSQL
* Bcrypt
* JWT
* Class-validator
* Dotenv

---

## Arquivos de Ambiente

Para configurar variáveis sensíveis e evitar expô-las no controle de versão, o projeto utiliza um arquivo `.env` e um `.env.copy` de exemplo.

* **`.env.copy`**: modelo de arquivo, sem valores reais. Deve conter as chaves:

  ```env
  # Configurações do servidor
  SYSTEM_API_PORT=sua_porta_pra_api

  # Dados do banco
  DB_USER=seu_usuario
  DB_PORT=sua_porta
  DB_PASSWORD=sua_sneha
  DB_NAME=nome_do_banco

  # JWT
  JWT_SECRET=sua_chave_secreta
  JWT_EXPIRES_IN=1h
  ```

* **`.env`**: deve ser criado a partir do `.env.copy` e preenchido com seus valores locais. **NUNCA** commit esse arquivo no repositório.

---

## Como Rodar o Projeto

1. **Clone o repositório**:

   ```bash
   git clone https://github.com/vyctor-carvalho/angel-visitor-api.git
   cd angel-visitor-api
   ```

2. **Instale as dependências**:

   ```bash
   npm install
   ```

3. **Copie e configure o arquivo de ambiente**:

   ```bash
   cp .env.copy .env
   ```

   Edite o `.env` preenchendo as variáveis com valores adequados ao seu ambiente, especialmente `DB_PASSWORD`.

4. **Configure o banco de dados PostgreSQL**:

   * Crie um banco chamado `angel_visitor` (ou o definido em `DB_NAME`):

     ```bash
     psql -U postgres -c "CREATE DATABASE angel_visitor;"
     ```
   * Crie o usuário do banco, se ainda não existir (você pode usar o usuário postgres e não seguir esses passos):

     ```bash
     psql -U postgres -c "CREATE ROLE seu_usuario WITH LOGIN PASSWORD 'sua_senha_aqui';"
     psql -U postgres -c "ALTER ROLE seu_usuario CREATEDB;"
     ```
   * Ajuste o `pg_hba.conf` para `scram-sha-256` em conexões `local all all` e reinicie o Postgres, se necessário.

5. **Rode as migrações**:

   ```bash
   npm run migration:run
   ```

6. **Inicie a aplicação**:

   ```bash
   npm run dev
   ```

---

## Usuário Admin

Você pode inserir um admin manualmente, diretamente no banco de dados:

```sql
INSERT INTO "user" (id, name, role, email, password)
VALUES (
  'a3f1c2b8-4d6e-4baf-9e4a-8d62c9ef1b22',
  'Admin User',
  'admin',
  'admin@system.com',
  '$2b$10$5zWYbLEayijeBXoEAlO59.DWEYUeZ5fjv9xd/lqXnTchmDw7wO/1W'
);
```

---

## Endpoints Principais

### Autenticação

* **POST** `/login`

  ```json
  {
    "email": "admin@system.com",
    "password": "senhaSegura123"
  }
  ```

### Usuários

* **POST** `/users`

  ```json
  {
    "name": "Jorge Silas",
    "userLoginDataDTO": {
      "email": "jjjjamison@example.com",
      "password": "senha123"
    },
    "role": "visitor"
  }
  ```

### Eventos

* **GET** `/events` — Listar eventos (por função)
* **POST** `/events` — Criar evento (admin ou angel)

  ```json
  {
    "title": "Visita COP",
    "description": "Evento para visitantes",
    "location": {
      "postalCode": "66000000",
      "numberHouse": "123",
      "complement": "Apto 3B"
    },
    "idAngel": "a3f1c2b8-4d6e-4baf-9e4a-8d62c9ef1b22"
  }
  ```

### Presença

* **POST** `/presence` — Registrar presença

  ```json
  {
    "visitorId": "a3f1c2b8-4d6e-4baf-9e4a-8d62c9ef1b22",
    "eventId": "7854eb92-ad5f-4bc5-8a42-71497e0dd608",
    "present": true
  }
  ```

* **GET** `/presence/event/:id` — Lista as presenças de um evento

---

## Endpoints Disponíveis

| Método | Rota                  | Descrição                          | Acesso        |
| ------ | --------------------- | ---------------------------------- | ------------- |
| GET    | `/`                   | Página inicial                     | Público       |
| POST   | `/login`              | Autenticação de usuário            | Público       |
| POST   | `/users`              | Criação de novo usuário            | Público       |
| GET    | `/events`             | Listar eventos (por função)        | Autenticado   |
| POST   | `/events`             | Criar novo evento (admin ou angel) | Admin/Angel   |
| POST   | `/presence`           | Registrar presença em evento       | Angel/Visitor |
| GET    | `/presence/event/:id` | Lista as presenças de um evento    | Autenticado   |

---

## Tratamento de Erros

Todos os erros são tratados de forma centralizada por middleware:

* Erros de validação
* Falta de autenticação ou autorização
* Erros internos do servidor

As respostas seguem um padrão de mensagens claras com status apropriado.

---

## Autenticação e Autorização

* Autenticação via **JWT**
* Proteção de rotas por **papel** do usuário (`admin`, `angel`, `visitor`)
* Tokens devem ser enviados no header `Authorization: Bearer <token>`

---

## Observações

* Os IDs de usuários e eventos seguem o padrão **UUID v4**
* Papéis disponíveis:

  * `admin`: gerencia o sistema
  * `angel`: guia até 3 visitantes e cria eventos
  * `visitor`: participa de eventos e confirma presença

---

## Autor

Desenvolvido por Vyctor

📧 [vkvyctor180@gmail.com](mailto:vkvyctor180@gmail.com)
🔗 GitHub: [https://github.com/vyctor-carvalho/](https://github.com/vyctor-carvalho/)
