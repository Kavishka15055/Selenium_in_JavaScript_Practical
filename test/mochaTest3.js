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

  it("demonstrates implicit and explicit waits", async function () {
    // Open website
    await driver.get("https://www.amazon.in/");

    console.log("✅ Page opened successfully");

    // ---------------------------
    // 🕒 IMPLICIT WAIT
    // ---------------------------
    // Applies globally: Selenium will wait up to 10 seconds for elements to appear
    await driver.manage().setTimeouts({ implicit: 10000 });

    // Try to find a top navigation link using XPath
    const todaysDeals = await driver.findElement(By.xpath('//*[@id="nav-xshop"]/ul/li[6]/div/a'));
    console.log("✅ Found element using implicit wait:", await todaysDeals.getText());

    // ---------------------------
    // ⏳ EXPLICIT WAIT
    // ---------------------------
    // Now wait for a specific element to become clickable
    const condition = until.elementIsVisible(
      driver.findElement(By.id("twotabsearchtextbox")) // Search box
    );

    await driver.wait(condition, 10000); // Wait max 10 seconds
    console.log("✅ Search box is visible (explicit wait)");

    // Interact with that element
    const searchBox = await driver.findElement(By.id("twotabsearchtextbox"));
    await searchBox.sendKeys("laptop");

    const searchButton = await driver.findElement(By.id("nav-search-submit-button"));
    await searchButton.click();

    console.log("✅ Performed search successfully");
  });

  afterEach(async function () {
    if (driver) {
      await driver.quit();
    }
  });
});
