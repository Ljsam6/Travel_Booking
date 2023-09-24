class SearchResult {
  getFlight() {
    // return cy.get('.fltResult button:contains("Book Now")')

    return cy.get(".col-md-12 .airl-txt-n");
  }
}

export default SearchResult;
