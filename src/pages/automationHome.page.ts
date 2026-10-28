import { test,Locator, Page } from "@playwright/test";

export class AutomationHomePage {
 
    readonly page:Page;
    readonly automationTitle:Locator;
    readonly forSelenium:Locator;        
    readonly dataEntry:Locator;

    constructor(page:Page){
        this.page=page;
        this.automationTitle=page.getByRole('heading',{name:'Automation Testing Practice'});
        this.forSelenium=page.getByText('Selenium, Cypress & Playwright');
        this.dataEntry=page.locator("//a[text()='Data Entry Form']");
    }


    async openAutomationHomePage(){
        await this.page.goto(process.env.BASE_URL!,{waitUntil:'domcontentloaded'});
    }

    async validateAutomationTitle():Promise<string | null>{
        
        const title=await this.automationTitle.innerText();
        return title;
    }

    async validateForSelenium():Promise<string | null>{
        
        const seleniumText=await this.forSelenium.innerText();
        return seleniumText;
    }

    async validateDataEntry():Promise<string | null>{
        
        const dataEntryText=await this.dataEntry.innerText();
        return dataEntryText;
    }

}