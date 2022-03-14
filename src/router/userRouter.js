const Router = require("koa-router");
const {
  verifyUser,
  handlePassword
} = require("../middleware/userMiddleware")
const {
  create,
  avatarInfo
} = require("../controller/userController");

const userRouter = new Router({
  prefix: '/users'
});
userRouter.post("/", verifyUser, handlePassword, create);
userRouter.get("/:userId", avatarInfo);
module.exports = userRouter;