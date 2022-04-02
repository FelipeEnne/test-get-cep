module.exports = (app) => {
  app.route("/getcep/ceps").get(app.api.cep.get);
};
