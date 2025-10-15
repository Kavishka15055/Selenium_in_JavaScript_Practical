const { Builder, Browser, By, until } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
const chromedriver = require("chromedriver");
const { describe, it, beforeEach, afterEach } = require("mocha");

describe("Selenium Waits Example", function () {
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

  it("implicit waits", async function () {
    
    await driver.get("https://www.amazon.in/");
    //await driver.manage().setTimeouts({implicit:1000})
    const ele = await driver.findElement(By.xpath('//*[@id="nav-xshop"]/ul/li[6]/div/a'))
    assert.ok(ele.isDisplayed())
  });
  it("explicit waits", async function () {
    
    await driver.get("https://www.amazon.in/");
   //await driver.manage().setTimeouts({implicit:1000})
    const ele = await driver.findElement(By.xpath('//*[@id="nav-xshop"]/ul/li[6]/div/a'))
    assert.ok(ele.isDisplayed())
  });


  afterEach(async function () {
    if (driver) {
      await driver.quit();
    }
  });
});
