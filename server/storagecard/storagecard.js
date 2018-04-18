/**
 * 存卡
 * 验证需要传递userid，nickname，抽到的卡的id的数组Array<string>，token
 * 数据库字段：
 *   id      : id，自增1
 *   nickname: 昵称
 *   userid  : 用户id
 *   record  : JSON字符串，卡的id为键名
 */
const MD5 = require('md5.js');
const mysql = require('mysql');
const config = require('../config');

/* token */
const TOKEN = new MD5().update(config.token).digest('hex');

/* 根据昵称和userid查询信息 */
function nicknameQueryInformation(nickname, userid){
  const connection = mysql.createConnection({
    host: config.db.hostname,
    port: config.db.port,
    user: config.db.user,
    password: config.db.password,
    database: config.db.database
  });
  connection.connect();
  return new Promise((resolve, reject)=>{
    connection.query(`SELECT id, userid, nickname, record from ${ config.db.table } WHERE nickname=? AND userid=?`, [nickname, userid], (err, results, fields)=>{
      if(err){
        reject(err);
      }else{
        resolve(results);
      }
      connection.end();
    });
  });
}

/* 插入新数据 */
function insert(userid, nickname, record){
  const connection = mysql.createConnection({
    host: config.db.host,
    port: config.db.port,
    user: config.db.user,
    password: config.db.password,
    database: config.db.database
  });
  connection.connect();
  return new Promise((resolve, reject)=>{
    connection.query(`INSERT INTO ${ config.db.table } (userid, nickname, record) VALUES (?, ?, ?)`, [userid, nickname, JSON.stringify(record)], (err, results, fields)=>{
      if(err){
        reject(err);
      }else{
        resolve(results);
      }
      connection.end();
    });
  });
}

/* 更新数据 */
function update(userid, nickname, record){
  const connection = mysql.createConnection({
    host: config.db.host,
    port: config.db.port,
    user: config.db.user,
    password: config.db.password,
    database: config.db.database
  });
  connection.connect();
  return new Promise((resolve, reject)=>{
    connection.query(`UPDATE ${ config.db.table } SET nickname=?, record=? WHERE nickname=? AND userid=?`, [nickname, JSON.stringify(record), nickname, userid], (err, results, fields)=>{
      if(err){
        reject(err);
      }else{
        resolve(results);
      }
      connection.end();
    });
  });
}

async function storagecard(ctx, next){
  try{
    const body = ctx.request.body;
    // 验证token
    if(body.token !== TOKEN ){
      ctx.status = 400;
      ctx.body = {
        message: 'Token is wrong.'
      };
      return void 0;
    }

    // 查询数据
    const nickname = body.nickname;
    const userid = body.userid;
    const record = body.record;  // 抽到的卡组
    const results = await nicknameQueryInformation(nickname, userid);

    // 更新或添加
    const record2 =  results.length > 0 ? JSON.parse(results[0].record) : {};

    for(let i = 0, j = record.length; i < j; i++){
      const item = record[i];
      if(item in record2){
        record2[item] += 1;
      }else{
        record2[item] = 1;
      }
    }

    if(results.length > 0){
      await update(userid, nickname, record2);
    }else{
      await insert(userid, nickname, record2);
    }

    ctx.status = 200;
    ctx.body = {
      message: 'Success.'
    };
    await next();
  }catch(err){
    console.error(err);
    ctx.status = 500;
    ctx.body = {
      message: 'Error.'
    };
  }
}

module.exports = storagecard;