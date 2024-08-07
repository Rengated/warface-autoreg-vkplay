import { Page } from "puppeteer";
import { CONST } from "../constants.js";
import { Account } from "../../db/index.js";
import { postPhoneTest } from "../requests/postPhoneTest.js";

export const submitPhone = async (page: Page, email: string) => {
  await page.goto(CONST.URLS.PHONE_TEST, { waitUntil: "networkidle2" });
  const isSuccess = await postPhoneTest(page);

  if (isSuccess!) {
    await Account.findOneAndUpdate(
      {
        email: email,
      },
      {
        "testing.phone": true,
      }
    );
  }

  return isSuccess;
};
