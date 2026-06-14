describe('Booking End-to-End Flow', () => {
  it('registers, logs in, seeds a provider, and completes a booking successfully', () => {
    const rand = Date.now();
    const email = `cybooking+${rand}@example.com`;
    const password = 'Password123';

    // 1. Create a user via backend API
    cy.request('POST', 'http://127.0.0.1:3010/api/auth/register', {
      name: 'Cypress E2E Customer',
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

    // 5. Complete all 5 booking steps
    // Step 1: Phone
    cy.get('#phoneNumber').type('1234567890');
    cy.get('button[type="submit"]').click();

    // Step 2: Address
    cy.get('#area').type('123 Street');
    cy.get('#city').type('Mumbai');
    cy.get('#state').type('Maharashtra');
    cy.get('#zipCode').type('400001');
    cy.get('button[type="submit"]').click();

    // Step 3: Slot
    cy.contains('.btntimeslot', 'Morning').click();

    // Step 4: Date & Time
    cy.contains('Select Date').parent().find('button').first().click();
    cy.contains('Select Time').parent().find('button').first().click();
    cy.contains('button', 'Continue').click();

    // Step 5: Checkout Summary
    cy.contains('h3', 'Booking Summary').should('be.visible');
    cy.contains('button', 'Pay').click();

    // Verify redirection to home page after booking success
    cy.url().should('eq', Cypress.config().baseUrl + '/');
  });
});
