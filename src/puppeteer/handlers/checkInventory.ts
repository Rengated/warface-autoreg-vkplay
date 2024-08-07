import { Account } from "../../db/index.js";
import { reauth } from "../actions/reauth.js";
import { CONST } from "../constants.js";
import { hideStats } from "../requests/hideStats.js";
import { postGameinventory } from "../requests/postGameinventory.js";
import { requestInventory } from "../requests/requestInvetory.js";
import { setupBrowser } from "../setup/browserSetup.js";

export const checkInventory = async (email: string) => {
  let status = false;
  let statusGetted = false;
  let attempCount = 0;
  let browser;

  while (!statusGetted && attempCount < 2) {
    try {
      const warfaceAccount = await Account.findOne({
        email: email,
      });
      let setupResult = await setupBrowser(warfaceAccount?.cookies!, false);
      let page = await setupResult.getNewPage();
      browser = setupResult.browser;
      await reauth(page, email);
      await page.goto(CONST.URLS.WARFACE);
      const inventoryAvialible = await requestInventory(page);
      if (inventoryAvialible) {
        status = await postGameinventory(page);
        statusGetted = true;
        if (!warfaceAccount?.statsHidden) {
          const hideStatus = await hideStats(page);
          if (hideStatus) {
            const lastCookies = JSON.stringify(await page.cookies());
            await Account.findByIdAndUpdate(
              {
                email: email,
              },
              { statsHidden: true, cookies: lastCookies }
            );
          }
        }
      }
    } catch (err) {
      console.log(err);
    }
    if (browser) {
      await browser.close();
    }
    attempCount++;
  }
  return status;
};
