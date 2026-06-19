# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Cypress UI tests

These Cypress specs cover signup and login against the real backend. Start the backend on `http://localhost:3010` and the frontend on `http://localhost:5173` first, or override the base URL with `CYPRESS_BASE_URL`.

Install dependencies and open Cypress from this folder:

```bash
npm install
npm run cy:open
```

If you want a visible browser but still run the specs automatically, use:

```bash
npm run cy:headed
```

For headless CI runs:

```bash
npm run cy:run
```

The Cypress specs live in `cypress/e2e/` and cover login and signup flows.

![alt text](<../../Selenium TestNg.png>)