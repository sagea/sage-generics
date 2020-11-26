export default {
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!**/__tests__/**',
    '!**/__mocks__/**',
  ],
  resetMocks: true,
  resetModules: true,
  collectCoverage: false,
  transform: {
    '^.+\\.[t|j]sx?$': './jest.transformer.mjs',
  },
  roots: ['<rootDir>/src'],
  setupFilesAfterEnv: ['./jest.setup.ts'],
}
