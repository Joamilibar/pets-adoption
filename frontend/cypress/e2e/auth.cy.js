describe('Authentication Flow', () => {
  const testUser = {
    first_name: 'Cypress',
    last_name: 'Test',
    email: `cypress-${Date.now()}@test.com`,
    password: 'testpassword123'
  };

  beforeEach(() => {
    cy.visit('/');
  });

  it('should complete full registration and login flow', () => {
    // Navigate to register page
    cy.contains('Register').click();
    cy.url().should('include', '/register');

    // Fill registration form
    cy.get('input[name="first_name"]').type(testUser.first_name);
    cy.get('input[name="last_name"]').type(testUser.last_name);
    cy.get('input[name="email"]').type(testUser.email);
    cy.get('input[name="password"]').first().type(testUser.password);
    cy.get('input[name="confirmPassword"]').type(testUser.password);

    // Submit registration
    cy.contains('button', 'Register').click();

    // Should redirect to login page
    cy.url().should('include', '/login');

    // Login with new credentials
    cy.get('input[name="email"]').type(testUser.email);
    cy.get('input[name="password"]').type(testUser.password);
    cy.contains('button', 'Login').click();

    // Should redirect to dashboard
    cy.url().should('include', '/dashboard');
    cy.contains(`Welcome, ${testUser.first_name}!`).should('be.visible');
  });

  it('should show validation errors for invalid registration', () => {
    cy.contains('Register').click();

    // Try to submit empty form
    cy.contains('button', 'Register').click();

    // Should show validation errors
    cy.contains('First name is required').should('be.visible');
    cy.contains('Last name is required').should('be.visible');
    cy.contains('Email is required').should('be.visible');
    cy.contains('Password is required').should('be.visible');
  });

  it('should show error for invalid login credentials', () => {
    cy.contains('Login').click();

    // Try to login with invalid credentials
    cy.get('input[name="email"]').type('invalid@example.com');
    cy.get('input[name="password"]').type('wrongpassword');
    cy.contains('button', 'Login').click();

    // Should show error message
    cy.contains('Invalid credentials').should('be.visible');
  });

  it('should logout successfully', () => {
    // First, register and login
    cy.contains('Register').click();
    cy.get('input[name="first_name"]').type(testUser.first_name);
    cy.get('input[name="last_name"]').type(testUser.last_name);
    cy.get('input[name="email"]').type(`logout-${Date.now()}@test.com`);
    cy.get('input[name="password"]').first().type(testUser.password);
    cy.get('input[name="confirmPassword"]').type(testUser.password);
    cy.contains('button', 'Register').click();

    cy.url().should('include', '/login');
    cy.get('input[name="email"]').type(`logout-${Date.now()}@test.com`);
    cy.get('input[name="password"]').type(testUser.password);
    cy.contains('button', 'Login').click();

    // Wait for dashboard
    cy.url().should('include', '/dashboard');

    // Logout
    cy.contains('button', 'Logout').click();

    // Should redirect to home
    cy.url().should('eq', Cypress.config().baseUrl + '/');
    cy.contains('button', 'Login').should('be.visible');
  });
});

describe('Pet Adoption Flow', () => {
  const testUser = {
    email: `adoption-${Date.now()}@test.com`,
    password: 'testpassword123',
    first_name: 'Adoption',
    last_name: 'Test'
  };

  before(() => {
    // Register a test user
    cy.visit('/register');
    cy.get('input[name="first_name"]').type(testUser.first_name);
    cy.get('input[name="last_name"]').type(testUser.last_name);
    cy.get('input[name="email"]').type(testUser.email);
    cy.get('input[name="password"]').first().type(testUser.password);
    cy.get('input[name="confirmPassword"]').type(testUser.password);
    cy.contains('button', 'Register').click();
  });

  beforeEach(() => {
    // Login before each test
    cy.visit('/login');
    cy.get('input[name="email"]').type(testUser.email);
    cy.get('input[name="password"]').type(testUser.password);
    cy.contains('button', 'Login').click();
    cy.url().should('include', '/dashboard');
  });

  it('should display available pets', () => {
    // Should be on Pets tab by default
    cy.contains('Available Pets').should('be.visible');
    
    // Check if pet cards are displayed (if any pets exist)
    cy.get('body').then(($body) => {
      if ($body.find('[data-testid="pet-card"]').length > 0) {
        cy.get('[data-testid="pet-card"]').should('be.visible');
      } else {
        cy.contains('No pets found').should('be.visible');
      }
    });
  });

  it('should view my adoptions', () => {
    // Navigate to My Adoptions tab
    cy.contains('My Adoptions').click();
    
    // Should show adoptions or empty state
    cy.get('body').then(($body) => {
      if ($body.text().includes("haven't adopted")) {
        cy.contains("haven't adopted any pets yet").should('be.visible');
      }
    });
  });

  it('should view user profile', () => {
    // Navigate to Profile tab
    cy.contains('Profile').click();
    
    // Should display user information
    cy.contains(testUser.first_name).should('be.visible');
    cy.contains(testUser.last_name).should('be.visible');
    cy.contains(testUser.email).should('be.visible');
  });
});
