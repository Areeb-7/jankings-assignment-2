describe('Login page', () => {
  it('logs in a user and stores token', () => {
    const email = `cylogin+${Date.now()}@example.com`;
    const password = 'Test@1234';

    cy.request('POST', 'http://localhost:3010/api/auth/register', {
      name: 'Cypress Login User',
      email,
      password,
    });

    cy.intercept('POST', '**/api/auth/login').as('loginRequest');

    cy.visit('/login');

    cy.contains('Login').should('be.visible');
    cy.get('#email').type(email);
    cy.get('#password').type(password);
    cy.contains('button', 'Login').click();

    cy.wait('@loginRequest')
      .its('response.statusCode')
      .should('eq', 200);
    cy.window().then((win) => {
      expect(win.localStorage.getItem('token')).to.be.a('string').and.not.be.empty;
    });
  });

  it('navigates to signup page from login page', () => {
    cy.visit('/login');
    cy.contains('Sign up').click();
    cy.url().should('include', '/createaccount');
  });
});
