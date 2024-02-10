const { request } = require('@playwright/test');

// Initialize and export a single request context for reuse
const apiContext = request.newContext({
  baseURL: 'https://api.club-administration.qa.qubika.com',
  
});

module.exports = { apiContext };
