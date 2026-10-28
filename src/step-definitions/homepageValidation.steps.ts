
import {Given,When,Then} from "@cucumber/cucumber";
import { CustomWorld } from "../support/world";
import { expect } from "@playwright/test";
import { AutomationHomePage } from "../pages/automationHome.page";

let automationhomePage:AutomationHomePage;

Given('I open the source automation homepage', async function (this: CustomWorld) {
  automationhomePage = new AutomationHomePage(this.page);
  await automationhomePage.openAutomationHomePage();

});

When('I can see the text as {string}', async function (this: CustomWorld, string: string) {
  
     expect(await automationhomePage.validateAutomationTitle()).toBe(string);
     console.log("The title for automation title : "+ await automationhomePage.validateAutomationTitle());
});

When('I can see  as {string}', async function (this: CustomWorld, string: string) {
  
    expect(await automationhomePage.validateForSelenium()).toBe(string);
    console.log("The title for selenium text : "+ await automationhomePage.validateForSelenium());
});

Then('I can see the text like {string}', async function (this: CustomWorld, string: string) {
  
    expect(await automationhomePage.validateDataEntry()).toBe(string);
    console.log("The title for data entry text : "+ await automationhomePage.validateDataEntry());
});