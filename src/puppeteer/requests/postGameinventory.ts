import { Page } from "puppeteer";

export const postGameinventory = async (page: Page) => {
  const succcess = await page.evaluate(async () => {
    const profileResponse = await fetch("https://ru.warface.com/dynamic/profile/?a=profile_json", {
      referrer: "https://ru.warface.com/profile/",
      referrerPolicy: "no-referrer-when-downgrade",
      body: null,
      method: "GET",
      mode: "cors",
      credentials: "include",
    });
    const responseJSON = await profileResponse.json();
    const playerId = Object.keys(responseJSON.chars)[0];

    const formData = new FormData();
    formData.append("profile_id", playerId);
    formData.append("item_id", "934");
    formData.append("count", "1");
    formData.append("is_notice", "0");

    const response = await fetch("https://ru.warface.com/minigames/inventory/v2/api/pass-to-game", {
      referrer: "https://ru.warface.com/minigames/bpservices",
      referrerPolicy: "no-referrer-when-downgrade",
      body: formData,
      method: "POST",
      mode: "cors",
      credentials: "include",
    });
    return response.status == 200;
  });

  return succcess;
};
