const jwt = require("jsonwebtoken");
const errorTypes = require("../constants/errorTypes");
const userService = require("../service/userService");
const authService = require('../service/authService');
const md5password = require("../utils/passwordHandle");
const {
  PRIVATE_KEY,
  PUBLIC_KEY
} = require("../app/config")
const verifyLogin = async (ctx, next) => {
  //1.获取用户名和密码
  const {
    name,
    password
  } = ctx.request.body;
  if (!name || !password || name === '' || password === '') {
    const error = new Error(errorTypes.NAME_OR_PASSWORD_IS_REQUIRED);
    return ctx.app.emit('error', error, ctx);
  }
  //判断本次注册未被注册
  let result = await userService.getUserByName(name);
  console.log('查询result', result);
  result = result[0];
  console.log(result.id, result);
  if (!(result.id)) {
    console.log('进来没');
    const error = new Error(errorTypes.USER_DOES_NOT_EXISTS);
    return ctx.app.emit('error', error, ctx);
  }
  //2.判断是否为空
  //3.判断用户是否存在
  //4.判断密码是否正确
  if (md5password(password) !== result.password) {
    const error = new Error(errorTypes.PASSWORD_IS_INCORRENT);
    return ctx.app.emit("error", error, ctx);
  }
  ctx.user = result;
  await next();
}
const verifyAuth = async (ctx, next) => {
  //1.
  console.log('验证授权middleware');
  const authorization = ctx.headers.authorization;
  const token = authorization ? authorization.replace('Bearer ', '') : '';
  try {
    const result = jwt.verify(token, PUBLIC_KEY, {
      algorithms: ["RS256"]
    })
    ctx.user = result;
    await next();
  } catch (err) {
    const error = new Error(errorTypes.UNAUTHORIZATION)
    ctx.app.emit("error", error, ctx)
  }

}
//
const verifyPermission = async (ctx, next) => {
  console.log('进来了');
  // const {
  //   momentId
  // } = ctx.params;
  const userId = ctx.user.id;
  const [resourceKey] = Object.keys(ctx.params);
  const resourceId = ctx.params[resourceKey];
  const tableName = resourceKey.replace('Id', '');
  const result = await authService.checkResource(tableName, resourceId, userId);
  console.log('333result', result);
  if (!result) {
    const error = new Error(errorTypes.UNPERMISIION);
    return ctx.app.emit("error", error, ctx);
  }
  ctx.body = result;
  console.log("验证修改momentmiddleware");
  await next();
}
module.exports = {
  verifyLogin,
  verifyAuth,
  verifyPermission
}