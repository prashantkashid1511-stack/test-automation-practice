import { test,Locator, Page } from "@playwright/test";
import {CommonUtils} from "../Utils/commonUtils";

export class AllActions {
    
    readonly page: Page;
    readonly name:Locator;
    readonly email:Locator;
    readonly phone:Locator;
    readonly address:Locator;
    readonly gender:Locator;
    readonly days:Locator;
    readonly upload:Locator;
    readonly promptAlert:Locator;

    constructor(page:Page){
     
        this.page=page;
        this.name=page.getByPlaceholder("Enter Name");
        this.email= page.getByPlaceholder("Enter EMail");
        this.phone= page.getByPlaceholder("Enter Phone");
        this.address= page.getByLabel("Address:");
        this.gender= page.locator("#male");
        this.days= page.locator("#sunday");
        this.upload=page.locator("#singleFileInput");
        this.promptAlert=page.getByRole("button",{name:"Prompt Alert"});
    }

    async naming(name:string):Promise<void> {
        await this.name.fill(name);
        console.log("the name enetered is:" + name);
        
    }

    async emailinput(email:string):Promise<void> {
        await this.email.fill(email);
    }

    async phoneinput(phone:string):Promise<void> {
        await this.phone.fill(phone);
    }

    async addressinput(address:string):Promise<void> {
        await this.address.fill(address);
    }

    async genderinput():Promise<void> {
        await this.gender.check();
    }

    async daysinput():Promise<void> {
        await this.days.check();
    }
    
   async uploadfilemetod(filePath:string):Promise<void>{

     await CommonUtils.uploadFile( this.upload , filePath );
    
   }

  async alertAction(action: "accept" | "dismiss", promptText?: string): Promise<void> {
    
  await CommonUtils.handleAlert(this.page, action, promptText);
}

}