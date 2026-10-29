
import {
  Before,
  After,
  setWorldConstructor,
  World,
  setDefaultTimeout,
  Status
} from "@cucumber/cucumber";

import {
  Browser,
  BrowserContext,
  Page,
  chromium,
  firefox,
  webkit
} from "@playwright/test";

import "dotenv/config";
import fs from "node:fs/promises";
import path from "node:path";

export class CustomWorld extends World {
  browser!: Browser;
  context!: BrowserContext;
  page!: Page;
}

setWorldConstructor(CustomWorld);

Before({ timeout: 50000 }, async function (this: CustomWorld) {
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
  } else {
    throw new Error(`Unsupported browser: ${browserName}`);
  }

  await fs.mkdir("videos-temp", { recursive: true });

  this.context = await this.browser.newContext({
    recordVideo: {
      dir: "videos-temp/",
      size: { width: 1280, height: 720 }
    }
  });

  this.page = await this.context.newPage();
});

After(async function (this: CustomWorld, { result, pickle }) {

  const failed = result?.status === Status.FAILED;

  // Create a safe, scenario-specific filename
  const scenarioName = pickle.name.replace(
    /[^a-zA-Z0-9-_]/g,
    "_"
  );

  // Add a unique ID to avoid collisions in parallel runs
  const uniqueName = `${scenarioName}_${pickle.id}`;

  // Get the video reference before closing the context
  const video = this.page?.video();

  try {
    if (failed && this.page) {
      await fs.mkdir("screenshots", { recursive: true });

      const screenshotPath = path.join(
        "screenshots",
        `${uniqueName}.png`
      );

      const screenshot = await this.page.screenshot({
        path: screenshotPath,
        fullPage: true
      });

      await this.attach(screenshot, "image/png");
    }
  } finally {
    // Close context first so the video is finalized
    await this.context?.close();

    try {
      
      // Check whether a video exists
      if (video) {
        const tempVideoPath = await video.path();
       
        // Save videos only when the scenario fails
        if (failed) {
          await fs.mkdir("videos", { recursive: true });
        
        // Create the final filename
          const finalVideoPath = path.join(
            "videos",
            `${uniqueName}.webm`
          );

         //Copy the failed video's recording
          await fs.copyFile(tempVideoPath, finalVideoPath);
         
        // Attach the video to the report
          await this.attach(
            await fs.readFile(finalVideoPath),
            "video/webm"
          );
        }

        // Delete temporary video for both passed and failed scenarios
        await fs.unlink(tempVideoPath).catch(() => {});
      }
    } 
    // Always close the browser
    finally {
      await this.browser?.close();
    }
  }
});

setDefaultTimeout(60000);