import { Page } from "puppeteer";

export const submitAgreement = async (page: Page) => {
  await page.evaluate(async () => {
    await fetch("https://ru.warface.com/dynamic/auth/?confirm_reg=true", {
      referrer: "https://ru.warface.com/",
      referrerPolicy: "no-referrer-when-downgrade",
      body: null,
      method: "POST",
      mode: "cors",
      credentials: "include",
    });
  });
};
