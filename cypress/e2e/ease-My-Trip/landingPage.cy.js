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
        const expectedTravellerLabels = ['Adults', 'Children', 'Infant']
        let travellerNo=1 
        cy.get('#myDropdown_n p[class="trvlhead"]').each(($el, index, $list) => {
            
            let text = $el.text()
            travellerLabels.push(text)
        }).then(() => {
            expect(travellerLabels).to.deep.equal(expectedTravellerLabels)
         
        })

        //incrementing travellers
        cy.get('#field1').find('#optAdult').should('have.value', 1)
        cy.get('#field1').find('#add').click().then(() => {
            travellerNo +=1
        })
        cy.get('#field1').find('#optAdult').should('have.value', 2)

        cy.get('#field2').find('#optChild').should('have.value', 0)
        cy.get('#field2').find('#add').click().then(() => {
            travellerNo +=1
        })
        cy.get('#field2').find('#optChild').should('have.value', 1)

        cy.get('#field3').find('#optInfant').should('have.value', 0)
        cy.get('#field3').find('#add').click().then(() => {
            travellerNo +=1
        })
        cy.get('#field3').find('#optInfant').should('have.value', 1)

        cy.get('#rbEconomy').check().should('be.checked')
        cy.get('#traveLer').click()

        cy.get('#ptravlrNo').find('#spnDrpNo').then(($el) => {
            let text = $el.text()
            
            expect(text).to.equal(`${travellerNo}`)
            
        })
        cy.get('#ptravlrNo').find('#spnTraveller').then(($el) => {
            let text = $el.text()
            
            expect(text).to.equal(`Traveller(s)`)
            
        })
        cy.get('.srchBtnSe').click()



        // should check if the ticket fair prices are in ascending order
/** Below code doesnt work because , the prices are sorted based on the applicable discount which is why 
 * some bigger prices may appear before smaller one...*/
    
    //  const numericPricesArray = [];
    // cy.get('.fltResult div[id^="spnPrice"]:visible').each(($el) => {
    //     const priceText = $el.text();
    //     const numericPrice = parseFloat(priceText.replace(/,/g, ''));
    //     numericPricesArray.push(numericPrice);
    // }).then(() => {
    //         for (let i = 1; i < numericPricesArray.length; i++) {
    //             const currentPrice = numericPricesArray[i];
    //             const previousPrice = numericPricesArray[i - 1];

    //             // Check if the current price is less than or equal to the previous price
    //             if (currentPrice < previousPrice) {
    //             // Fail the test if the prices are not in ascending order
    //             expect(false, `Prices are not in ascending order at index ${i} ${currentPrice} ${previousPrice}`).to.be.true;
    //             }
    //         }
    //         // If the loop completes without failing, it means prices are in ascending order
    //         expect(true).to.be.true;
    //         });

       
    //     //Checking if the prices are in ascending order.
        
    })


})