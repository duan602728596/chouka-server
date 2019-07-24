export default function(router, sweetOptions, app) {
  router.get('/api/test', (ctx, next) => {
    ctx.status = 200;
    ctx.body = {
      text: 'test'
    };
  });
}