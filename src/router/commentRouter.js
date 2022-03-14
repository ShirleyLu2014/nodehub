const Router = require("koa-router");
const {
  verifyAuth,
  verifyPermission
} = require("../middleware/authMiddleware");
const {
  create,
  reply,
  modify,
  deleteComment,
  list
} = require("../controller/commentController")
const commentRouter = new Router({
  prefix: "/comment"
});
//新建评论
commentRouter.post("/", verifyAuth, create);
//回复评论 
commentRouter.post("/:commentId/reply", verifyAuth, reply);
//修改评论
commentRouter.patch("/:commentId", verifyAuth, verifyPermission, modify);
//删除评论
commentRouter.delete("/:commentId", verifyAuth, verifyPermission, deleteComment);
//获取评论列表
commentRouter.get("/", list);
module.exports = commentRouter;