const puppeteer = require('puppeteer');
const fs = require('fs-extra');
const hbs = require('handlebars');
const path = require('path');
const data = require('./test-data.json');

const compile = async function(templateName, data) {

    const filePath = await path.join(process.cwd(), 'templates', `${templateName}.hbs`);
    const html = await fs.readFile(filePath, 'utf-8');
    return hbs.compile(html)(data);
};

(async function() {
    try {

        const browser = await puppeteer.launch();
        const page = await browser.newPage();

        const content = await compile('attendee-list', data);

        await page.setContent(content);
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