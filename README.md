# Valex-api
An API to manage benefit cards. It's possible to create, recharge, activate and process shipping credits. (ongoing)

<p align="center">
  <a href="https://github.com/rafaelarissa/valex-api">
    <img src="./readme.png" alt="readme-logo" width="80" height="80">
  </a>

  <h3 align="center">
    Valex-api
  </h3>
</p>

## Usage

```bash
$ git clone https://github.com/rafaelarissa/valex-api.git

$ cd valex-api

$ npm install

$ npm run dev
```

API:

```
- POST /cards/create (autenticada)
    - Rota para cadastrar um novo cartão
    - headers: { x-api-key: lorem ipsum }
    - body: {
        "employeeId": 0,
        "type": "loremipsum",
    }
- PATCH /cards/:cardId/activate
    - Rota para ativar o cartão
    - headers: {}
    - body: {
        "cvv": "000",
        "senha": "000"
    }
- GET /cards/:id 
    - Rota para listar as transações e saldo de um cartão
    - headers: {}
    - body: {}
- PATCH /cards/:id/lock 
    - Rota para bloquear um cartão pelo id
    - headers: {}
    - body: {
        "password": "000"
    }
- PATCH /cards/:id/unlock
    - Rota para desbloquear um cartão pelo id
    - headers: {}
    - body: {
        "password": "000"
    }
- POST /cards/:id/recharge (autenticada)
    - Rota para recarregar um cartão pelo id
    - headers: { x-api-key: lorem ipsum }
    - body: {
      "amount": "0"
    }
- POST /cards/6/businesses/3/payments
    - Rota para fazer compras pelo id do cartão e do estabelecimento
    - headers: {}
    - body: {
      "amount": "0",
      "password": "0000"
    }

```
