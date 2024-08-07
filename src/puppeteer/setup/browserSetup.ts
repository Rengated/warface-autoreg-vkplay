import puppeteer from "puppeteer-extra";
import { newInjectedPage } from "fingerprint-injector";
import { Browser, HTTPRequest, Page } from "puppeteer";
import "dotenv/config";

export const setupBrowser = async (cookies?: string, withProxy: boolean = true) => {
  let browser: Browser;

  if (withProxy) {
    browser = await puppeteer.launch({
      headless: false,
      args: [`--proxy-server=${process.env.PROXY_HOST}`, "--no-sandbox", "--disable-setuid-sandbox"],
    });
  } else {
    browser = await puppeteer.launch({
      headless: false,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });
  }

  const getNewPage = async (): Promise<Page> => {
    const page = await newInjectedPage(browser, {
      fingerprintOptions: {
        devices: ["mobile"],
        operatingSystems: ["android", "ios"],
        screen: {
          minWidth: 550,
        },
      },
    });
    if (cookies) {
      try {
        await page.setCookie(...JSON.parse(cookies));
      } catch (err) {}
    }
    await page.setRequestInterception(true);
    if (withProxy) {
      await page.authenticate({
        username: process.env.PROXY_USER!,
        password: process.env.PROXY_PASSWORD!,
      });
    }

    page.setDefaultNavigationTimeout(60000);
    page.on("request", (request: HTTPRequest) => {
      const resourceType = request.resourceType();
      if (resourceType === "image" || resourceType === "media" || resourceType === "font") {
        request.abort();
      } else {
        request.continue();
      }
    });
    return page;
  };

  return { browser, getNewPage };
};
