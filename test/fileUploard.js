const {Builder,Browser, By,until}=require("selenium-webdriver");
const chrome=require("selenium-webdriver/chrome");
const chromedriver=require("chromedriver");
const { describe, it, beforeEach, afterEach } = require("mocha");
const assert =require("assert");
const path=require('path')


describe("Selenium File Uploard Example", function () {
  this.timeout(60000); // Set test timeout to 60 seconds
  let driver;
  let service;

  beforeEach(async function () {
    // Set up Chrome driver
    service = new chrome.ServiceBuilder(chromedriver.path);
    driver = await new Builder()
      .forBrowser(Browser.CHROME)
      .setChromeService(service)
      .build();
  });

   it.only('frames2',async function(){
      await driver.get("https://kitchen.applitools.com/ingredients/file-picker");
      console.log(process.cwd()+path.join('/files/sample.pdf'));
      driver.findElement(By.name("photo-upload")).sendKeys(process.cwd()+path.join('/files/sample.pdf'));
      await driver.sleep(2000);
    })

  afterEach(async function () {
      if (driver) {
        await driver.quit();
      }
    });
  });