const puppeteer = require('puppeteer');
const fs = require('fs/promises');
const path = require('path');
const pRoot = path.join(__dirname,'..','model','data');
const {createFile} = require('../utils/create_file.js');
const {logAction} = require('../scripts/log_action.js');
const {get_imgs} = require('../scripts/get_imgs.js');
// const { log } = require('console');
const imgPath = path.join('..','model','data','img')
async function start() {

    let examples = ["https://en.wikipedia.org/wiki/JavaScript","https://learnwebcode.github.io/practice-request/"];
    logAction('TESTING API ----- ')
    const browser = await puppeteer.launch()
    logAction('launching puppeteer')
    const page = await browser.newPage()
    logAction('opening new Page')
    await page.goto(examples[0])
    logAction(`going to examples[1]`)
    logAction('Evaluating Page For Names');

    const names = await page.evaluate(() => {
        
        const arr = Array.from(document.querySelectorAll(".info strong")).map(x => x.textContent);
        return arr
    })

    console.log(names)
    logAction(`found ${names.length} names`)
    logAction('searching page form images');


    const photos = await get_imgs(examples[0])
    logAction(`found ${photos.length} images`)

    logAction('parsing photo links')
    for (const photo of photos) {
        // logAction(photo)
        const imagepage = await page.goto(photo)
        const savePath = path.resolve(imgPath,'wiki',photo.split("/").pop())
        const contents = await imagepage.buffer()

        await createFile(savePath, contents )
    }
    logAction(`parsed ${photos.length} photos`)

    for (const photo of photos) {
        const imagepage = await page.goto(photo);        
        // await fs.writeFile(a,b)
    }
    await fs.writeFile("names.txt", names.join("\r\n"))
    await browser.close()

    logAction('END TEST -----')
}   

start()