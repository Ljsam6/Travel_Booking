class HomePage
{

    getOneWayRadioButton() {
        return cy.get('#oway');
    }

    // FROM CITY DATA ELEMENT
    getFromCityDropDownParentElement() {
        return cy.get('#FromSector_show', { force: true });
    }
    getFromCityDropDownTextBox() {
        return cy.get('#fromautoFill_in .searcityCol');
    }
    getFromCityDropDown() {
        return cy.get("#fromautoFill")
    }

    //TO CITY DATA ELEMENT
    getToCityDropDownParentElement() {
        return cy.get('#Editbox13_show', { force: true });
    }
    getToCityDropDownTextBox() {
       return cy.get('#toautoFill_in #a_Editbox13_show');
    }
    getToCityDropDown() {
        return cy.get("#toautoFill");
    }

// DEPARTURE DATE DATA ELEMENT
    getDepartureDateElemennt() {
        return cy.get('#dvfarecal')
    }
    getDepartureDateLabel() {
        return cy.get('#dvfarecal').find('.srlabel');
    }
    getDepartureDateCurrentElement() {
        return cy.get('.days ul li .active-date')
    }
    getDepartureDate() {
        return cy.get('#dvfarecal p:nth-child(3)')
    }

//TRAVELLERS DATA BUTTON
    getTravellersDetailParentElement() {
        return cy.get('#myFunction4')
    }
    getTravellersDropDownLabels() {
        return cy.get('#myDropdown_n p[class="trvlhead"]')
    }
    getAdultField() {
       return cy.get('#field1')
    }
    getChildField() {
       return cy.get('#field2')
    }
    getInfantField() {
       return cy.get('#field3')
    }
    getEconomyClassRadio() {
       return cy.get('#rbEconomy')
    }
    getTraveller_Done_Button() {
        return cy.get('#traveLer')
    }
    getTravellerNo_Displayed() {
        return cy.get('#ptravlrNo')
    }
    
    
    getSearchButton() {
        return cy.get('.srchBtnSe')
    }



}

export default HomePage;