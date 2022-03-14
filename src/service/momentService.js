const connection = require("../app/database");
const commonStatement = `SELECT 
    m.id id, m.content content, m.createAt createTime, m.updateAt updateTime,
    JSON_OBJECT('id', u.id, 'name', u.name) user FROM moment m LEFT JOIN user u ON m.user_id = u.id`;
class MomentService {
  async create(userId, content) {
    const statement = `INSERT INTO moment (content, user_id) VALUES (?, ?)`;
    const [result] = await connection.execute(statement, [content, userId]);
    console.log('result', result);
    return result;
    console.log(userId, content);
  }
  async getMomentById(momentId) {
    const statement = `${commonStatement} WHERE m.id = ?;`
    const [result] = await connection.execute(statement, [momentId]);
    return result[0];
  }
  async getMomentByList(pageSize, pageNum) {
    const statement = `SELECT 
    m.id id, m.content content, m.createAt createTime, m.updateAt updateTime,
    JSON_OBJECT('id', u.id, 'name', u.name) user ,
    (SELECT COUNT(*) FROM comment c WHERE c.comment_id = m.id) momentCounts,
    (SELECT COUNT(*) FROM moment_label l WHERE l.momment_id = m.id)   labelCounts,
    FROM moment m LEFT JOIN user u ON m.user_id = u.id LIMIT ?, ?;`
    const [result] = await connection.execute(statement, [pageNum, pageSize]);
    return result;
  }
  async updateMoment(momentId, content) {
    const statement = `UPDATE moment SET content = ? WHERE id = ?;`;
    const [result] = await connection.execute(statement, [content, momentId]);
    console.log('更新result', result);
    return result;
  }
  async deleteMoment(momentId) {
    const statement = `DELETE FROM moment WHERE id = ?;`;
    const [result] = await connection.execute(statement, [momentId]);
    return result;
  }
  async hasLable(momentId, labelId) {
    const statement = `SELECT * FROM moment_label WHERE moment_id = ? AND label_id = ?;`;
    const [result] = await connection.execute(statement, [momentId, labelId]);
    console.log('result', result);
    return Boolean(result[0])
  }
  async addLable(momentId, labelId) {
    const statement = `INSERT INTO moment_label (moment_id, label_id) VALUES (?, ?);`;
    const [result] = await connection.execute(statement, [momentId, labelId]);
    return result;
  }
}
module.exports = new MomentService();