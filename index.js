const express = require('express');
const app = express();
const puppeteer = require('puppeteer');


app.get('/', (req, res) => res.send('Hello World!'));

app.get('/print',async (req,res)=>{
  
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto('http://www.hanitalenses.com/', {waitUntil: 'networkidle2'});
        const screenshot = await page.screenshot({
            type: 'png',
            path: 'example.png'
        });
        await page.pdf({
            path: 'hn.pdf',
            format: 'letter'
        });
        res.writeHead(200, {
            'content-type': 'image/png'
        });
        res.end(screenshot, 'binary');

        await browser.close();
      
});

app.listen(3000, () => console.log('Example app listening on port 3000!'))


