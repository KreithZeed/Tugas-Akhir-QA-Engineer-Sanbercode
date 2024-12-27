export default class directory {
    static directoryButton(){
        return cy.contains('Directory');
    }

    static directoryPage(){
        return cy.get('[class="oxd-text oxd-text--h5 oxd-table-filter-title"]');
    }

    static employeeSearchbox(){
        return cy.get('[placeholder="Type for hints..."]');
    }

    static autocompleteSuggestion(){
        return cy.get('[class="oxd-autocomplete-option"]', {timeout: 10000});
    }

    static searchButton(){
        return cy.get('[class="oxd-button oxd-button--medium oxd-button--secondary orangehrm-left-space"]')
    }

    static locationDropdown(){
        return cy.get('[class="oxd-select-text--after"]').eq(1);
    }

    static chooseLocation(){
        return cy.get('[role="listbox"]');
    }

    static resetButton(){
        return cy.get('[class="oxd-button oxd-button--medium oxd-button--ghost"]');
    }
}
