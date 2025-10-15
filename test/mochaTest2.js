const { Builder, Browser, By, Key } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
const chromedriver = require("chromedriver");

describe("timeout", function () {
  this.timeout(50000); // Setting timeout to 10 seconds
  let driver;
  let service;

  beforeEach(async function () {
    service = new chrome.ServiceBuilder(chromedriver.path);
    driver = await new Builder()
      .forBrowser(Browser.CHROME)
      .setChromeService(service)
      .build();
  });

  it("implicit wait", async function () {
    await driver.get(
      "https://www.amazon.in/"
    );
   await driver.manage().setTimeouts({implicit:10000})
   await driver.findElement(By.xpath('//*[@id="nav-xshop"]/ul/li[6]/div/a'))
   await driver.findElement(By.xpath("/jhjhjh"))
  });

  afterEach(async function () {
    if (driver) {
      await driver.quit();
    }
  });
});
