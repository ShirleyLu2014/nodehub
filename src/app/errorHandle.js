const errorTypes = require("../constants/errorTypes")
const errHandler = (error, ctx) => {
  let status, message;
  console.log('错误打印');
  console.log(error.message);
  switch (error.message) {
    case errorTypes.NAME_OR_PASSWORD_IS_REQUIRED:
      status = 400;
      message = "用户名或者密码不可为空";
      break;
    case errorTypes.USER_ALREADY_EXISTS:
      status = 409;
      message = "用户已存在";
      break;
    case errorTypes.USER_DOES_NOT_EXISTS:
      status = 400;
      message = "用户名不存在";
      break;
    case errorTypes.PASSWORD_IS_INCORRENT:
      status = 400;
      message = "密码不正确";
      break;
    case errorTypes.UNAUTHORIZATION:
      status = 401;
      message = "用户未登录";
      break;
    case errorTypes.UNPERMISIION:
      status = 401;
      message = "没有权限";
      break;
    default:
      status = 404;
      message = "not found";
  }
  ctx.status = status;
  ctx.body = message;
};
module.exports = errHandler;