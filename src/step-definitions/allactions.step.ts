import { Given,When,Then } from "@cucumber/cucumber";
import { expect , Page } from "@playwright/test";
import {AllActions} from "../pages/allactions.page"
import {CustomWorld} from "../support/world"

let allactions:AllActions;

When('I type name into filed as {string}', async function (this:CustomWorld,name:string) {
   allactions = new AllActions(this.page);
   await allactions.naming(name);
   await expect(this.page.getByPlaceholder("Enter Name")).toHaveValue(name);
   
});

When('I type email as {string}', async function (this:CustomWorld,email:string) {
  await allactions.emailinput(email);
  await expect(this.page.getByPlaceholder("Enter EMail")).toHaveValue(email);

});

When('I type phone number as {string}', async function (this:CustomWorld,phone:string) {
  await allactions.phoneinput(phone);
  await expect(this.page.getByPlaceholder("Enter Phone")).toHaveValue(phone);

});

When('I type address as {string}', async function (this:CustomWorld,address:string) {
  
    await allactions.addressinput(address);
    await expect(this.page.getByLabel("Address:")).toHaveValue(address);
});

When('I select gender as a gender', async function (this:CustomWorld) {
  
    await allactions.genderinput();
    await expect(this.page.locator("#male")).toBeChecked();
    
});

When('I select days as a day', async function (this:CustomWorld,) {
  
    await allactions.daysinput();
    await expect(this.page.locator("#sunday")).toBeChecked();
});


When('I will handle the alert as well', async function (this:CustomWorld) {
   
    await allactions.alertAction("accept", "Thanks");
   
   
});