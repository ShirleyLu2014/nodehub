const Multer = require("koa-multer");
const avatarUpload = Multer({
  dest: "./upload/avatar"
});
const avatarHandle = avatarUpload.single('avatar');
const pictureUpload = Multer({
  dest: "./upload/picture"
});
const pictureHandle = pictureUpload.array('picture', 9);
// class FileMiddleware {
//   async avatarHandle() {
//     return avatarUpload.single('avatar');
//   }
// };
module.exports = {
  avatarHandle,
  pictureHandle
}