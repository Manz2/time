# Overview

Unit tests are implemented using Jest and React Testing Library. The goal is to achieve high coverage while keeping tests meaningful and maintainable.

# Key Principles

- Test behavior, not implementation details
- Mock external libraries where necessary (e.g., Day.js)
- Use deterministic time mocks for stable snapshot-free tests
- Keep tests small and focused

# Coverage

The project reaches 100% coverage across:

- Components
- Utility functions
- Edge case handling

Coverage thresholds are enforced in CI to prevent regressions.