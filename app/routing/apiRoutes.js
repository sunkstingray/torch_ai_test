const puppeteer = require("puppeteer");

module.exports = function(app) {
  // bodyParser = require('body-parser').json();

  app.post("/api/search", async function(req, res) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    const url = "https://www.imdb.com";

    await page.goto(url);

    await page.type("#navbar-query", req.body.search);
    await page.click("#navbar-submit-button");

    await page.waitForSelector("h1.findHeader");

    const search = await page.evaluate(() =>
      Array.from(
        document.querySelectorAll("td.result_text, h3.findSectionHeader")
      )
        .map(result => result.innerText.trim())
        .map(result => result.replace("\n", " "))
        .map(result => result.replace("\"", "- "))
        .map(result => result.replace("\"", ""))
    );

    console.log(search);

    await browser.close();

    await res.json(search);

    console.log("req.body: " + req.body.search);
  });
};
