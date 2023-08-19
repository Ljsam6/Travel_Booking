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
        
        //Validate To City form Dropdown
        cy.get('#Editbox13_show', { force: true }).click()
        cy.get('#toautoFill_in #a_Editbox13_show').should('be.visible')
        cy.get('#toautoFill_in #a_Editbox13_show').type('Delhi')
        cy.get("#toautoFill").each(($el,index,list) => {
            
            const city = $el.text()
            
            if (city.includes('Delhi')) {
                cy.wrap($el).click();
            }

        })
        cy.get('#Editbox13_show').should('contain.value', 'Delhi')
        
        //Validate Departure Date Picker

        // current date =.days ul li .active-date

        cy.get('#dvfarecal').find('.srlabel').should('contain.text', 'DEPARTURE DATE')
        cy.get('#dvfarecal').click()
        cy.get('.days ul li .active-date').click()
        
        cy.get('#dvfarecal p:nth-child(3)').then((el) => {
            const date = el.text()
            const currentDate = new Date();

        // Extract day, month, and year
            const day = currentDate.getDate();
            const month = currentDate.toLocaleString('default', { month: 'short' });
            const year = currentDate.getFullYear().toString();

            // Create the formatted date string
            const formattedDate = `${day}${month}'${year}`;

            console.log(formattedDate);

            expect(date).to.include(formattedDate)
        })

        //Validating Traveller Section
        cy.get('#myFunction4').click()
        const travellerLabels = []
        const expectedTravellerLabels=['Adults','Children','Infant']
        cy.get('#myDropdown_n p[class="trvlhead"]').each(($el, index, $list) => {
            
            let text = $el.text()
            travellerLabels.push(text)
        }).then(() => {
            expect(travellerLabels).to.deep.equal(expectedTravellerLabels)
         
        })

        //incrementing travellers
        cy.get('#field1').find('#optAdult').should('have.value', 1)
        cy.get('#field1').find('#add').click()
        cy.get('#field1').find('#optAdult').should('have.value', 2)

        cy.get('#field2').find('#optChild').should('have.value', 0)
        cy.get('#field2').find('#add').click()
        cy.get('#field2').find('#optChild').should('have.value', 1)

        cy.get('#field3').find('#optInfant').should('have.value', 0)
        cy.get('#field3').find('#add').click()
        cy.get('#field3').find('#optInfant').should('have.value', 1)

        cy.get('#rbBusiness').check().should('be.checked')


    })
})