/* 防止sql注入，过滤条件 */
const reg = /(DELETE|WHERE|SELECT|INSERT|UPDATE|JOIN|;|.+\s*=+.+\s*)/g;

/**
 * @param { string } str: 查询语句
 * @return { boolean }  : true可以用，false不能能用
 */
function sqlFilter(str){
  return !reg.test(str);
}

module.exports = sqlFilter;