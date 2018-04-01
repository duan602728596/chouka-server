/* 根据昵称查询信息 */
const mysql = require('mysql');
const config = require('../config');

function nicknameQueryInformation(nickname){
  const connection = mysql.createConnection({
    host: config.db.host,
    port: config.db.port,
    user: config.db.user,
    password: config.db.password,
    database: config.db.database
  });
  connection.connect();
  return new Promise((resolve, reject)=>{
    connection.query(`SELECT id, userid, nickname, record from ${ config.db.table }
WHERE nickname="${ nickname }"`, (err, results, fields)=>{
      if(err){
        reject(err);
      }else{
        resolve(results);
      }
      connection.end();
    });
  });
}

module.exports = nicknameQueryInformation;