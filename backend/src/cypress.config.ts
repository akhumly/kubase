import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000', // Ensure this is the correct URL for your NestJS API
    specPattern: 'cypress/e2e/**/*.cy.{js,ts}',
    supportFile: false,
  },
});
