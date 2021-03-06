const app = require("express")();
const consign = require("consign");
require("dotenv").config();

consign()
  .then("./config/middlewares.js")
  .then("./api")
  .then("./config/routes.js")
  .into(app);

if (!module.parent) {
  app.listen(process.env.PORT, () => console.log(`Runing ${process.env.PORT}`));
}
module.exports = app;
