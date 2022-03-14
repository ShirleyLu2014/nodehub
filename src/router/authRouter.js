const Router = require("koa-router");
const {
  verifyLogin,
  verifyAuth
} = require("../middleware/authMiddleware")
const authRouter = new Router();
const {
  login,
  success
} = require("../controller/authController")
authRouter.post("/login", verifyLogin, login);
authRouter.get("/test", verifyAuth, success)
module.exports = authRouter;