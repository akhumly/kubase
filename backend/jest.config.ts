// jest.config.ts
import { Config } from '@jest/types';
import * as dotenv from 'dotenv';

// Load environment variables from .env.test
dotenv.config({ path: '.env.test' });

const config: Config.InitialOptions = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleFileExtensions: ['ts', 'js', 'json', 'node'],
  rootDir: 'src',
  testRegex: '.*\\.spec\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  collectCoverageFrom: ['**/*.(t|j)s'],
  coverageDirectory: '../coverage',
  setupFiles: ['dotenv/config'],
};

export default config;
