import { Page } from "puppeteer";

export const requestInventory = async (page: Page) => {
  const haveVip = await page.evaluate(async () => {
    const response = await fetch("https://ru.warface.com/minigames/inventory/api/list", {
      headers: {
        accept: "application/json, text/plain, */*",
        "accept-language": "ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7,bn;q=0.6",
        "sec-ch-ua": '"Not/A)Brand";v="8", "Chromium";v="126", "Google Chrome";v="126"',
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": '"macOS"',
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
      },
      referrer: "https://ru.warface.com/minigames/bpservices",
      referrerPolicy: "no-referrer-when-downgrade",
      body: null,
      method: "GET",
      mode: "cors",
      credentials: "include",
    });
    const jsonBody = await response.json();
    return jsonBody?.data?.inventory?.length;
  });
  return haveVip;
};
