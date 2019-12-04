module.exports = {
  testEnvironment: 'node',
  testMatch: ['<rootDir>/test/**/*.test.js'],
  collectCoverage: true,
  coverageReporters: ['text', 'html'],
  collectCoverageFrom: ['src/**/*.js'],
  setupFilesAfterEnv: ['./test/espruino-mocks']
}
