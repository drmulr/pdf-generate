const puppeteer = require('puppeteer');
const fs = require('fs-extra');
const data = require('./test-data.json');

(async function() {
    try {

        const browser = await puppeteer.launch();
        const page = await browser.newPage();

        await page.setContent('<h1> Hi!!! </h1>');
        await page.emulateMedia('screen');
        await page.pdf({
            path:'certificate.pdf',
            format: 'A4',
            printBackground: true
        });

        console.log('done!');
        await browser.close();
        process.exit();


    } catch (e) {
        console.log('error!', e);
    }
})();