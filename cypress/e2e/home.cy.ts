describe('Home Page', () => {
  beforeEach(() => {
    cy.visit('/home');
  });

  it('should display the home page', () => {
    cy.contains('Fullstack Developer').should('be.visible');
  });

  it('should navigate to projects page', () => {
    cy.contains('Ver Proyectos').click();
    cy.url().should('include', '/projects');
  });

  it('should toggle theme', () => {
    cy.get('button[aria-label="Toggle theme"]').click();
    cy.get('html').should('have.class', 'light').or('have.class', 'dark');
  });
});

