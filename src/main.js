const app = require("./app");
//const config = require("./app/config");
const connection = require("./app/database");
// app.listen(config.APP_PORT, () => [
//   console.log('服务器启动成功～')   
// ])
app
  .listen(8000, () => {
    console.log('服务器启动成功～')
  })
  .on('error', function (err) {
    process.once('SIGUSR2', function () {
      process.kill(process.pid, 'SIGUSR2');
    });
    process.on('SIGINT', function () {
      process.kill(process.pid, 'SIGINT');
    });
  });