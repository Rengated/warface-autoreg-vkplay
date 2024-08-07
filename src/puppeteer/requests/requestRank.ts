import { Page } from "puppeteer";

export const requestRank = async (page: Page): Promise<number> => {
  const rank = await page.evaluate(async () => {
    const response = await fetch("https://ru.warface.com/dynamic/profile/?a=profile_json", {
      referrer: "https://ru.warface.com/profile/",
      referrerPolicy: "no-referrer-when-downgrade",
      body: null,
      method: "GET",
      mode: "cors",
      credentials: "include",
    });

    const responseJSON = await response.json();
    const playerId = Object.keys(responseJSON.chars)[0];
    const rank = responseJSON.chars[playerId]?.draw?.rank_id;
    return rank ? rank : 0;
  });

  return Number(rank);
};
