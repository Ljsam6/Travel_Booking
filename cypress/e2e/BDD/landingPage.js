import { When, Then, Given } from "@badeball/cypress-cucumber-preprocessor";
import HomePage from "../Page Object Model/HomePage";
import SearchResult from "../Page Object Model/SearchResult";
import CustomerDetailsPage from "../Page Object Model/CustomerDetailsPage";
import CustomSeatingPage from "../Page Object Model/CustomSeatingPage";

const fromCity = "Pune";
const toCity = "Delhi";
const homePage = new HomePage();
const searchResult = new SearchResult();
const customerDetailsPage = new CustomerDetailsPage();
const customSeatingPage = new CustomSeatingPage();

Given("I open flight booking website", () => {
  cy.visit("https://www.easemytrip.com/");
});
When("fill the travel details and validate the inputs", () => {
  // Click for one way , should highlight the Background
  homePage.getOneWayRadioButton().click();
  homePage
    .getOneWayRadioButton()
    .should("have.css", "background-color", "rgb(255, 255, 255)");

  // Validate From City Dropdown
  homePage.getFromCityDropDownParentElement().click();
  homePage.getFromCityDropDownTextBox().should("be.visible");
  homePage.getFromCityDropDownTextBox().type(fromCity);

  cy.fromCity(fromCity).then(() => {
    homePage.getToCityDropDownTextBox().should("be.visible");
    homePage.getToCityDropDownTextBox().type(toCity);
  }); //custom command

  //Validate To City form Dropdown

  cy.toCity(toCity); //custom command

  //Validate Departure Date Picker
  // cy.get("#frth_4_21\\/09\\/2023").click();

  homePage.getDepartureDateCurrentElement().click();

  //   homePage.getDepartureDate().then((el) => {
  //     const date = el.text();
  //     const currentDate = new Date();

  //     // Extract day, month, and year
  //     const day = currentDate.getDate();
  //     const month = currentDate.toLocaleString("default", { month: "short" });
  //     const year = currentDate.getFullYear().toString();

  //     // Create the formatted date string
  //     const formattedDate = `${day}${month}'${year}`;

  //     console.log(formattedDate);

  //     expect(date).to.include(formattedDate);
  //   });

  //Validating Traveller Section
  homePage.getTravellersDetailParentElement().click();
  const travellerLabels = [];
  const expectedTravellerLabels = [" Adults", " Children", " Infant"];
  let travellerNo = 1;
  homePage
    .getTravellersDropDownLabels()
    .each(($el, index, $list) => {
      let text = $el.text();
      travellerLabels.push(text);
    })
    .then(() => {
      // cy.log(travellerLabels)
      // cy.log(expectedTravellerLabels)
      expect(travellerLabels).to.deep.eq(expectedTravellerLabels);
    });

  //incrementing travellers
  homePage.getAdultField().find("#optAdult").should("have.value", 1);
  homePage
    .getAdultField()
    .find("#add")
    .click()
    .then(() => {
      travellerNo += 1;
    });
  homePage.getAdultField().find("#optAdult").should("have.value", 2);

  homePage.getChildField().find("#optChild").should("have.value", 0);
  homePage
    .getChildField()
    .find("#add")
    .click()
    .then(() => {
      travellerNo += 1;
    });
  homePage.getChildField().find("#optChild").should("have.value", 1);

  homePage.getInfantField().find("#optInfant").should("have.value", 0);
  homePage
    .getInfantField()
    .find("#add")
    .click()
    .then(() => {
      travellerNo += 1;
    });
  homePage.getInfantField().find("#optInfant").should("have.value", 1);

  homePage.getEconomyClassRadio().check().should("be.checked");
  homePage.getTraveller_Done_Button().click();

  homePage
    .getTravellerNo_Displayed()
    .find("#spnDrpNo")
    .then(($el) => {
      let text = $el.text();

      expect(text).to.equal(`${travellerNo}`);
    });
  homePage
    .getTravellerNo_Displayed()
    .find("#spnTraveller")
    .then(($el) => {
      let text = $el.text();

      expect(text).to.equal(` Traveller(s)`);
    });
  homePage.getSearchButton().click();
});

