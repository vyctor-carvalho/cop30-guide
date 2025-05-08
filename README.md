#  Angel Visitor API

API RESTful desenvolvida com **Node.js**, **TypeScript**, **Express**, **SQLite** e **TypeORM**, com foco no gerenciamento de **eventos** e **presenças** durante a **COP-30** em Belém. A aplicação permite a interação de diferentes tipos de usuários — `admin`, `angel` e `visitor` — com funcionalidades específicas para cada papel.

---

## Tecnologias Utilizadas

- Node.js
- Express
- TypeScript
- TypeORM
- SQLite
- Bcrypt
- JWT
- Class-validator

---

## Como Rodar o Projeto

1. **Clone o repositório**:
   ```bash
   git clone https://github.com/vyctor-carvalho/cop30-guide.git
   cd angel-visitor-api
   ```


2. **Instale as dependências**:
   ```bash
   npm install
   ```

3. **Configure o banco de dados** em `src/data-source.ts` conforme necessário.

4. **Rode as migrações**:
    ```bash
    npm run migration:run
    ```

5. **Inicie a aplicação**:

   ```bash
   npm run dev
   ```

---

## Usuário Admin

Para facilitar testes, você pode inserir manualmente um admin no banco de dados com o seguinte comando SQL:

```sql
INSERT INTO user (id, name, role, email, password)
VALUES (
  'a3f1c2b8-4d6e-4baf-9e4a-8d62c9ef1b22', 
  'Admin User', 
  'admin', 
  'admin@system.com', 
  '$2b$10$5zWYbLEayijeBXoEAlO59.DWEYUeZ5fjv9xd/lqXnTchmDw7wO/1W'
);
```

## Login


- POST /login
  ```json
  {
    "email": "admin@system.com",
    "password": "senhaSegura123"
  }
  ```

---

## Criar Usuário

- POST /users
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

---

## Criar Evento

- POST /events
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

---

## Registrar Presença

- POST /presence
  ```json
  {
    "visitorId": "a3f1c2b8-4d6e-4baf-9e4a-8d62c9ef1b22",
    "eventId": "7854eb92-ad5f-4bc5-8a42-71497e0dd608",
    "present": true
  }
  ```

---

## Endpoints Disponíveis

| Método | Rota        | Descrição                          | Acesso        |
| ------ | ----------- | ---------------------------------- | ------------- |
| GET    | `/`         | Página inicial                     | Público       |
| POST   | `/login`    | Autenticação de usuário            | Público       |
| POST   | `/users`    | Criação de novo usuário            | Público       |
| GET    | `/events`   | Listar eventos (por função)        | Autenticado   |
| POST   | `/events`   | Criar novo evento (admin ou angel) | Admin/Angel   |
| POST   | `/presence` | Registrar presença em evento       | Angel/Visitor |
| GET   | `/presence/event/:id` | Lista as presencas de um evento       | Autenticado |

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
📧 \[[vkvyctor180@gmail.com](mailto:vkvyctor180@gmail.com)]
🔗 GitHub: [https://github.com/vyctor-carvalho/](https://github.com/vyctor-carvalho/)


