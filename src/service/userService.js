const connection = require("../app/database");
class UserService {
  async create(user) {
    const {
      name,
      password
    } = user;
    console.log(name, password);
    const statement = `INSERT INTO user (name, password) VALUES (?, ?);`;
    const result = await connection.execute(statement, [name, password]);
    console.log('result', result);
    console.log('user数据', user);
    return result[0];
  }
  async getUserByName(name) {
    const statement = `SELECT * FROM user WHERE name = ?`;
    const result = await connection.execute(statement, [name]);
    return result[0];
  }
  async updateAvatarUrlById(avatarUrl, userId) {
    const statement = `UPDATE user SET avatar_url = ? WHERE id = ?;`;
    const [result] = await connection.execute(statement, [avatarUrl, userId]);
    return result;
  }
}
module.exports = new UserService();