describe('Booking Form Input Validation', () => {
  it('displays the correct validation warnings for missing and invalid phone inputs', () => {
    const rand = Date.now();
    const email = `cyval+${rand}@example.com`;
    const password = 'Password123';

    // 1. Create a user via backend API
    cy.request('POST', 'http://127.0.0.1:3010/api/auth/register', {
      name: 'Cypress Val Customer',
      email,
      password,
    });

    // 2. Seed a service provider via API
    cy.request('POST', 'http://127.0.0.1:3010/api/service-providers/post', {
      firstName: 'Cypress_Spa',
      lastName: 'Pro',
      mobileNumber: '9999999999',
      service: 'spa',
      location: 'New York',
      amountPerHour: 600,
    });

    // 3. Log in visually
    cy.visit('/login');
    cy.get('#email').type(email);
    cy.get('#password').type(password);
    cy.contains('button', 'Login').click();

    // Verify redirection to home page
    cy.url().should('eq', Cypress.config().baseUrl + '/');

    // 4. Go to service-providers listing for spa
    cy.visit('/service-providers/spa');
    cy.contains('Service Providers for spa').should('be.visible');

    // Select the first provider
    cy.get('table tbody tr').first().click();

    // Verify redirection to booking page
    cy.url().should('include', '/booking');
    cy.contains('h1', 'Book Your Service').should('be.visible');

    // 5. Try submitting empty phone number
    cy.get('button[type="submit"]').click();
    cy.contains('p', 'Phone number is required').should('be.visible');

    // 6. Try submitting invalid phone number format
    cy.get('#phoneNumber').type('1234');
    cy.get('button[type="submit"]').click();
    cy.contains('p', 'Please enter a valid 10-digit phone number').should('be.visible');
  });
});
