const Router = require("koa-router");
const {
  verifyAuth
} = require("../middleware/authMiddleware");
const {
  create,
  list
} = require("../controller/labelController");
const labelRouter = new Router({
  prefix: "/label"
});
labelRouter.post("/", verifyAuth, create);
labelRouter.get("/", list);
module.exports = labelRouter;