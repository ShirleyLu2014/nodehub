// const dotenv = require("dotenv");
// dotenv.config({
//   path: ".env"
// });
console.log(process.env.APP_PORT);
const path = require("path");
const fs = require("fs");
const PRIVATE_KEY = fs.readFileSync(path.resolve(__dirname, "../keys/private.key"));
const PUBLIC_KEY = fs.readFileSync(path.resolve(__dirname, "../keys/public.key"));
// module.exports = {
//   APP_PORT,
//   MYSQL_HOST,
//   MYSQL_PORT,
//   MYSQL_DATABASE,
//   MYSQL_USER,
//   MYSQL_PASSWORD,
// } = process.env;
module.exports = {
  PRIVATE_KEY,
  PUBLIC_KEY
}