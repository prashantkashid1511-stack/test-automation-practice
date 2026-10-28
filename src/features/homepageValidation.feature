
@homepageValidation
Feature: Homepage validation

  Scenario: validate the homepage of source automation

    Given I open the source automation homepage
    When I can see the text as "Automation Testing Practice"
    When I can see  as "For Selenium, Cypress & Playwright"
    Then I can see the text like "Data Entry Form"
    
