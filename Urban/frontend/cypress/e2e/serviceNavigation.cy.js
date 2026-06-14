describe('Service Navigation', () => {
  it('navigates to the spa service provider listing on card click', () => {
    cy.visit('/');
    cy.contains('Our Services').should('be.visible');

    // Click the Spa service card
    cy.contains('.service-card', 'spa').click();

    // Verify redirection
    cy.url().should('include', '/service-providers/spa');
    cy.contains('h2', 'Service Providers for spa').should('be.visible');
  });
});
