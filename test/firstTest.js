// ==============================
// Selenium Test: Google Search
// Browser: Microsoft Edge
// Author: Your Name
// ==============================

const { Builder, Browser, By, Key, until } = require('selenium-webdriver');
const edge = require('selenium-webdriver/edge');

async function runTest() {
    // Path to your msedgedriver.exe
    const EDGE_DRIVER_PATH = 'C:\\WebDriver\\msedgedriver.exe';
    const service = new edge.ServiceBuilder(EDGE_DRIVER_PATH);

    // Create Edge browser options
    const options = new edge.Options();
    options.addArguments('--start-maximized'); // open browser in full screen
    options.addArguments('--disable-notifications'); // disable popups
    options.addArguments('--disable-infobars'); // remove “Edge is being controlled” bar

    let driver;

    try {
        // Initialize the WebDriver
        driver = await new Builder()
            .forBrowser(Browser.EDGE)
            .setEdgeOptions(options)
            .setEdgeService(service)
            .build();

        console.log('🚀 Browser launched successfully');

        // 1️⃣ Navigate to Google
        await driver.get('https://www.google.com');
        console.log('🌐 Navigated to Google');

        // 2️⃣ Locate the search box and type a query
        const searchBox = await driver.wait(
            until.elementLocated(By.name('q')),
            5000,
            'Search box not found'
        );
        await searchBox.sendKeys('Selenium WebDriver', Key.RETURN);
        console.log('🔍 Search performed for: Selenium WebDriver');

        // 3️⃣ Wait for results and verify title
        await driver.wait(until.titleContains('Selenium WebDriver'), 5000);
        const title = await driver.getTitle();
        console.log(`📄 Page title: "${title}"`);

        // 4️⃣ Verify that search results appear
        const results = await driver.wait(
            until.elementLocated(By.id('search')),
            5000,
            'Search results not found'
        );

        const isDisplayed = await results.isDisplayed();
        if (isDisplayed) {
            console.log('✅ Test Passed: Search results displayed successfully!');
        } else {
            console.warn('⚠️ Test Failed: Search results not visible.');
        }

    } catch (error) {
        console.error('❌ Test Failed with error:', error);
    } finally {
        // 5️⃣ Cleanup: Close the browser
        if (driver) {
            await driver.quit();
            console.log('🧹 Browser closed. Test finished.');
        }
    }
}

// Run the test
runTest();
