const Router = require('koa-router');
// const Multer = require("koa-multer");
// const avatarUpload = Multer({
//   dest: "./upload/avatar"
// });
// const avatarHandle = avatarUpload.single('avatar');
const {
  avatarHandle,
  pictureHandle
} = require("../middleware/fileMiddleware");
const {
  verifyAuth
} = require("../middleware/authMiddleware");
const {
  saveAvatarInfo,
  savePictureInfo
} = require("../controller/fileController");
const fileRouter = new Router({
  prefix: "/upload"
});
fileRouter.post("/avatar", verifyAuth, avatarHandle, saveAvatarInfo);
fileRouter.post("/pictures", verifyAuth, pictureHandle, savePictureInfo);
module.exports = fileRouter;