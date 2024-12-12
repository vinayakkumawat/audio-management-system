describe('Admin Dashboard', () => {
  beforeEach(() => {
    cy.visit('/login');
    cy.get('input[placeholder="Username"]').type('admin');
    cy.get('input[placeholder="Password"]').type('admin123');
    cy.get('button[type="submit"]').click();
  });

  it('successfully logs in and navigates to dashboard', () => {
    cy.url().should('include', '/dashboard');
    cy.contains('Audio Queue Dashboard').should('be.visible');
  });

  it('can navigate to different sections', () => {
    cy.contains('Users').click();
    cy.url().should('include', '/users');
    
    cy.contains('Testing').click();
    cy.url().should('include', '/testing');
  });

  it('can manage user accounts', () => {
    cy.visit('/users');
    cy.contains('Add User').click();
    cy.get('input[id="username"]').type('testuser');
    cy.contains('button', 'Create').click();
    cy.contains('testuser').should('be.visible');
  });

  it('can upload test audio file', () => {
    cy.visit('/testing');
    cy.get('input[type="file"]').selectFile('cypress/fixtures/test-audio.mp3');
    cy.contains('Upload Audio').click();
    cy.contains('Audio file uploaded successfully').should('be.visible');
  });
});