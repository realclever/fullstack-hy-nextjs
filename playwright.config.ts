import fs from 'fs';
import { defineConfig } from '@playwright/test';
import dotenv from 'dotenv';

const testEnv = dotenv.parse(fs.readFileSync('.env.test'));

export default defineConfig({
  testDir: './tests',

  use: {
    baseURL: 'http://localhost:3000',
  },

  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:3000',
    env: testEnv,
    reuseExistingServer: false,
    timeout: 120_000,
  },
});
