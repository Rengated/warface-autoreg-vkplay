import { json } from "stream/consumers";
import { Account } from "../../db/index.js";
import { reauth } from "../actions/reauth.js";
import { CONST } from "../constants.js";
import { requestRank } from "../requests/requestRank.js";
import { setupBrowser } from "../setup/browserSetup.js";

export const checkRank = async (email: string) => {
  let rank;
  let attempCount = 0;
  let browser;

  while (!rank && rank != 0 && attempCount < 2) {
    try {
      const warfaceAccount = await Account.findOne({
        email: email,
      });
      let setupResult = await setupBrowser(warfaceAccount?.cookies!, false);
      let page = await setupResult.getNewPage();
      browser = setupResult.browser;

      await reauth(page, email);
      await page.goto(CONST.URLS.WARFACE);
      rank = await requestRank(page);
      if (rank || rank == 0) {
        const lastCookies = JSON.stringify(await page.cookies());
        await Account.findOneAndUpdate(
          {
            email: email,
          },
          { rank: Number(rank), cookies: lastCookies }
        );
      }
    } catch (err) {
      console.log(err);
    }
    if (browser) {
      await browser.close();
    }
    attempCount++;
  }

  return rank || rank == 0 ? rank : "Error, wheh request rank";
};
