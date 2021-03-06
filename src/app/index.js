const Koa = require("koa");
const bodyParser = require("koa-bodyparser");
const useRoutes = require("../router");
// const userRouter = require('../router/userRouter');
// const authRouter = require('../router/authRouter');
const app = new Koa();
//console.log(userRouter);
const errorHandler = require("./errorHandle");
app.use(bodyParser());
app.useRoutes = useRoutes;
app.useRoutes();
// app.use(userRouter.routes());
// app.use(userRouter.allowedMethods());
// app.use(authRouter.routes());
// app.use(authRouter.allowedMethods());
app.on("error", errorHandler);
module.exports = app;