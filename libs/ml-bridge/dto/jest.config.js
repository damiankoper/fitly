module.exports = {
  displayName: 'ml-bridge-dto',
  preset: '../../../jest.preset.js',
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig.spec.json',
    },
  },
  transform: {
    '^.+\\.[tj]s$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'js', 'html'],
  coverageDirectory: '../../../coverage/libs/ml-bridge/dto',
  setupFilesAfterEnv: ['<rootDir>/test-setup.ts'],
};
