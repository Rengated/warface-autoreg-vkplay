import { Browser, Page } from "puppeteer";
import { CONST } from "../constants.js";
import { Account } from "../../db/index.js";
import { resolve } from "path";
import { postSecurityTest } from "../requests/postSecurityTest.js";

export const submitSecurity = async (page: Page, email: string) => {
  await page.goto(CONST.URLS.SECURITY_TEST, { waitUntil: "networkidle2" });
  const isSuccess = await postSecurityTest(page);

  if (isSuccess!) {
    await Account.findOneAndUpdate(
      {
        email: email,
      },
      {
        "testing.security": true,
      }
    );
  }
  return isSuccess;
};
