import { Page } from "puppeteer";
import { Account } from "../../db/index.js";
import { CONST } from "../constants.js";

export const reauth = async (page: Page, email: string) => {
  let isLoggedIn = false;

  try {
    await page.goto(CONST.URLS.WARFACE);
    isLoggedIn = !!(await page.waitForSelector(CONST.SELECTORS.NOTIFICATIONS, { timeout: 10_000 }));
    console.log("Мы авторизовались с помощью куков");
    return;
  } catch (err) {}

  const user = await Account.findOne({
    email: email,
  });

  await page.goto(CONST.URLS.WARFACE_AUTH);
  await page.waitForSelector(CONST.SELECTORS.REAUTH_LOGIN);
  await page.type(CONST.SELECTORS.REAUTH_LOGIN, user!.email!);
  await page.waitForSelector(CONST.SELECTORS.REAUTH_SUBMIT);
  await page.click(CONST.SELECTORS.REAUTH_SUBMIT);

  try {
    await page.waitForSelector(CONST.SELECTORS.MAIL_INPUT, { timeout: 5000 });
    await page.type(CONST.SELECTORS.MAIL_INPUT, email);
    await page.click(CONST.SELECTORS.SUBMIT_BUTTON);
  } catch (err) {}

  await page.waitForSelector(CONST.SELECTORS.REAUTH_PASSWORD);
  await page.type(CONST.SELECTORS.REAUTH_PASSWORD, user!.password!);
  await page.waitForSelector(CONST.SELECTORS.REAUTH_SUBMIT);
  await page.click(CONST.SELECTORS.REAUTH_SUBMIT);
  await new Promise((resolve) => setTimeout(resolve, 2000));

  await page.waitForSelector(CONST.SELECTORS.SUBMIT_BUTTON);
  await page.click(CONST.SELECTORS.SUBMIT_BUTTON);
  console.log("Нажали на продолжить");
  await new Promise((resolve) => setTimeout(resolve, 8000));
};
