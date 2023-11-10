Feature: End to End Flight Booking  Validation

    Enter a To and from Destination , add travellers and pick the forst flight and book the ticket.

    Scenario: Fill the details in the landing page
        Given  I open flight booking website
        When  fill the travel details and validate the inputs


    Scenario: Select a one way flight
        Given  I open flight booking website
        When  fill the travel details and validate the inputs
        Then  Select the first flight

    Scenario: Filling the traveller details
        Given  I open flight booking website
        When  fill the travel details and validate the inputs
        Then  Select the first flight
        Then Fill and validate the traveller details
        Then Skip Custom Seating
        Then take to payment page

