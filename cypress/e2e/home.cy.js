describe('UI Check', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/')
  })
  it('Home Page is available', () => {
    cy.visit('http://localhost:3000/')
  })
  it('Link to upload page works', () => {
    cy.get('.btn-secondary').contains('Upload Quiz').click()
  })
  it ('Link to list page works', () => {
    cy.get('.btn-accent').contains('View Results').click()
  })
})