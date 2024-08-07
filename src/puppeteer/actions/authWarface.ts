import { Page } from "puppeteer";
import { CONST } from "../constants.js";
import { submitAgreement } from "../requests/submitAgreement.js";

export const authWarface = async (page: Page) => {
  try {
    await page.goto(CONST.URLS.WARFACE_AUTH, { waitUntil: "load" });
    await page.waitForSelector(CONST.SELECTORS.SUBMIT_BUTTON);
    await page.click(CONST.SELECTORS.SUBMIT_BUTTON);
    await new Promise((resolve) => setTimeout(resolve, 3000));
    await page.goto(CONST.URLS.WARFACE);
    await submitAgreement(page);
    await new Promise((resolve) => setTimeout(resolve, 3000));
    return true;
  } catch (err) {
    return false;
  }
};
