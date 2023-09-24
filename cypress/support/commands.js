// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })

import HomePage from "../e2e/Page Object Model/HomePage";
import SearchResult from "../e2e/Page Object Model/SearchResult";
import CustomerDetailsPage from "../e2e/Page Object Model/CustomerDetailsPage";
const homePage = new HomePage();
const searchResult = new SearchResult();
const customerDetailsPage = new CustomerDetailsPage();

Cypress.Commands.add("fromCity", (cityName) => {
  homePage.getFromCityDropDown().each(($el, index, list) => {
    const city = $el.text();

    if (city.includes(cityName)) {
      cy.wrap($el).click();
    }
  });
});

Cypress.Commands.add("toCity", (cityName) => {
  homePage.getToCityDropDown().each(($el, index, list) => {
    const city = $el.text();

    if (city.includes("Delhi")) {
      cy.wrap($el).click();
    }
  });
});
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
/// <reference types="Cypress" />
