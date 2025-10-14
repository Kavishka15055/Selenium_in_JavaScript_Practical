const { Builder, Browser, By } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const chromedriver = require('chromedriver');

(async function example() {
  console.log("🚀 Starting Selenium test...");

  const service = new chrome.ServiceBuilder(chromedriver.path);
  const driver = await new Builder()
    .forBrowser(Browser.CHROME)
    .setChromeService(service)
    .build();

  try {
    console.log("🌐 Navigating to Amazon...");
    await driver.get('https://www.amazon.com');

    console.log("🔍 Locating footer link...");
    const ele = await driver.findElement(By.css('a[href="https://www.amazon.com/ir"].nav_a'));

    console.log("📜 Scrolling to the element...");
    await driver.executeScript("arguments[0].scrollIntoView()", ele);

    console.log("🖱️ Moving to the element and clicking...");
    await driver.actions()
      .move({ origin: ele })
      .pause(2000)
      .click()
      .perform();

    console.log("✅ Element clicked successfully!");

    console.log("⏳ Waiting for 1 second...");
    await driver.sleep(1000);

    console.log("📸 Taking screenshot for verification...");
    const screenshot = await driver.takeScreenshot();
    const fs = require('fs');
    fs.writeFileSync('amazon_link_click.png', screenshot, 'base64');
    console.log("💾 Screenshot saved as 'amazon_link_click.png'");

  } catch (err) {
    console.error("❌ An error occurred:", err);
  } finally {
    console.log("🧹 Closing browser...");
    await driver.quit();
    console.log("✅ Test completed successfully!");
  }
})();

