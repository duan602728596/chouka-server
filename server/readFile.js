const fs = require('fs');
const path = require('path');

function readFile(pathFile){
  return new Promise((resolve, reject)=>{
    fs.readFile(path.join(__dirname, '../static/', pathFile), (err, data)=>{
      if(err){
        console.log(err);
        reject(err);
      }else{
        resolve(data.toString());
      }
    });
  });
}

module.exports = readFile;