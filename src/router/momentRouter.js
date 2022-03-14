const Router = require("koa-router");
const momentRouter = new Router({
  prefix: "/moment"
});
const {
  create,
  detail,
  list,
  update,
  deleteMoment,
  addLabels
} = require("../controller/momentController");
const {
  verifyLabelExists,
} = require("../middleware/labelMiddleware");
const {
  verifyAuth,
  verifyPermission
} = require("../middleware/authMiddleware");
momentRouter.post("/", verifyAuth, create);
momentRouter.get("/:momentId", detail);
momentRouter.get("/", list);
momentRouter.patch("/:momentId", verifyAuth, verifyPermission, update);
momentRouter.delete("/:momentId", verifyAuth, verifyPermission, deleteMoment);
//给动态添加标签
momentRouter.post('/:momentId/labels', verifyAuth, verifyPermission, verifyLabelExists, addLabels)
module.exports = momentRouter;