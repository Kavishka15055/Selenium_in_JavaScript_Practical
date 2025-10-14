const { Builder, Browser, By, Key, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const chromedriver = require('chromedriver');

;(async function example() {
  const service = new chrome.ServiceBuilder(chromedriver.path);
  let driver = await new Builder()
    .forBrowser(Browser.CHROME)
    .setChromeService(service)
    .build();
  try {
    await driver.get('https://www.google.com/ncr')
    await driver.findElement(By.name('q')).sendKeys('webdriver', Key.RETURN)
    await driver.wait(until.titleIs('webdriver - Google Search'), 30000) // Increased timeout to 10 seconds
  } finally {
    await driver.quit()
  }
})()