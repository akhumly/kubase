describe('API Test', () => {
  it('should load the homepage', () => {
    cy.request('http://localhost:3000/').then((response) => {
      // Use full URL if baseUrl isn't working
      expect(response.status).to.eq(200);
    });
  });
});
