describe('Register page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/auth/register'); 
  });
  it('should successfully create a new user', () => {
    cy.get('input[name="name"]').type('John Doe');
    cy.get('input[name="email"]').type('johndoe@example.com');
    cy.get('input[name="password"]').type('securepassword');
    cy.get('input[name="confirmPassword"]').type('securepassword');
    cy.get('button[type="submit"]').click();

    cy.get('.label-text-alt').should('not.exist');
    cy.url().should('eq', Cypress.config().baseUrl + '/');
    }
    )
  it.only('should fail to create an existing user', ()=>{
    cy.get('input[name="name"]').type('John Doe');
    cy.get('input[name="email"]').type('johndoe2@example.com');
    cy.get('input[name="password"]').type('securepassword');
    cy.get('input[name="confirmPassword"]').type('securepassword');
    cy.get('button[type="submit"]').click();

    cy.get('.label-text-alt').should('contain', 'ⓘ A user with this email already exists');
  })
})