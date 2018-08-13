# Product API Server

# NOTE: The server is now running on PORT 5000! http://localhost:5000/api/v1/products

## Pre-requisites

* postgres installed locally
  * OSX - brew install postgres
* npm install -g knex

## Setup

```sh
npm install # install dependencies
createdb cjs_store # create postgres db
knex migrate:latest # create tables in db
knex seed:run # add sample data to db
```

## Development Start

```sh
npm run dev
```

## Production Start

```sh
npm start
```

## Explore API

* Server is listening on PORT 5000.
* http://localhost:5000/api/v1/products