
const puppeteer = require('puppeteer');
const fs = require('fs/promises');
const path = require('path');
const pRoot = path.resolve(__dirname,'..','model','data');

async function test() {
    const saveTypes = ['img','json','txt'];
    let examples = ["https://en.wikipedia.org/wiki/JavaScript","https://learnwebcode.github.io/practice-request/"];
    let type = saveTypes[0];
    let filename = 'wiki-test.png';
    let pageName = examples[0];
    let savePath = path.join(pRoot,type,filename);
    const config = {
        type:'img',
        pageName: examples[0],
        filename: 'wiki-test-3.png'
    }
    
    await snapshot(config)
}

async function snapshot(config) {
    console.log('snaping',config.filename);
    console.dir(config)

    let full = config.full == true ? true : false;

    let savePath = path.join(
        pRoot,
        config.type,
        config.filename,
        );

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(config.pageName);
    await page.screenshot({path:savePath,fullPage:full});
    console.log('snap taken')
    browser.close();
    console.log('broswer closed')
}

test();

module.exports.snapshot = snapshot