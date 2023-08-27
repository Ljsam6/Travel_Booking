import HomePage from "../Page Object Model/HomePage";
import SearchResult from "../Page Object Model/SearchResult";
import CheckoutPage from "../Page Object Model/CheckoutPage";

context('Landing page of Ease my trip Website', () => {
    

    it('To Verify the One Way Place selection functionality ', () => {

        const homePage = new HomePage();
        const searchResult = new SearchResult();
        const checkoutPage = new CheckoutPage();
        //Visit URL
        cy.visit('https://www.easemytrip.com/')
       
        // Click for one way , should highlight the Background 
        homePage.getOneWayRadioButton().click()
        homePage.getOneWayRadioButton().should('have.css', 'background-color', 'rgb(255, 255, 255)')
        
        // Validate From City Dropdown
        homePage.getFromCityDropDownParentElement().click()
        homePage.getFromCityDropDownTextBox().should('be.visible')
        homePage.getFromCityDropDownTextBox().type('Pune')

        cy.fromCity('Pune')
       

        homePage.getFromCityDropDownParentElement().should('contain.value','Pune')
        
        //Validate To City form Dropdown
        homePage.getToCityDropDownParentElement().click()
        homePage.getToCityDropDownTextBox().should('be.visible')
        homePage.getToCityDropDownTextBox().type('Delhi')

        cy.toCity('Delhi')
        
        homePage.getToCityDropDownParentElement().should('contain.value', 'Delhi')
        
        //Validate Departure Date Picker

        // current date =.days ul li .active-date

        homePage.getDepartureDateElemennt().find('.srlabel').should('contain.text', 'DEPARTURE DATE')
        homePage.getDepartureDateElemennt().click()
        homePage.getDepartureDateCurrentElement().click()
        
        homePage.getDepartureDate().then((el) => {
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
        homePage.getTravellersDetailParentElement().click()
        const travellerLabels = []
        const expectedTravellerLabels = ['Adults', 'Children', 'Infant']
        let travellerNo=1 
        homePage.getTravellersDropDownLabels().each(($el, index, $list) => {
            
            let text = $el.text()
            travellerLabels.push(text)
        }).then(() => {
            expect(travellerLabels).to.deep.equal(expectedTravellerLabels)
         
        })

        //incrementing travellers
        homePage.getAdultField().find('#optAdult').should('have.value', 1)
        homePage.getAdultField().find('#add').click().then(() => {
            travellerNo +=1
        })
        homePage.getAdultField().find('#optAdult').should('have.value', 2)

        homePage.getChildField().find('#optChild').should('have.value', 0)
        homePage.getChildField().find('#add').click().then(() => {
            travellerNo +=1
        })
        homePage.getChildField().find('#optChild').should('have.value', 1)

        homePage.getInfantField().find('#optInfant').should('have.value', 0)
        homePage.getInfantField().find('#add').click().then(() => {
            travellerNo +=1
        })
        homePage.getInfantField().find('#optInfant').should('have.value', 1)

        homePage.getEconomyClassRadio().check().should('be.checked')
        homePage.getTraveller_Done_Button().click()

        homePage.getTravellerNo_Displayed().find('#spnDrpNo').then(($el) => {
            let text = $el.text()
            
            expect(text).to.equal(`${travellerNo}`)
            
        })
        homePage.getTravellerNo_Displayed().find('#spnTraveller').then(($el) => {
            let text = $el.text()
            
            expect(text).to.equal(`Traveller(s)`)
            
        })
        homePage.getSearchButton().click()



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

        searchResult.getFlight().eq(0).click()
        
        //enter the mail at checkout page
        checkoutPage.getEmailTextBox().type('abc@gmail.com')
        

    })


})