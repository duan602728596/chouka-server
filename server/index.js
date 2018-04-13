/* 服务器 */
const http = require('http');
const https = require('https');
const process = require('process');
const url = require('url');
const path = require('path');
const zlib = require('zlib');
const next = require('next');
const Koa = require('koa');
const Router = require('koa-router');
const body = require('koa-body');
const staticCache = require('koa-static-cache');
const convert = require('koa-convert');
const compress = require('koa-compress');
const config = require('./config');
const nicknameQueryInformation = require('./search/nicknameQueryInformation');
const queryJson = require('./search/queryJson');
const storagecard = require('./storagecard/storagecard');
const readFile = require('./readFile');

const nextApp = next({
  dev: process.env.NODE_ENV !== 'production'
});
const app = new Koa();
const router = new Router();

function nextCB(){
  /* POST Body */
  app.use(body());

  /* 路由 */
  router.get(/^\/[^\.]*$/, async(ctx, next)=>{
    const parsedUrl = url.parse(ctx.req.url, true);
    const { pathname, query } = parsedUrl;
    ctx.status = 200;
    await nextApp.render(ctx.req, ctx.res, pathname, query);
    await next();
  });

  /* 查询 */
  router.post('/search', async(ctx, next)=>{
    const parsedUrl = url.parse(ctx.req.url, true);
    const { pathname } = parsedUrl;
    const query = ctx.request.body;
    const r = await nicknameQueryInformation(query.nickname);
    ctx.status = 200;
    await nextApp.render(ctx.req, ctx.res, pathname, {
      action: 'search',
      nickname: query.nickname,
      infor: r.length > 0 ? r[0] : null
    });
    await next();
  });

  /* 静态文件 */
  router.get(/^\/(static|_next)\/.*\.[^\.]+$/, async(ctx, next)=>{
    const parsedUrl = url.parse(ctx.req.url, true);
    const { pathname, query } = parsedUrl;
    await nextApp.render(ctx.req, ctx.res, pathname, query);
    await next();
  });

  /* 抽卡api */
  router.post('/_api/storagecard', storagecard);

  /* json查询抽卡 */
  router.post('/_api/queryjson', queryJson);

  if(process.env.NODE_ENV === 'production'){
    /* gzip压缩 */
    app.use(compress({
      filter(content_type){
        return true;
      },
      threshold: 2048,
      flush: zlib.constants.Z_SYNC_FLUSH
    }));

    /* 缓存 */
    app.use(convert(
      staticCache(path.join(__dirname, '..'), {
        maxAge: 60 * 60 * 24 * 365
      })
    ));
  }

  /* router */
  app.use(router.routes())
    .use(router.allowedMethods());

  http.createServer(app.callback()).listen(config.httpport);
}

nextApp.prepare().then(nextCB);