import { Before, After , setWorldConstructor, World , setDefaultTimeout, Status } from "@cucumber/cucumber";
import { Browser, BrowserContext, Page , chromium, firefox,webkit } from "@playwright/test";
import "dotenv/config";

export class CustomWorld extends World {

      browser!: Browser;
      context!: BrowserContext;
      page!: Page;

}

setWorldConstructor(CustomWorld);


Before({ timeout: 50000 } , async function (this: CustomWorld) {

 // this.browser = await firefox.launch({ headless: false , slowMo: 2000 });

  const browserName = process.env.BROWSER || "chromium";

  if (browserName === "chromium") {
    this.browser = await chromium.launch({
      headless: false,
      slowMo: 1000
    });
  } else if (browserName === "firefox") {
    this.browser = await firefox.launch({
      headless: false,
      slowMo: 1000
    });
  } else if (browserName === "webkit") {
    this.browser = await webkit.launch({
      headless: false,
      slowMo: 1000
    });

  }

  this.context = await this.browser.newContext({ recordVideo: {dir: "videos/"}});
  this.page = await this.context.newPage();


});

After( async function (this: CustomWorld, { result }) {
    
    if (result?.status === Status.FAILED) {

    const screenshot = await this.page.screenshot();

    await this.attach(screenshot, "image/png");

  }

  await this.browser?.close();
  await this.context?.close();

});

setDefaultTimeout(60000);


