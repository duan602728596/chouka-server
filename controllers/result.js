export default function(ctx, sweetOptions) {
  const q = ctx?.query?.q;

  return {
    title: `${ q }的查询结果`,
    initialState: {
      result: {
        query: q
      }
    }
  };
}