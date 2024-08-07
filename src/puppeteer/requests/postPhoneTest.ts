import { Page } from "puppeteer";

export const postPhoneTest = async (page: Page) => {
  const response = await page.evaluate(async () => {
    const formData = new FormData();
    formData.append("1", "2");
    formData.append("4", "9");
    formData.append("7", "18");
    formData.append("6", "17");
    formData.append("5", "14");
    formData.append("3", "7");
    formData.append("10", "29");
    formData.append("9", "26");
    formData.append("2", "5");
    formData.append("8", "21");
    const url = "https://ru.warface.com/dynamic/tests/?a=phonetests";
    const response = await fetch(url, {
      method: "POST",
      body: formData,
    });
    return response.status;
  });
  return response == 200;
};
