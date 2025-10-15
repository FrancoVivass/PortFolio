module.exports = {
    preset: 'jest-preset-angular',
    setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
    testPathIgnorePatterns: [
        '<rootDir>/node_modules/',
        '<rootDir>/dist/',
        '<rootDir>/cypress/'
    ],
    collectCoverage: true,
    coverageDirectory: 'coverage',
    coverageReporters: ['html', 'lcov', 'text'],
    moduleNameMapper: {
        '@core/(.*)': '<rootDir>/src/app/core/$1',
        '@shared/(.*)': '<rootDir>/src/app/shared/$1',
        '@features/(.*)': '<rootDir>/src/app/features/$1',
        '@environments/(.*)': '<rootDir>/src/environments/$1',
    },
};

