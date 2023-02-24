# HELPDESK («Heldesk Service»)

Web application of technical support

<img src="/static/img/social-preview.png">

## Demo application: [Helpdesk service](https://helpdesk-service.onrender.com)

Login to the application

```bash
  LOGIN: helpdesk
  PASSWORD: helpdesk
```

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

| Key              | Comment               |
| ---------------- | --------------------- |
| `PORT`           | Server port           |
| `HOST`           | Server host           |
| `SOCKET_TIMEOUT` | Socket client timeout |
| `MONGO_URI`      | Mongo url             |
| `BCRYPT_SALT`    | BCRYPT SALT           |

## Run dev application

```bash
# serve with hot reload at localhost:3000
$ npm run dev
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

```bash
  LOGIN: helpdesk
  PASSWORD: helpdesk
```

After starting the app on port (3000 as default) you can open
in your browser helpdesk by typing http://localhost:3000/.

# sakai-vue

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
