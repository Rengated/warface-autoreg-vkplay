import { Page } from "puppeteer";

export const postSecurityTest = async (page: Page) => {
  const response = await page.evaluate(async () => {
    const formData = new FormData();
    formData.append("63", "184");
    formData.append("64", "187");
    formData.append("74", "217");
    formData.append("72", "213");
    formData.append("66", "194");
    formData.append("70", "209");
    formData.append("61", "177");
    formData.append("68", "202");
    formData.append("69", "207");
    formData.append("65", "190");
    formData.append("71", "211");
    formData.append("73", "215");
    formData.append("62", "180");
    formData.append("75", "220");
    formData.append("62", "180");
    formData.append("67", "199");
    const url = "https://ru.warface.com/dynamic/tests/?a=tests";
    const response = await fetch(url, {
      method: "POST",
      body: formData,
    });
    return response.status;
  });
  return response == 200;
};
