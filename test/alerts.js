const { Builder, Browser, By, until } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
const chromedriver = require("chromedriver");
const { describe, it, beforeEach, afterEach } = require("mocha");
const assert = require("assert");


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

  it('alerts', async function() {
    await driver.get("https://demoqa.com/alerts");
    await driver.findElement(By.id("alertButton")).click();
    
    // Wait for alert to be present (up to 5 seconds)
    await driver.wait(until.alertIsPresent(), 5000, "Alert did not appear");
    
    // Get the alert
    let alert = await driver.switchTo().alert();
    let alertText = await alert.getText();
    console.log("Alert text:", alertText);
    
    await driver.sleep(2000);
    await alert.accept();
    await driver.sleep(2000);
  })

  it.only('frames',async function(){
    await driver.get("https://demoqa.com/frames");
    // await driver.switchTo().frame(await driver.findElement(By.id("frame1")));
    await driver.wait(until.ableToSwitchToFrame(By.id("frame1")),10000);
    let text=await driver.findElement(By.id("sampleHeading")).getText();
    assert.ok(text.toString()=='This is a sample page');
    await driver.switchTo().frame(null);
    await driver.findElement(By.xpath("//div[text()='Elements']")).click();
    await driver.sleep(2000);
  })


  afterEach(async function () {
    if (driver) {
      await driver.quit();
    }
  });
});
