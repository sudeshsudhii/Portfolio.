const puppeteer = require('puppeteer');

(async () => {
    try {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();

        // Listen to console and print
        page.on('console', msg => console.log('PAGE LOG:', msg.text()));
        page.on('pageerror', error => console.log('PAGE ERROR:', error.message));
        page.on('requestfailed', request => console.log('REQUEST FAILED:', request.url(), request.failure().errorText));

        console.log("Navigating to http://localhost:3000...");
        await page.goto('http://localhost:3000', { waitUntil: 'networkidle0' });

        console.log("Finished waiting. Closing.");
        await browser.close();
    } catch (e) {
        console.error("Puppeteer Script Error:", e);
    }
})();
