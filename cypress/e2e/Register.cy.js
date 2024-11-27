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
  it('should fail to create an existing user', ()=>{
    cy.get('input[name="name"]').type('John Doe');
    cy.get('input[name="email"]').type('userExists@example.com');
    cy.get('input[name="password"]').type('securepassword');
    cy.get('input[name="confirmPassword"]').type('securepassword');
    cy.get('button[type="submit"]').click();

    cy.get('.label-text-alt').should('contain', 'ⓘ A user with this email already exists');
  })
  it('should fail to create a user with invalid email', ()=>{
    cy.get('input[name="name"]').type('John Doe');
    cy.get('input[name="email"]').type('invalidemail');
    cy.get('input[name="password"]').type('securepassword');
    cy.get('input[name="confirmPassword"]').type('securepassword');
    cy.get('button[type="submit"]').click();

    cy.get('.label-text-alt').should('contain', 'ⓘ Please enter a valid email');
  })
  it('should fail to create a user with invalid password', ()=>{
    cy.get('input[name="name"]').type('John Doe');
    cy.get('input[name="email"]').type('johndoe@example.com');
    cy.get('input[name="password"]').type('1');
    cy.get('input[name="confirmPassword"]').type('1');
    cy.get('button[type="submit"]').click();

    cy.get('.label-text-alt').should('contain', 'ⓘ Password must be at least 6 characters');
  }
  )
  it('should fail to create a user with mismatched passwords', ()=>{
    cy.get('input[name="name"]').type('John Doe');
    cy.get('input[name="email"]').type('johndoe@example.com');
    cy.get('input[name="password"]').type('securepassword');
    cy.get('input[name="confirmPassword"]').type('wrongpassword');
    cy.get('button[type="submit"]').click();

    cy.get('.label-text-alt').should('contain', 'ⓘ Passwords do not match');
  })
  it('should fail with a server error',()=>{
    cy.get('input[name="name"]').type('John Doe');
    cy.get('input[name="email"]').type('serverError@example.com');
    cy.get('input[name="password"]').type('securepassword');
    cy.get('input[name="confirmPassword"]').type('securepassword');
    cy.get('button[type="submit"]').click();

    cy.get('.label-text-alt').should('contain', 'ⓘ Something went wrong please try again later');
  })
})