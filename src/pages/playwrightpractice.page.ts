import {test , Locator ,Page} from "@playwright/test"

export class PlaywrightPractice {

       readonly page:Page;
       readonly playwrightPractice:Locator;
       readonly playwrightPracticeHeading:Locator;
       readonly acceptTerms:Locator;
       readonly userName: Locator;
       readonly startButton:Locator;

    constructor(page:Page) {

        this.page=page;
        this.playwrightPractice= page.getByRole('link', { name: 'PlaywrightPractice' });
        this.playwrightPracticeHeading= page.getByRole('heading', { name: 'PlaywrightPractice' });
        this.acceptTerms= page.getByRole('checkbox', {name:'Accept terms'});
        this.userName= page.locator("#username");
        this.startButton = page.getByRole('button', {name:'START'});
 
    }


    async  playwrightPracticeLink():Promise<void> {
        
       await this.playwrightPractice.click();
    }

    async  playwrightPracticeHeadingMethod():Promise<string| null> {
        
         return await this.playwrightPracticeHeading.textContent();
    }

    async accepTermCheckbox():Promise<void>{

        await this.acceptTerms.check();
    }
  
    async inputUsername():Promise<void>{

        await this.userName.fill('prashant kashid');
    }

    async startButtonMethod():Promise<void>{
       
       this.startButton.getByText('START');
    }

}