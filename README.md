# playforge

Strict TypeScript + Playwright foundation for a Component-DSL testing framework.

## Requirements

- Node `22` via [`.nvmrc`](./.nvmrc)
- npm

## Bootstrap

```bash
nvm use
npm install
npx playwright install --with-deps chromium
npm install -g @playwright/cli@latest
```

`BASE_URL` defaults to `https://automationexercise.com`. Override it only when you need to point the DSL at a different environment.

## Scripts

```bash
npm run typecheck
npm run test
npm run report:html
npm run report:allure
```

The browser suites target `https://automationexercise.com` by default and do not start a local demo site.

## Configuration

Environment parsing lives in [`framework/config`](./framework/config). Required and optional variables are documented in [`.env.example`](./.env.example).
