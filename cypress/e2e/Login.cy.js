describe('Login Page E2E Tests', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/auth/login'); 
  });

  it('should display the login form correctly', () => {
    cy.get('h1').should('contain', 'Login to your QuizLy account');
    cy.get('input[name="email"]').should('exist');
    cy.get('input[name="password"]').should('exist');
    cy.get('button[type="submit"]').should('exist').and('contain', 'Login');
  });

  it('should show an error for invalid credentials', () => {
    cy.get('input[name="email"]').type('invalid@example.com');
    cy.get('input[name="password"]').type('wrongpassword');
    cy.get('button[type="submit"]').click();

    cy.get('.label-text-alt').should('contain', 'ⓘ Incorrect email or password');
  });

  it('should login sucessfully with redirect cookie', () => {
    // Simulate setting a redirect cookie
    cy.setCookie('redirect', '/quiz/list');

    cy.get('input[name="email"]').type('test@test.com');
    cy.get('input[name="password"]').type('123456');
    cy.get('button[type="submit"]').click();
    
    cy.getCookie('token').should('have.property', 'value', 'mockToken');
    cy.get('.label-text-alt').should('not.exist');
  });

  it('should login sucessfully without redirect cookie', () => {

    cy.clearCookie('redirect'); // Ensure no redirect cookie exists

    cy.get('input[name="email"]').type('test@test.com');
    cy.get('input[name="password"]').type('123456');
    cy.get('button[type="submit"]').click();

    
    cy.get('.label-text-alt').should('not.exist');
  });

  it('should navigate to the registration page when "Create one" is clicked', () => {
    cy.get('.underline').contains('Create one').click();
    cy.url().should('include', '/auth/register');
  });

  it('should provoke a server error',()=>{
    cy.get('input[name="email"]').type('serverError@example.com');
    cy.get('input[name="password"]').type('securepassword');
    cy.get('button[type="submit"]').click();

    cy.get('.label-text-alt').should('contain', 'ⓘ Something went wrong please try again later');
  })
});
