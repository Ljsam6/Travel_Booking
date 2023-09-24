class CustomeSeatingPage {
  getSkipSeatingButton() {
    return cy.get('[ng-click="SkipSeatAddon()"]');
  }
}

export default CustomeSeatingPage;
