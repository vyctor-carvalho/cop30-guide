# Angel Visitor API

API construída com **Node.js**, **TypeScript**, **Express**, **TypeORM** e **SQLite**, voltada para o gerenciamento de eventos e presenças no contexto da COP-30 em Belém. O sistema permite que usuários com diferentes papéis (admin, angel e visitor) interajam com eventos e registrem presenças.

## 📦 Tecnologias Utilizadas

- Node.js
- Express
- TypeORM
- SQLite
- TypeScript
- Bcrypt
- JWT
- Class-validator

---

## 🚀 Como rodar o projeto

1. Instale as dependências:
```bash
npm install
```

2. Configure o banco de dados em `data-source.ts`.

3. Inicie a aplicação:


```bash
npm run dev
```

---

## 👮‍♂️ Usuário Admin

### Inserir usuário admin manualmente no banco:

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

### Login:

```json
{
  "email": "admin@system.com",
  "password": "senhaSegura123"
}
```

---

## 👤 Criar Usuário

### POST `/users`

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

## 📅 Criar Evento

### POST `/events`

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

## ✅ Registrar Presença

### POST `/presence`

```json
{
  "visitorId": "a3f1c2b8-4d6e-4baf-9e4a-8d62c9ef1b22",
  "eventId": "7854eb92-ad5f-4bc5-8a42-71497e0dd608",
  "present": true
}
```

---

## 📁 Estrutura das Rotas

* `GET /` - Página inicial
* `POST /login` - Login de usuário
* `POST /users` - Criar novo usuário
* `GET /events` - Listar eventos (restrito por role)
* `POST /events` - Criar evento (admin/angel)
* `POST /presence` - Registrar presença em um evento (restrito por role)

---

## ❗ Tratamento de Erros

Todos os erros são tratados de forma centralizada via middleware, retornando mensagens claras em caso de:

* Falhas de validação
* Acesso não autorizado
* Erros internos no servidor

---

## 📌 Observações

* O ID do usuário e do evento devem estar em formato UUID.
* Os papéis permitidos são: `admin`, `angel`, `visitor`.
* O sistema utiliza autenticação via JWT para proteger as rotas.

---

## 🔗 Autor

Desenvolvido por Vyctor

