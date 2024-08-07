import { Page } from "puppeteer";

export const hideStats = async (page: Page) => {
  const status = await page.evaluate(async () => {
    const response = await fetch("https://ru.warface.com/dynamic/user/?a=setapiblacklist", {
      referrer: "https://ru.warface.com/profile/",
      referrerPolicy: "no-referrer-when-downgrade",
      body: null,
      method: "POST",
      mode: "cors",
      credentials: "include",
    });

    return response.status == 200;
  });

  return status;
};
