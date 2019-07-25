import mysql from 'mysql';

const choukaJson = require('../chouka.json');
const { db, cards } = choukaJson;

/* 查询 */
function queryData(q) {
  const connection = mysql.createConnection({
    host: db.host,
    port: db.port,
    user: db.user,
    password: db.password,
    database: db.database
  });

  connection.connect();

  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT id, userid, nickname, record, points from ${ db.table } WHERE userid=? OR nickname=?`,
      [q, q],
      (err, results, fields) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }

        connection.end();
      }
    );
  });
}

/* 格式化数据 */
function formatData(record) {
  const result = [];

  for (const card of cards) {
    const f = {
      level: card.level,
      has: 0,
      data: []
    };

    for (const d of card.data) {
      if (record[d.id] > 0) {
        f.has += 1;
      }

      f.data.push({
        name: d.name,
        length: record[d.id]
      });
    }

    result.push(f);
  }

  return result.reverse();
}

export default async function(ctx, sweetOptions) {
  const q = ctx?.query?.q;
  const data = q ? await queryData(q) : undefined;
  const record = data ? data[0].record : undefined;

  return {
    title: `${ q ? `${ q }的` : '' }查询结果`,
    initialState: {
      result: {
        query: q,
        list: record ? formatData(JSON.parse(record)) : [],
        points: data ? Number(data[0].points) : 0
      }
    }
  };
}