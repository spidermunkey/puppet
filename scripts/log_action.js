const fs = require('fs')
const path = require('path')
const {newline} = require('../utils/newline.js')

function logAction(string) {
    console.log(`log: ${[...arguments].join(' ')}`)
    console.log([...arguments])
    fs.appendFileSync(path.join(__dirname,'..','model','logs','logfile.txt'),`${string + newline()}`)
}
module.exports.logAction = logAction;

// logAction('testing api')