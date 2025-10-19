const { Builder, Browser, By, until } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
const chromedriver = require("chromedriver");
const { describe, it, beforeEach, afterEach } = require("mocha");
const assert = require("assert");
const path = require("path");

describe("Selenium File Upload & Window Handling Example", function () {
  this.timeout(60000); // Set test timeout to 60 seconds
  let driver;
  let service;

  beforeEach(async function () {
    console.log("\n========== Starting a new test ==========");
    console.log("Setting up Chrome driver...");
    service = new chrome.ServiceBuilder(chromedriver.path);
    driver = await new Builder()
      .forBrowser(Browser.CHROME)
      .setChromeService(service)
      .build();
    console.log("✅ Chrome driver setup complete.");
  });

  it.only("Window switch and navigation test", async function () {
    try {
      console.log("\n🧭 Navigating to Applitools Kitchen...");
      await driver.get("https://kitchen.applitools.com/ingredients/file-picker");
      console.log("✅ Page loaded: file-picker page.");

      const currentWindowId = await driver.getWindowHandle();
      console.log("🪟 Current Window ID:", currentWindowId);

      console.log("📖 Opening a new browser window...");
      await driver.switchTo().newWindow("window");
      await driver.get("https://google.com");
      const newWindowId = await driver.getWindowHandle();
      console.log("✅ New Window ID:", newWindowId);

      console.log("↩️ Switching back to the original window...");
      await driver.switchTo().window(currentWindowId);
      console.log("✅ Successfully switched to original window.");

      console.log("➡️ Switching to the new window again...");
      await driver.switchTo().window(newWindowId);
      console.log("✅ Now in the new window.");

      console.log("🌐 Navigating to Amazon...");
      await driver.navigate().to("https://www.amazon.in");
      console.log("✅ Navigation to Amazon successful.");

      // Optional assertion to verify title contains 'Amazon'
      const title = await driver.getTitle();
      assert.ok(title.toLowerCase().includes("amazon"), "Amazon not found in title");
      console.log("🟢 Test Result: PASSED — Amazon page loaded successfully.");
    } catch (err) {
      console.error("🔴 Test Result: FAILED —", err.message);
      throw err; // rethrow to let Mocha mark it as failed
    }
  });

  afterEach(async function () {
    console.log("\nCleaning up...");
    if (driver) {
      await driver.quit();
      console.log("✅ Browser closed successfully.");
    }
    console.log("========== Test Finished ==========\n");
  });
});
