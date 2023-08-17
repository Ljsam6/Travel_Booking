context('Landing page of Ease my trip Website', () => {
    

    it('To Verify the One Way Place selection functionality ', () => {
        //Visit URL
        cy.visit('https://www.easemytrip.com/')
       
        // Click for one way , should highlight the Background 
        cy.get('#oway').click()
        cy.get('#oway').should('have.css', 'background-color', 'rgb(255, 255, 255)')
        
        // Validate From City Dropdown
        cy.get('#FromSector_show',{force: true}).click()
        cy.get('#fromautoFill_in .searcityCol').should('be.visible')
        cy.get('#fromautoFill_in .searcityCol').type('Pune')
        cy.get("#fromautoFill").each(($el,index,list) => {
            
            const city = $el.text()
            
            if (city.includes('Pune')) {
                cy.wrap($el).click();
            }

        })
        cy.get('#FromSector_show').should('contain.value','Pune')
        

    })
})