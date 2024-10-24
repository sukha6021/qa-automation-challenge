// cypress.config.js
const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:8080', // Your application base URL for local testing
    setupNodeEvents(on, config) {
      // Ensure the config is merged with your record key
      config.env.recordKey = process.env.CYPRESS_RECORD_KEY; // Reference the environment variable
      return config;
    },
  },
});
