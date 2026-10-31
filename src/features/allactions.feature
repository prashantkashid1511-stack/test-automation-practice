
@allactions
Feature: all actions

  Scenario: validate the all actions of source automation

    Given I open the source automation homepage
    When I type name into filed as "Prashant kashid"
    When I type email as "prashant@gmail.com"
    When I type phone number as "1234567890"
    When  I type address as "pune"
    When I select gender as a gender
    When I select days as a day
    Then I will handle the alert as well