const puppeteer = require('puppeteer');

async function scrapeData(url){
  const browser = await puppeteer.launch();
  let response = {};
  try{
      const page = await browser.newPage();
      await page.goto(url);

      const [ttl] = await page.$x('//*[@id="productTitle"]');
      const text1 = await ttl.getProperty('textContent');
      const title = await text1.jsonValue();
      
      const [des] = await page.$x('//*[@id="feature-bullets"]/ul/li[4]/span');
      const text2 = await des.getProperty('textContent');
      const description = await text2.jsonValue();

      const [img] = await page.$x('//*[@id="landingImage"]');
      const src = await img.getProperty('src');
      const images = await src.jsonValue();

      response = {
          "title": title.trim(),
          "description": description.trim(),
          "image": images.trim()
      }
  }
  catch(e){
      response = {
          "error": "Could not fetch data"
      }
  }
  finally{
      browser.close();
      return response;

  }
}

module.exports.scrapeData = scrapeData;