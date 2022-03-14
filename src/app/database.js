const mysql = require("mysql2");
//const config = require("./config");
const connections = mysql.createPool({
  host: "101.42.99.64",
  port: 3306,
  database: 'coderhub',
  user: 'root',
  password: 'silent?2022'
  // host: "localhost",
  // port: 3306,
  // database: 'coderhub',
  // user: 'root',
  // password: 'silent?2022'
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