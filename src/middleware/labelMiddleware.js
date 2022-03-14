const service = require("../service/labelService");
class LabelMiddleware {
  async verifyLabelExists(ctx, next) {
    console.log(ctx.request.body.labels);
    //
    let {
      labels
    } = ctx.request.body;
    console.log('lables', labels);
    const newLabels = [];
    for (let label of labels) {
      const isExists = await service.hasLabel(label);
      console.log('isExists', isExists, );
      const labelInfo = {
        name: label
      };
      if (isExists.length === 0) {
        //创建标签
        const result = await service.create(label);
        console.log('创建标签结构', result)
        labelInfo.id = result.insertId;
      } else {
        labelInfo.id = isExists[0].id;
      }
      newLabels.push(labelInfo);
    }
    console.log('newLabels', newLabels);
    ctx.labels = newLabels;
    await next();
  }
};
module.exports = new LabelMiddleware();