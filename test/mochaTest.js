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
      "https://www.selenium.dev/selenium/web/mouse_interaction.html"
    );
    console.log("✅ Page loaded successfully.");

    console.log("🔍 Locating draggable and droppable elements...");
    const srcEll = await driver.findElement(By.id("draggable"));
    const targetEle = await driver.findElement(By.id("droppable"));
    console.log("✅ Elements found: draggable & droppable.");

    console.log("🖱️ Performing drag and drop action...");
    await driver
      .actions({ async: true })
      .dragAndDrop(srcEll, targetEle)
      .perform();
    console.log("✅ Drag and drop completed successfully!");
    await driver.sleep(2000);
    // Add your test assertions here
  });

  afterEach(async function () {
    if (driver) {
      await driver.quit();
    }
  });
});
