/* eslint-disable no-undef */
// eslint-disable-next-line no-undef
describe('login', () => {
  it('visit login page', () => {
    cy.visit('localhost:3000/login');
  });
  it('email type input'),
    () => {
      cy.get('#normal_login_email').click();
    };
  it('should pass password'),
    () => {
      cy.get('#normal_login_password').click().type('123');
    };
});
