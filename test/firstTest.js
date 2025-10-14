const { Builder, Browser, By, Key, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const chromedriver = require('chromedriver');

(async function example() {
  const service = new chrome.ServiceBuilder(chromedriver.path);
  let driver = await new Builder()
    .forBrowser(Browser.CHROME)
    .setChromeService(service)
    .build();
  try {
    await driver.navigate().to('https://www.google.com/ncr');
    await driver.sleep(5000)
    await driver.navigate().refresh()
    
  } finally {
    await driver.quit()
  }
})()