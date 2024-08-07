import { registration } from "../actions/registartion.js";
import { authWarface } from "../actions/authWarface.js";
import { setupBrowser } from "../setup/browserSetup.js";
import { Account } from "../../db/index.js";
import { Person } from "../../types/Person.js";
import { submitSecurity } from "../actions/submitSecurity.js";
import { submitPhone } from "../actions/sumbitPhone.js";

export const createAccount = async () => {
  console.log(">> createAccount");
  let page, browser, account;

  while (!account) {
    let browser, page;
    try {
      const setupResult = await setupBrowser();
      page = await setupResult.getNewPage();
      browser = setupResult.browser;
      const accountData = await registration(page);
      if (accountData) {
        const isSuccesAuth = await authWarface(page);
        await new Promise((resolve) => setTimeout(resolve, 5000));
        if (isSuccesAuth) {
          const isPhoneTest = await submitPhone(page, accountData.email);
          await new Promise((resolve) => setTimeout(resolve, 5000));
          const isSecurityTest = await submitSecurity(page, accountData.email);
          if (isPhoneTest && isSecurityTest) {
            (accountData as Person).testing = {
              security: true,
              phone: true,
            };
            account = accountData;
            account.cookies = JSON.stringify(await page.cookies());
            await Account.create(accountData);
          } else {
            throw Error("Аккаунт не прошел тесты");
          }
        }
      }
    } catch (err) {
      account = { status: "Произошла ошибка при создании аккаунта, попробуйте еще раз" };
      console.log(err);
    } finally {
      if (browser) browser.close();
    }
  }
  return { email: account?.email, pasword: account?.password };
};
