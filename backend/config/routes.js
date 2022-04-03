module.exports = (app) => {
  app.route("/getcep").get(app.api.cep.get);
};
