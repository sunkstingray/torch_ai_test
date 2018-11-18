const puppeteer = require("puppeteer");

const resultsObject = {
  Titles: [],
  Names: [],
  Keywords: [],
  Companies: []
}

// const currentKey = ""

function makeObject(results) {
  let currentKey = "";
  let itemsProcessed = 0;

  resultsObject.Titles = [];
  resultsObject.Names = [];
  resultsObject.Keywords = [];
  resultsObject.Companies = [];

  for (let i = 0; i < results.length; i++) {
    itemsProcessed++;

    console.log("element: "+results[i]+"IP"+itemsProcessed);

    if (results[i] === "Titles" || results[i] === "Names"  || results[i] === "Keywords"  || results[i] === "Companies") {
      currentKey = results[i];
      console.log("key: "+currentKey);
    } else {
      console.log("pushed element: "+results[i]);
      resultsObject[currentKey].push(results[i]);
    }

    if(itemsProcessed === results.length) {
      console.log("!!!"+JSON.stringify(resultsObject));
      return resultsObject;
    }
  }

  // results.forEach(element => {
  //   itemsProcessed++;
  //   console.log("element: "+element);
  //   if (element = "Titles" || "Names"  || "Keywords"  || "Companies") {
  //     currentKey = element;
  //     console.log("key: "+currentKey);
  //   }
  //   else {
  //     console.log("pushed element: "+element);
  //     resultsObject[currentKey].push(element);
  //   }
  //   if(itemsProcessed === results.length) {
  //     console.log(resultsObject);
  //     return resultsObject;
  //   }
  // });
}

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
