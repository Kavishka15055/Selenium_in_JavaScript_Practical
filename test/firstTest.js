const { Builder, By, Key, until } = require('selenium-webdriver');
const edge = require('selenium-webdriver/edge');

// Path to msedgedriver.exe (if using Edge)
const service = new edge.ServiceBuilder('C:\\WebDriver\\msedgedriver.exe');

async function testReactApp() {
  let driver;
  try {
    // Use Edge browser
    driver = await new Builder()
      .forBrowser('MicrosoftEdge')
      .setEdgeService(service)
      .build();

    // ✅ 1. Open your own React site
    await driver.get('http://localhost:3000'); // change to your site URL

    // ✅ 2. Wait until a React element appears (example: a button)
    await driver.wait(until.elementLocated(By.css('button')), 10000);

    // ✅ 3. Click a button
    const button = await driver.findElement(By.css('button'));
    await button.click();

    // ✅ 4. Read some text
    const text = await driver.findElement(By.css('h1')).getText();
    console.log('Page heading:', text);

    // ✅ 5. Assert something (manual check)
    if (text.includes('Welcome')) {
      console.log('✅ Test passed!');
    } else {
      console.log('❌ Test failed!');
    }

  } catch (error) {
    console.error('Error during test:', error);
  } finally {
    await driver.quit();
  }
}

testReactApp();
