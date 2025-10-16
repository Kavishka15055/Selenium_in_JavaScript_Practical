const { Builder, Browser, By, Key } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
const chromedriver = require("chromedriver");

(async function example() {
  console.log("🚀 Starting Selenium test...");

  const service = new chrome.ServiceBuilder(chromedriver.path);
  const driver = await new Builder()
    .forBrowser(Browser.CHROME)
    .setChromeService(service)
    .build();

  try {
    console.log("🌐 Opening Selenium Mouse Interaction Test Page...");
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

    const textbox=await driver.findElement(By.id("clickable"));
    await driver.actions().sendKeys(textbox,"Kavishka Piyumal").perform();
    console.log("✅ Text Box test pass");
    await driver.sleep(2000);

    await driver.actions().keyDown(Key.BACK_SPACE).perform();
    await driver.sleep(2000);
    console.log("✅ Text Box select pass");

    console.log("🔍 Locating right-click (context click) target element...");
    const ele = await driver.findElement(By.id("click"));
    console.log("✅ Target element found.");

    console.log("🖱️ Performing right-click action on the element...");
    await driver.actions().contextClick(ele).perform();
    console.log("✅ Right-click performed successfully!");
    await driver.sleep(2000);

    console.log("🖱️ Performing double-click action on the element...");
    await driver.actions().doubleClick(ele).perform();
    console.log("✅ double-click performed successfully!");
    await driver.sleep(2000);

  } catch (error) {
    console.error("❌ Error occurred during test:", error);
  } finally {
    console.log("🧹 Closing browser and ending test...");
    await driver.quit();
    console.log("✅ Test completed successfully!");
  }
})();
