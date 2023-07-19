## Description

This repo contains three microservices: Order, Payment & Email. Each of them contains their own env files, you will have to modify each of them individually and run.

## Installation

- Clone the project repository: git clone https://github.com/mhamzabcs/microservices-communication.git
- `cd <service_name>`
- Add an env file from the template: `cp env.template .env` & enter correct variable values
- Install dependencies `yarn install` or `npm install`
- Repeat steps 2-4 for all three services

## Running the app

You will need to do the following steps for all three services

```bash
$  Make sure you are in correct service folder: cd  <service_name>
$  yarn run start:dev
```

### Additional resources

- Rest API Postman collection provided in repo
- To install RabbitMQ - https://www.rabbitmq.com/install-windows.html
