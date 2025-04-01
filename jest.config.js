export const transform = {
    '^.+\\.(ts|tsx)$': 'babel-jest',
};
export const testEnvironment = 'jsdom';
export const moduleFileExtensions = ['ts', 'tsx', 'js', 'jsx'];
export const setupFilesAfterEnv = ['<rootDir>/jest.setup.ts'];
export const collectCoverage = true;
export const collectCoverageFrom = ['src/components/**/*.{ts,tsx}', '!src/**/*.test.{ts,tsx}'];
export const coverageThreshold = {
    global: {
        branches: 80,
        functions: 80,
        lines: 80,
        statements: 80,
    },
};
