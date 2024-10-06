describe('API Test', () => {
  it('should load the homepage', () => {
    cy.request('/').then((response) => {
      // Use full URL if baseUrl isn't working
      expect(response.status).to.eq(200);
    });
  });
});
