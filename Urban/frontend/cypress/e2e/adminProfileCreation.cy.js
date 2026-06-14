describe('Admin Portal Provider Profile Creation', () => {
  it('submits a provider profile and displays success confirmation', () => {
    // Visit the provider portal admin panel
    cy.visit('http://127.0.0.1:5175');
    cy.contains('h2', 'Admin Profile').should('be.visible');

    const rand = Math.floor(Math.random() * 900000) + 100000; // unique 6 digits
    const firstName = `CyProvider${rand}`;
    const lastName = 'Test';
    const mobile = `9876${rand}`; // 4 + 6 = 10 digits

    // Fill form using relative label selectors
    cy.contains('label', 'First Name').parent().find('input').type(firstName);
    cy.contains('label', 'Last Name').parent().find('input').type(lastName);
    cy.contains('label', 'Mobile Number').parent().find('input').type(mobile);
    cy.contains('label', 'Service').parent().find('select').select('painting');
    cy.contains('label', 'Location').parent().find('input').type('Boston');
    cy.contains('label', 'Amount per Hour').parent().find('input').type('850');

    // Click submit
    cy.get('button[type="submit"]').click();

    // Verify success banner displays
    cy.get('#successMessage', { timeout: 10000 })
      .should('be.visible')
      .and('contain.text', 'registered successfully');
  });
});
