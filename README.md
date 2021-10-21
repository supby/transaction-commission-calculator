# Transaction commission calculator API
REST API for transaction commission calculator. 

## Endpoints
POST: `/transaction-commission`
Payload example:
    ```
    {
        "date": "2021-11-18",
        "amount": "300.00",
        "currency": "EUR",
        "client_id": 42
    }
    ```
Response example:
    ```
    {
        "amount": "0.03",
        "currency": "EUR"
    }
    ```

## How to use

`yarn start` to start API server.
`yarn test`  to run unit tests.
`yarn test:e2e` to start e2e tests.