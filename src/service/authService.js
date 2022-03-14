const connection = require('../app/database');
class AuthService {
  async checkResource(tableName, id, userId) {
    const statement = `SELECT * FROM ${tableName} WHERE id = ? AND user_id = ?;`;
    const [result] = await connection.execute(statement, [id, userId]);
    console.log('查询moment动态', result);
    return Boolean(result.length);
  }

}
module.exports = new AuthService();