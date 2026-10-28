import { test, expect } from "@playwright/test";
import { Given,When,Then } from "@cucumber/cucumber";
import { CustomWorld } from "../support/world";
import {PlaywrightPractice} from "../pages/playwrightpractice.page"

let playwrightpractice:PlaywrightPractice;

When('I will click on the playwright practice page', async function (this:CustomWorld){
   
  playwrightpractice=new PlaywrightPractice(this.page);
  await playwrightpractice.playwrightPracticeLink();
  await expect(this.page).toHaveURL(
        'https://testautomationpractice.blogspot.com/p/playwrightpractice.html'
    );
})

When('I see the playwright practice text', async function (this:CustomWorld){
   
  console.log(await playwrightpractice.playwrightPracticeHeadingMethod());
  
})

When('I click on the accept terms buttons', async function (this:CustomWorld){
   
  await playwrightpractice.accepTermCheckbox();
  await expect(playwrightpractice.acceptTerms).toBeChecked();
})

When('I click on the username and fill', async function (this:CustomWorld){
   
  await playwrightpractice.inputUsername();
  await expect(playwrightpractice.userName).toHaveValue('prashant kashid');
   
})

Then('I can see the START button', async function (this:CustomWorld){
   
  await expect(playwrightpractice.startButton).toBeVisible(); 
  await playwrightpractice.startButtonMethod();

})