export default class resetPassword {
    static forgotButton(){
        return cy.contains('Forgot your password').should('be.visible');
    }

    static textReset(){
        return cy.get('[name="username"]');
    }

    static resetButton(){
        return cy.get('button[type="submit"]');
    }
}