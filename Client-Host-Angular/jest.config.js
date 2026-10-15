module.exports = {
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
  coverageReporters: ["html", "json", "lcov", "text", "clover"],

  modulePathIgnorePatterns: ["<rootDir>/dist/"],
  testPathIgnorePatterns: [
    "<rootDir>/node_modules/",
    "<rootDir>/dist/",
  ],

  verbose: true,
  testEnvironment: "jsdom",
  collectCoverage: true,

  // Se mide todo el código de src/app (excepto specs y mocks).
  collectCoverageFrom: [
    'src/app/**/*.ts',
    '!src/app/**/*.spec.ts',
    '!src/app/mocks/**',
  ],
  // El parcial exige cobertura superior al 90 %: Jest falla si no se cumple.
  coverageThreshold: {
    global: { statements: 90, branches: 90, functions: 90, lines: 90 },
  },

  clearMocks: true,
  testMatch: ["**/*.spec.ts"],
  rootDir: './'
};
