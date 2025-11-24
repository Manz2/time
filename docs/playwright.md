# Overview

Playwright is used for automated end-to-end tests that run both on preview deployments and the production environment.

# Why Playwright?

- Real browser testing (Chromium, Firefox, WebKit)
- Automatic waiting and reliable async handling
- Easy integration with GitHub Actions

# Test Scope

- Rendering of input fields and controls
- Time calculation workflow
- Increment/decrement interactions
- Validation of output formatting
- Testing the application in a real hosted environment

# CI Integration

The Playwright tests run in two environments:

1. Pull Request Preview
   Ensures changes don’t break UI before merging.

2. Production Deployment
   Verifies that the deployed version behaves as expected.

# Reports

- HTML test reports are generated for every run
- Reports are uploaded as GitHub Action artifacts
- A public copy is published on [GitHub Pages](https://manz2.github.io/time/playwright/)
