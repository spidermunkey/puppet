const fs = require('fs')
async function createFile(filename, content) {
    fs.open(filename,'r',function(err, fd){
      if (err) {
        fs.writeFile(filename, content, function(err) {
            if(err) {
                // console.log('error writing file contents');
            }
            // console.log("The file was saved!");
        });
      } else {
        console.log("The file exists!");
      }
    });
  }

module.exports.createFile = createFile