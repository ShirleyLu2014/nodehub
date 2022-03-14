const momentService = require("../service/momentService");
class MomentController {
  async create(ctx, next) {
    //1.获取数据
    const userId = ctx.user.id;
    const content = ctx.request.body.content;
    //将数据插入数据库
    const result = await momentService.create(userId, content);
    console.log('xixi', result);
    ctx.body = result;
  }
  async detail(ctx, next) {
    console.log('ctx.params', ctx.params);
    const momentId = ctx.params.momentId;
    const result = await momentService.getMomentById(momentId);
    ctx.body = result;
  }
  async list(ctx, next) {
    const {
      pageSize,
      pageNum
    } = ctx.query;
    const result = await momentService.getMomentByList(pageSize, pageNum);
    ctx.body = result;
    console.log(pageSize, pageNum);
  }
  async update(ctx, next) {
    const {
      momentId
    } = ctx.params;
    const {
      content
    } = ctx.request.body;
    const userId = ctx.user.id;
    const result = await momentService.updateMoment(momentId, content)
    ctx.body = `修改moment内容${momentId}-${content}-${result}`;
  }
  async deleteMoment(ctx, next) {
    const {
      momentId
    } = ctx.params;
    const userId = ctx.user.id;
    const result = await momentService.deleteMoment(momentId);
    ctx.body = result;
  }
  async addLabels(ctx, next) {
    console.log(ctx.labels);
    ctx.body = "给动态添加标签";
    const labels = ctx.labels;
    const {
      momentId
    } = ctx.params;
    //
    for (let label of labels) {
      const result = await momentService.hasLable(momentId, label.id);
      //如果不存在
      if (!result) {
        const addResult = await momentService.addLable(momentId, label.id);
        ctx.body = addResult;
      }
      console.log('查询结构', result)
    }
    console.log(momentId, labels);
  }
}
module.exports = new MomentController();