# Some useful commands for Developers

## Playwright

```bash
# start all tests
npx playwright test

# debug one test
npx playwright test tests/time.spec.ts:68 --project=firefox --headed --debug
```

## Eslint & Prettier
```bash
# start check
npm run lint

# fix
npm run lint -- --fix
npx prettier --write .
```
## MkDocs
```bash
mkdocs serve
```
