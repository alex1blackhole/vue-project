# Vue Project

This project is a Vue.js application that demonstrates the use of Vue 3 and Vite.
 
## Project Structure

The project structure is as follows:

- `app/`: The main application code.
  - `frontend/`: The Vue.js application code.
    - `src/`: The source code for the Vue.js application.
      - `components/`: The reusable components of the application.
      - `App.vue`: The main application component.
      - `main.ts`: The entry point for the Vue.js application.
      - `tailwind.config.js`: The configuration file for Tailwind CSS.
    - `vite.config.ts`: The configuration file for Vite.
    - `index.html`: The HTML template for the application.
  - `backend/`: The Django backend code.
 
## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) to make the TypeScript language service aware of `.vue` types.

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
yarn install

yarn  dev

```

- http://localhost:5173/
