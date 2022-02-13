const puppeteer = require("puppeteer");
const urlsList = require("./urls-list");

jest.setTimeout(20000);

describe("Testing url not to be 500 page", () => {
  for (const url of urlsList) {
    test(`checking => ${url} not to be a 500 page`, async () => {
      const browser = await puppeteer.launch();
      const page = await browser.newPage();
      await page.goto(url);

      const internalServerErrorHeader = await page.$(
        ".vertical-slider-item > .page-500 > h1"
      );
      if (internalServerErrorHeader === null) {
        await browser.close();
        expect(internalServerErrorHeader).toEqual(null);
      } else {
        const headerText = await internalServerErrorHeader.evaluate(
          (node) => node.innerText
        );
        await browser.close();

        expect(headerText).not.toEqual("Internal server error");
      }

      await browser.close();
    });
  }
});
