const puppeteer = require('puppeteer');
const fs = require('fs/promises');
const path = require('path');
const pRoot = path.join(__dirname,'..','model','data');
const {logAction} = require('./log_action');

module.exports.get_imgs = async function(url) {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.goto(url)
    logAction(`fetching photos in ${url}`,'test')
    const photos = await page.$$eval("img",imgs => imgs.map(x => x.src))
    await browser.close()
    logAction(`browser closed found ${photos.length} photos`)
    return photos;
}