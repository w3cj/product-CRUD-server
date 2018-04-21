# Product API Server

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
