import { CONST } from "../constants.js";
import { getVerificationCode } from "../../mail/index.js";
import { getRandomPerson } from "../../utils/getRandomPerson.js";
import { Person } from "../../types/Person.js";
import { Page } from "puppeteer";
import { Account } from "../../db/index.js";

export const registration = async (page: Page): Promise<Omit<Person, "testing"> | false> => {
  const person: Omit<Person, "testing"> = getRandomPerson();

  await page.goto(CONST.URLS.PROFILE, { waitUntil: "networkidle2" });
  await page.waitForSelector(CONST.SELECTORS.CREATE_ACCOUNT_BUTTON);
  await page.click(CONST.SELECTORS.CREATE_ACCOUNT_BUTTON);
  await page.waitForSelector(CONST.SELECTORS.MAIL_INPUT);
  await page.type(CONST.SELECTORS.MAIL_INPUT, person.email);
  await new Promise((resolve) => setTimeout(resolve, 1000));
  await page.click(CONST.SELECTORS.SUBMIT_BUTTON);

  const verificationCode = String(await getVerificationCode(person.email));
  if (!verificationCode) {
    throw Error("Не пришел код для регистрации");
  }
  await page.waitForSelector(CONST.SELECTORS.CODE_INPUT);
  await page.type(CONST.SELECTORS.CODE_INPUT, verificationCode);
  await new Promise((resolve) => setTimeout(resolve, 1000));
  await page.click(CONST.SELECTORS.SUBMIT_BUTTON);

  await page.waitForSelector(CONST.SELECTORS.FIRSTNAME_INPUT);
  await page.type(CONST.SELECTORS.FIRSTNAME_INPUT, person.firstName);
  await page.type(CONST.SELECTORS.LASTNAME_INPUT, person.surname);
  if (person.gender == "мужской") await page.click(CONST.SELECTORS.MALE_SEX_RADIO);
  else await page.click(CONST.SELECTORS.FEMALE_SEX_RADIO);
  await page.evaluate(
    (date, selector) => {
      const dateInput = document.querySelector(selector);
      (dateInput as HTMLInputElement)!.value = date;
    },
    person.birthDate,
    CONST.SELECTORS.BIRTDAY_INPUT
  );
  await new Promise((resolve) => setTimeout(resolve, 3000));
  await page.click(CONST.SELECTORS.SUBMIT_BUTTON);

  await page.waitForSelector(CONST.SELECTORS.PASSWORD_INPUT);
  await page.type(CONST.SELECTORS.PASSWORD_INPUT, person.password);
  await page.type(CONST.SELECTORS.PASSWORD_CONFIRM_INPUT, person.password);
  await new Promise((resolve) => setTimeout(resolve, 1000));
  await page.click(CONST.SELECTORS.SUBMIT_BUTTON);
  await new Promise((resolve) => setTimeout(resolve, 5000));

  await page.waitForSelector(CONST.SELECTORS.CONFIRM_CHECKBOX);
  await page.click(CONST.SELECTORS.CONFIRM_CHECKBOX);
  await new Promise((resolve) => setTimeout(resolve, 1000));
  await page.click(CONST.SELECTORS.SUBMIT_BUTTON);

  await page.waitForSelector(CONST.SELECTORS.PAGE_LOADED);
  const success = !!!(await page.$(CONST.SELECTORS.SUCCESS_REGISTER));

  if (success) {
    return person;
  }
  return false;
};
