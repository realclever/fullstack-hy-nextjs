import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',

  reporter: process.env.CI
    ? [['line'], ['html', { outputFolder: 'playwright-report', open: 'never' }]]
    : 'list',

  use: {
    baseURL: 'http://localhost:3000',
  },

  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
});
