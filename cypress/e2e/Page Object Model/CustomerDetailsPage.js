class CustomerDetailsPage {
  getEmailTextBox() {
    return cy.get("#txtEmailId");
  }

  getMedicalRefundLabel() {
    return cy.get('#divFareSummary .pr:contains("Medical Refund Policy")');
  }

  getFareSummary() {
    return cy.get('#divFareSummary .pr:contains("Insurance")');
  }
  getMedicalRefundRadioButton() {
    return cy.get("#chkMedicalYES");
  }
  getInsuranceRadioButton() {
    return cy.get("#chkInsurance");
  }
  getContinueBookingButton() {
    return cy.get("#spnVerifyEmail");
  }
  getAddAdultButton() {
    return cy.get(".add_adlt").eq(0);
  }
  getAddPhoneNo() {
    return cy.get("#txtCPhone");
  }
  getSubmitButton() {
    return cy.get("#spnTransaction");
  }
}

export default CustomerDetailsPage;
