describe('Signup page', () => {
  it('registers a new user and redirects to login', () => {
    const email = `cyuser+${Date.now()}@example.com`;

    cy.intercept('POST', '**/api/auth/register').as('registerRequest');

    cy.visit('/createaccount');

    cy.contains('Create Account').should('be.visible');
    cy.get('#username').type('Cypress Test User');
    cy.get('#email').type(email);
    cy.get('#password').type('Test@1234');
    cy.get('#confirmPassword').type('Test@1234');
    cy.contains('button', 'Create Account').click();

    cy.wait('@registerRequest')
      .its('response.statusCode')
      .should('eq', 201);
    cy.url().should('include', '/login');
  });

  it('stays on signup page when passwords do not match', () => {
    cy.visit('/createaccount');

    cy.get('#username').type('Cypress Test User');
    cy.get('#email').type(`cyuser+${Date.now()}@example.com`);
    cy.get('#password').type('Test@1234');
    cy.get('#confirmPassword').type('WrongPassword');
    cy.on('window:alert', (text) => {
      expect(text).to.eq('Passwords do not match!');
    });
    cy.contains('button', 'Create Account').click();

    cy.url().should('include', '/createaccount');
  });
});
