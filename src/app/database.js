const mysql = require("mysql2");
//const config = require("./config");
const connections = mysql.createPool({
  // host: config.MYSQL_HOST,
  // port: config.MYSQL_PORT,
  // database: config.MYSQL_DATABASE,
  // user: config.MYSQL_USER,
  // password: config.MYSQL_PASSWORD
  host: "localhost",
  port: 3306,
  database: 'coderhub',
  user: 'root',
  password: 'silent?2022'
})
connections.getConnection((err, conn) => {
  conn.connect((err) => {
    if (!err) {
      console.log("mysql连接成功");
    }
  })
})
//按照promise的方式导出
module.exports = connections.promise();