Then("Select the first flight", () => {
  // searchResult.getFlight().eq(0).click();

  // searchResult
  //   .getFlight()
  //   .find('span:contains("AirAsia")')
  //   .each((el, index, list) => {

  //     // cy.get(parent).find('.fltResult button:contains("Book Now")').click();

  //   });

  // cy.contains(".txt-r4", "AirAsia")
  //   .siblings(".col-md-2.col-sm-2.col-xs-6.txt-al-rt")
  //   .find("button.btn.book-bt-n")
  //   .click();

  // cy.get(".fltResult").each((el, index, list) => {
  //   if (el.find('span:contains("AirAsia")')) {
  //     cy.get('.fltResult button:contains("Book Now")').eq(index).click();

  //     cy.get(".fltResult").find();
  //   }
  // });.airl-txt-n

  cy.contains(".col-md-12 ", "AkasaAir")
    .find(".txt-al-rt button:contains('Book Now')")
    .click();
});

Then("Fill and validate the traveller details", () => {
  //enter the mail at checkout page
  customerDetailsPage.getEmailTextBox().type("abc@gmail.com");

  //assertions for billing element should not exist until radio buttons are checked
  customerDetailsPage.getMedicalRefundLabel().should("not.exist");
  //Insuarnce Sumary
  customerDetailsPage.getFareSummary().should("not.exist");

  //checking medical refund radio button
  customerDetailsPage.getMedicalRefundRadioButton().check();
  customerDetailsPage.getMedicalRefundRadioButton().should("be.checked");
  customerDetailsPage.getMedicalRefundLabel().should("be.visible");

  //checking insuurance radio button
  customerDetailsPage.getInsuranceRadioButton().check();
  customerDetailsPage.getInsuranceRadioButton().should("be.checked");
  customerDetailsPage.getFareSummary().should("be.visible");

  customerDetailsPage.getContinueBookingButton().click();

  customerDetailsPage.getAddAdultButton().click();
  cy.get("#titleAdult0").select("Mr").should("have.value", "Mr");
  cy.get("#txtFNAdult0").type("test").should("have.value", "test");
  cy.get("#txtLNAdult0").type("tester").should("have.value", "tester");

  cy.get("#titleAdult1").select("Mrs").should("have.value", "Mrs");
  cy.get("#txtFNAdult1").type("dan").should("have.value", "dan");
  cy.get("#txtLNAdult1").type("danny").should("have.value", "danny");

  cy.get("#titleChild0").select("Miss").should("have.value", "Miss");
  cy.get("#txtFNChild0")
    .type("ChildfirstName")
    .should("have.value", "ChildfirstName");
  cy.get("#txtLNChild0").type("lastname").should("have.value", "lastname");

  cy.get("#titleInfant0").select("MSTR").should("have.value", "MSTR");
  cy.get("#txtFNInfant0")
    .type("InfantFirstName")
    .should("have.value", "InfantFirstName");
  cy.get("#txtLNInfant0")
    .type("InfantLastName")
    .should("have.value", "InfantLastName");

  //Date Picker Selection
  cy.get("#divDOBDayInfant0").select(12);
  cy.get("#divDOBMonInfant0").select("Feb");
  cy.get("#divDOBYarInfant0").select("2023");

  //phone number
  customerDetailsPage.getAddPhoneNo().type(9654318930);

  customerDetailsPage.getSubmitButton().click();
});

Then("Skip Custom Seating", () => {
  customSeatingPage.getSkipSeatingButton().click();
});

Then("take to payment page", () => {
  cy.get("#DivContinueAncillary > .co1").click();
});
