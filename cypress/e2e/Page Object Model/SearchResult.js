class SearchResult{

    getFlight() {
        return cy.get('.fltResult button:contains("Book Now")')
    }

    
}

export default SearchResult;