require("dotenv").config();

module.exports = (app) => {
  const get = (req, res) => {
    const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

    const request = new XMLHttpRequest();

    const queries = { ...req.query };
    try {
      let url = "https://homologacao.focusnfe.com.br/v2/ceps?";
      if (queries.codigo_ibge) url += `codigo_ibge=${queries.codigo_ibge}&`;
      if (queries.uf) url += `uf=${queries.uf}&`;
      if (queries.logradouro) url += `logradouro=${queries.logradouro}&`;
      if (queries.localidade) url += `localidade=${queries.localidade}&`;

      req.responseType = "json";
      request.open("GET", url, false, process.env.TOKEN_KEY);

      request.send();

      console.log(req.query);
      console.log("HTTP code: " + request.status);
      console.log("Corpo: " + request.responseText);
    } catch (msg) {
      return res.status(400).send(msg);
    }

    return res.send(request.responseText);
  };

  return { get };
};
