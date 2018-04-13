/* json查询抽卡 */
const MD5 = require('md5.js');
const config = require('../config');
const nicknameQueryInformation = require('./nicknameQueryInformation');

/* token */
const TOKEN = new MD5().update(config.token).digest('hex');

async function queryJson(ctx, next){
  try{
    const query = ctx.request.body;

    // 验证token
    if(query.token !== TOKEN ){
      ctx.status = 400;
      ctx.body = {
        message: 'Token is wrong.'
      };
      return void 0;
    }
    const r = await nicknameQueryInformation(query.nickname);
    ctx.status = 200;
    ctx.body = r;
    await next();
  }catch(err){
    console.error(err);
    ctx.status = 500;
    ctx.body = {
      message: 'Error.'
    };
  }
}

module.exports = queryJson;