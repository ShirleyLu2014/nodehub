const errorTypes = require("../constants/errorTypes");
const service = require("../service/userService");
const md5password = require("../utils/passwordHandle")
const verifyUser = async (ctx, next) => {
  const {
    name,
    password
  } = ctx.request.body;
  //判断用户名或者密码不能为空
  if (!name || !password || name === '' || password === '') {
    const error = new Error(errorTypes.NAME_OR_PASSWORD_IS_REQUIRED);
    return ctx.app.emit('error', error, ctx);
  }
  //判断本次注册未被注册
  const result = await service.getUserByName(name);
  console.log('查询result', result)
  if (result.length) {
    const error = new Error(errorTypes.USER_ALREADY_EXISTS);
    return ctx.app.emit('error', error, ctx);
  }
  await next();
};
const handlePassword = async (ctx, next) => {
  let {
    password
  } = ctx.request.body;
  ctx.request.body.password = md5password(password);
  await next();
}
module.exports = {
  verifyUser,
  handlePassword
}