describe('User API', () => {
  it('should create a new user', () => {
    cy.request('POST', 'http://localhost:3000/users', {
      name: 'Jane Doe',
      email: 'jane.doe@example.com',
    }).then((response) => {
      expect(response.status).to.eq(201); // Assuming 201 for creation
      expect(response.body).to.have.property('id');
      expect(response.body.name).to.eq('Jane Doe');
    });
  });

  it('should retrieve all users', () => {
    cy.request('GET', 'http://localhost:3000/users').then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.be.an('array');
    });
  });
});
