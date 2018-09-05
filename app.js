const puppeteer = require('puppeteer');
const fs = require('fs-extra');
const hbs = require('handlebars');
const path = require('path');
const data = require('./test-data.json');

data.attendees.forEach((attendee) => {

    const compile = async function(templateName, attendee) {

        const filePath = await path.join(process.cwd(), 'templates', `${templateName}.hbs`);
        const html = await fs.readFile(filePath, 'utf-8');
        return hbs.compile(html)(attendee);

    };


    (async function() {
        try {
    
            i = 0
            
            const browser = await puppeteer.launch();
            const page = await browser.newPage();
    
            const content = await compile('attendee-list', attendee);
    
            // console.log(data.attendees);
    
            await page.setContent(content);
            await page.emulateMedia('screen');
            await page.pdf({
                path: `${attendee.last}.certificate.pdf`,
                format: 'A4',
                printBackground: true
            });

            i++;
    
            console.log('done!');
            await browser.close();
            process.exit();
    
    
        } catch (e) {
            console.log('error!', e);
        }

    })();

})
