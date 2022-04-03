require("dotenv").config();

module.exports = (app) => {
  const get = (req, res) => {
    const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

    const request = new XMLHttpRequest();

    const queries = { ...req.query };
    const numberOfQueries = Object.keys(queries).length;

    if (numberOfQueries < 1) res.send("Insufficient number of parameters");

    try {
      let url = "https://homologacao.focusnfe.com.br/v2/ceps?";
      if (queries.codigo_ibge) url += `codigo_ibge=${queries.codigo_ibge}&`;
      if (queries.uf) url += `uf=${queries.uf}&`;
      if (queries.logradouro) url += `logradouro=${queries.logradouro}&`;
      if (queries.localidade) url += `localidade=${queries.localidade}&`;

      req.responseType = "json";
      request.open("GET", url, false, process.env.TOKEN_KEY);

      request.send();
    } catch (msg) {
      return res.status(400).send(msg);
    }

    return res.send(request.responseText);
  };

  return { get };
};
