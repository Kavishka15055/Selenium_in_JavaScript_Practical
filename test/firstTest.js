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
    await driver.get('https://www.selenium.dev/selenium/web/mouse_interaction.html');
    const srcEll=await driver.findElement(By.id("draggable"))
    const targetEle=await driver.findElement(By.id("droppable"))
    await driver.actions({async:true}).dragAndDrop(srcEll, targetEle).perform();
    await driver.sleep(2000)
  } finally{
    await driver.quit();
  }
})();

