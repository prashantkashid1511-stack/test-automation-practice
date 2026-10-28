import type { Locator,Page } from "@playwright/test";

export class CommonUtils {

// 1. Dropdown
  static async selectDropdownOption(
    dropdown: Locator,
    option: string
  ): Promise<void> {
    await dropdown.selectOption({ label: option });
  }

  // 2. Check checkbox
  static async checkIfUnchecked(locator: Locator): Promise<void> {
  if (!(await locator.isChecked())) {
    await locator.check();
  }
}

  // 3. Uncheck checkbox
  static async uncheckIfChecked(locator: Locator): Promise<void> {
  if ((await locator.isChecked())) {
    await locator.check();
  }
}

  // 4. Select radio button
  static async selectRadioButton(radio: Locator): Promise<void> {
    await radio.check();
  }

  // 5. Handle JavaScript alert
   static async handleAlert(
    page: Page,
    action: "accept" | "dismiss",
    promptText?: string
  ): Promise<void> {
    page.on("dialog", async (dialog) => {
      if (action === "accept") {
       await dialog.accept(promptText);
       console.log(await dialog.dismiss()); 
      } else {
        await dialog.dismiss();
      }
    });
  }

  // 6. Double-click
  static async doubleClick(element: Locator): Promise<void> {
    await element.dblclick();
  }

  // 7. Right-click
  static async rightClick(element: Locator): Promise<void> {
    await element.click({ button: "right" });
  }

  // 8. Hover
  async hoverElement(element: Locator): Promise<void> {
    await element.hover();
  }

  // 9. Upload file
  static async uploadFile(
    fileInput: Locator,
    filePath: string
  ): Promise<void> {
    await fileInput.setInputFiles(filePath);
  }
}

