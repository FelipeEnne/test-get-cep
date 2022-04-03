export type GetCEPType = {
  codigo_ibge?: string;
  uf?: string;
  logradouro?: string;
  localidade?: string;
};

export type ReturnCEPType = {
  cep?: string;
  tipo?: string;
  uf?: string;
  nome?: string;
  nome_localidade?: string;
  codigo_ibge?: string;
  tipo_logradouro?: string;
  nome_logradouro?: string;
  nome_bairro_inicial?: string;
  descricao?: string;
};
