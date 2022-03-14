const connection = require("../app/database");
class LabelService {
  async create(name) {
    const statement = `INSERT INTO label (name) VALUES (?);`;
    const [result] = await connection.execute(statement, [name]);
    return result;
  }
  async hasLabel(label) {
    const statement = `SELECT * FROM label WHERE name = ?;`;
    const [result] = await connection.execute(statement, [label]);
    console.log('查询到result', result);
    return result;
  }
  async getLabelList(pageSize, pageNum) {
    const statement = `SELECT * FROM label LIMIT ?, ?`;
    const [result] = await connection.execute(statement, [pageNum, pageSize]);
    console.log('查询到result', result);
    return result;
  }
};
module.exports = new LabelService();