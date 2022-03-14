const {
  util
} = require("webpack");
const service = require("../service/commentService");
class CommentController {
  async create(ctx, next) {
    const {
      momentId,
      content
    } = ctx.request.body;
    const userId = ctx.user.id;
    const result = await service.create(momentId, content, userId);
    ctx.body = `${result}-评论接口${momentId}-${content}-${userId}`;
  }
  async reply(ctx, next) {
    const {
      momentId,
      content,
    } = ctx.request.body;
    const {
      commentId
    } = ctx.params;
    const userId = ctx.user.id;
    console.log(momentId,
      content, userId, commentId);
    const result = await service.reply(momentId, content, userId, commentId);
    ctx.body = result;
  }
  async modify(ctx, next) {
    const {
      commentId
    } = ctx.params;
    const {
      content,
    } = ctx.request.body;
    ctx.body = `修改评论${commentId}-${content}`;
    const result = await service.modify(content, commentId);
    ctx.body = result;
  }
  async deleteComment(ctx, next) {
    const {
      commentId
    } = ctx.params;
    const result = await service.deleteComment(commentId);
    ctx.body = result;
  }
  async list(ctx, next) {
    const {
      momentId
    } = ctx.query;
    const result = await service.getCommentsByMomentId(momentId);
    ctx.body = result;
  }
}
module.exports = new CommentController();