/// <reference types="cypress" />
import loginPage from "../../pom/OrangeHRM/Login/Login";
import resetPassword from "../../pom/OrangeHRM/Reset/Reset";
import directory from "../../pom/OrangeHRM/Directory/Directory";

  describe('Login Feature', () => {
    it('User Login with Valid Credentials', () => {
      cy.intercept('POST', '/api/v1/auth/login').as('loginRequest');
      cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login?locale=en');
      loginPage.textLogin().should('have.text', 'Login');
      loginPage.inputUsername().type('Admin');
      loginPage.inputPassword().type('admin123');
      cy.intercept("GET","**/employees/action-summary").as("actionSummary");
      loginPage.buttonLogin().click();
      cy.wait('@actionSummary').its('response.statusCode').should('eq', 200);
      loginPage.menuDashboard().should('have.text', 'Dashboard');
    });
  
    it('User Login with Invalid Username', () => {
      cy.intercept('POST', '/api/v1/auth/login').as('loginRequest');
      cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
      loginPage.textLogin().should('have.text', 'Login');
      loginPage.inputUsername().type('InvalidUser');
      loginPage.inputPassword().type('admin123');
      loginPage.buttonLogin().click();
      cy.contains('Invalid credentials').should('be.visible');
    });

    it('User Login with Invalid Password', () => {
      cy.intercept('POST', '/api/v1/auth/login').as('loginRequest');
      cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
      loginPage.textLogin().should('have.text', 'Login');
      loginPage.inputUsername().type('Admin');
      loginPage.inputPassword().type('admin12e');
      loginPage.buttonLogin().click();
      cy.contains('Invalid credentials').should('be.visible');
   });

    it('User Login with Blank Username and Password', () => {
      cy.intercept('POST', '/api/v1/auth/login').as('loginRequest');
      cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
      loginPage.textLogin().should('have.text', 'Login');
      loginPage.inputUsername().should('be.empty');
      loginPage.inputPassword().should('be.empty');
      loginPage.buttonLogin().click();
      cy.contains('Required').should('be.visible');
    });

    it('User Login with Invalid Username and Password', () => {
      cy.intercept('POST', '/api/v1/auth/login').as('loginRequest');
      cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
      loginPage.textLogin().should('have.text', 'Login');
      loginPage.inputUsername().type('ADMIN');
      loginPage.inputPassword().type('ADMIN123');
      loginPage.buttonLogin().click();
      cy.contains('Invalid credentials').should('be.visible');
    });
  })

describe('Forgot Password', () => {
  it('User Forgot Password', () => {
      cy.intercept('POST', '/api/v1/auth/requestResetPassword').as('forgotPasswordRequest');
      cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
      loginPage.textLogin().should('have.text', 'Login');
      resetPassword.forgotButton().click();
      resetPassword.textReset().type('Admin'); 
      resetPassword.resetButton().click();
      cy.contains('Reset Password link sent successfully').should('be.visible'); 
  });
})

describe('Directory Feature', () => {
  it('User go to directory page', () => {
    cy.intercept('POST', '/api/v1/auth/login').as('loginRequest');
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login?locale=en');
    loginPage.textLogin().should('have.text', 'Login');
    loginPage.inputUsername().type('Admin');
    loginPage.inputPassword().type('admin123');
    loginPage.buttonLogin().click();
    cy.intercept("GET","**/directory/employees*").as("directory");
    directory.directoryButton().click();
    cy.wait('@directory').its('response.statusCode').should('eq', 200);
    cy.get('[class="oxd-text oxd-text--h5 oxd-table-filter-title"]').should('have.text', 'Directory');
  });

  it('User search directory by employee name', () => {
    cy.intercept('POST', '/api/v1/auth/login').as('loginRequest');
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login?locale=en');
    loginPage.textLogin().should('have.text', 'Login');
    loginPage.inputUsername().type('Admin');
    loginPage.inputPassword().type('admin123');
    loginPage.buttonLogin().click();
    cy.intercept("GET","**/directory/employees?limit=14&offset=0").as("directory");
    directory.directoryButton().click();
    cy.wait('@directory').its('response.statusCode').should('eq', 200);
    cy.intercept('GET',"**/directory/employees?nameOrId=Peter").as("search");
    directory.employeeSearchbox().type('Peter');
    cy.wait('@search').its('response.statusCode').should('eq', 200);
    directory.autocompleteSuggestion().should('be.visible').click();
    directory.searchButton().click();
    cy.contains('(1) Record Found');
  })

  it('User search directory by employee name but invalid locations', () => {
    cy.intercept('POST', '/api/v1/auth/login').as('loginRequest');
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login?locale=en');
    loginPage.textLogin().should('have.text', 'Login');
    loginPage.inputUsername().type('Admin');
    loginPage.inputPassword().type('admin123');
    loginPage.buttonLogin().click();
    cy.intercept("GET","**/directory/employees?limit=14&offset=0").as("directory");
    directory.directoryButton().click();
    cy.wait('@directory').its('response.statusCode').should('eq', 200);
    cy.intercept('GET',"**/directory/employees?nameOrId=Peter").as("search");
    directory.employeeSearchbox().type('Peter');
    cy.wait('@search').its('response.statusCode').should('eq', 200);
    directory.autocompleteSuggestion().should('be.visible').click();
    directory.locationDropdown().click();
    directory.chooseLocation().contains('Texas R&D').click();
    directory.searchButton().click();
    cy.contains('No Records Found').should('be.visible');
  })

it('User reset search directory', () => {
    cy.intercept('POST', '/api/v1/auth/login').as('loginRequest');
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login?locale=en');
    loginPage.textLogin().should('have.text', 'Login');
    loginPage.inputUsername().type('Admin');
    loginPage.inputPassword().type('admin123');
    loginPage.buttonLogin().click();
    cy.intercept("GET","**/directory/employees?limit=14&offset=0").as("directory");
    directory.directoryButton().click();
    cy.wait('@directory').its('response.statusCode').should('eq', 200);
    cy.intercept('GET',"**/directory/employees?nameOrId=Peter").as("search");
    directory.employeeSearchbox().type('Peter');
    cy.wait('@search').its('response.statusCode').should('eq', 200);
    directory.autocompleteSuggestion().should('be.visible').click();
    directory.locationDropdown().click();
    directory.chooseLocation().contains('New York Sales Office').click();
    directory.searchButton().click();
    cy.contains('(1) Record Found').should('be.visible');
    directory.resetButton().click();
    directory.employeeSearchbox().should('have.value', '').should('be.empty');
  })
})
 