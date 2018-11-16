const puppeteer = require("puppeteer");

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const url = "https://www.imdb.com";

  await page.goto(url);

  await page.type("#navbar-query", "star wars");
  await page.click("#navbar-submit-button");

  await page.waitForSelector("h1.findHeader");

  const search = await page.evaluate(() =>
    Array.from(
      document.querySelectorAll("td.result_text, h3.findSectionHeader")
    ).map(result => result.innerText.trim())
  );

  console.log(search);

  await browser.close();
})();