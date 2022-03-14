const fs = require("fs");
const userService = require("../service/userService");
const fileService = require("../service/fileService");
class UserController {
  async create(ctx, next) {
    //获取用户请求传递的参数
    const user = ctx.request.body;
    ctx.body = "hahaha";
    //数据库查询数据
    const result = await userService.create(user);
    //返回数据
    ctx.body = result;
  }
  async avatarInfo(ctx, next) {
    const {
      userId
    } = ctx.params;
    console.log('userId', userId);
    const result = await fileService.getAvatarByUserId(userId);
    console.log('图片信息', result);
    ctx.response.set("content-type", result.mimetype);
    ctx.body = fs.createReadStream(`./upload/avatar/${result.filename}`);
  }
};
module.exports = new UserController();