// Dependencies
const puppeteer = require("puppeteer");

// Object to hold scraped data
const resultsObject = {
  Titles: [],
  Names: [],
  Keywords: [],
  Companies: []
}

// Function to build results object using headings to sort
function makeObject(results) {
  let currentKey = "";
  let itemsProcessed = 0;

  resultsObject.Titles = [];
  resultsObject.Names = [];
  resultsObject.Keywords = [];
  resultsObject.Companies = [];

  for (let i = 0; i < results.length; i++) {
    itemsProcessed++;

    if (results[i] === "Titles" || results[i] === "Names"  || results[i] === "Keywords"  || results[i] === "Companies") {
      currentKey = results[i];
    } else {
      resultsObject[currentKey].push(results[i]);
    }

    if(itemsProcessed === results.length) {
      return resultsObject;
    }
  }
}

// API path for to return scraped data to frontend
module.exports = function(app) {

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
        .map(result => result.replace(/\n/g, " "))
        .map(result => result.replace(/\"/g, "'"))
    );

    await browser.close();

    let searchResults = await makeObject(search);

    await res.json(searchResults);

  });
};
