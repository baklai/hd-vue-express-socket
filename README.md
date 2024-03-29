# HELPDESK («Heldesk Service»)

Web application of technical support

```
LOGIN: helpdesk
PASSWORD: helpdesk
```

<img src="preview.png">

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.

## Downloading

```bash
git clone
```

## Installing NPM modules

```bash
# install dependencies
$ npm install
```

## Project env variables

| Key                 | Comment            |
| ------------------- | ------------------ |
| `PORT`              | APP port           |
| `HOST`              | APP host           |
| `MONGO_URL`         | Mongo url          |
| `BCRYPT_SALT`       | BCRYPT SALT        |
| `PUBLIC_TOKEN`      | Public token       |
| `TOKEN_SECRET_KEY`  | Token secret key   |
| `TOKEN_EXPIRES_IN`  | Token expires in   |
| `FILE_STORAGE_PATH` | File storage path  |
| `VITE_SERVER_API`   | APP Connection url |

## Run dev application

```bash
# serve with hot reload at localhost:3000
$ npm run srv:dev

# client with hot reload at localhost:8080
$ npm run client:dev

# docs client with hot reload at localhost:8081
$ npm run docs:dev
```

## Build application

```bash
# build for production
$ npm run build
```

## Running application

```bash
# run production and launch server
$ npm run start
```

## Default login to the application

The service administrator is created during the first registration on the service

After starting the app on port (3000 as default) you can open
in your browser helpdesk by typing http://localhost:8080/.
