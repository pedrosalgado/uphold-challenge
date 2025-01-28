describe('Currency Dropdown', () => {
  beforeEach(() => {
    // Visit the base URL (ensure it's running locally or hosted)
    cy.visit('http://localhost:3000');
  });

  it('renders the dropdown with currencies', () => {
    // Check that the dropdown button exists
    cy.get('.dropdown-button').should('exist');

    // Open the dropdown
    cy.get('.dropdown-button').click();

    // Check if the dropdown menu contains expected currencies
    cy.contains('US Dollar (USD)').should('exist');
    cy.contains('Euro (EUR)').should('exist');
  });
});
