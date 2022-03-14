const service = require("../service/labelService");
class LabelController {
  async create(ctx, next) {
    const {
      name
    } = ctx.request.body;
    const result = await service.create(name);
    ctx.body = result;
  }
  async list(ctx, next) {
    const {
      pageSize,
      pageNum
    } = ctx.query;
    console.log(2222, pageSize,
      pageNum)
    const result = await service.getLabelList(pageSize, pageNum);
    ctx.body = result;
  }
};
module.exports = new LabelController();