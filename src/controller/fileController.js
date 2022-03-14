const fileService = require("../service/fileService");
const userService = require("../service/userService");
class FileController {
  async saveAvatarInfo(ctx, next) {
    //获取图片信息
    const {
      mimetype,
      filename,
      size
    } = ctx.req.file;
    console.log(ctx.user);
    const userId = ctx.user.id;
    console.log('userId', userId);
    console.log('info', mimetype,
      filename,
      size);
    //将信息 保存到数据库
    const result = await fileService.createAvatar(mimetype,
      filename,
      size, userId);
    //将图片地址保存到user数据库中
    const avatarUrl = `http://localhost:8000/upload/avatar/${filename}`;
    const saveResult = await userService.updateAvatarUrlById(avatarUrl, userId)
    ctx.body = saveResult;
  }
  async savePictureInfo(ctx, next) {
    const userId = ctx.user.id;
    const {
      momentId
    } = ctx.query;
    const files = ctx.req.files;
    console.log(files);
    for (let file of files) {
      const {
        filename,
        mimetype,
        size
      } = file;
      try {
        await fileService.createFile(filename, mimetype, size, userId, momentId);
      } catch (err) {
        console.log(err)
      }
    }
    ctx.body = "上传ok";
  }
};
module.exports = new FileController();