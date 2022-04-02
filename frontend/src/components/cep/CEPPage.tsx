import React, { useState } from "react";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import { GetCEPType } from "../utils/models";
import { getCEP } from "./CEPAPI";

const initalGetCEPState: GetCEPType = {
  codigo_ibge: "",
  uf: "",
  logradouro: "",
  localidade: "",
};

const CEPPage: React.FC = () => {
  const [getCepState, setGetCepState] = useState<GetCEPType>(initalGetCEPState);
  const [returnCepStates, setReturnCepStates] = useState<any[]>();

  const clearInputs = () => {
    setGetCepState(initalGetCEPState);
  };

  return (
    <>
      <div>
        <TextField
          id="codigo_ibge"
          label="Código IBGE"
          variant="standard"
          fullWidth
          sx={{ m: 1 }}
          value={getCepState.codigo_ibge}
          onChange={(e) => {
            setGetCepState({
              ...getCepState,
              codigo_ibge: e.target.value,
            });
          }}
        />
        <TextField
          id="uf"
          label="UF"
          variant="standard"
          fullWidth
          sx={{ m: 1 }}
          value={getCepState.uf}
          onChange={(e) => {
            setGetCepState({
              ...getCepState,
              uf: e.target.value,
            });
          }}
        />
        <TextField
          id="logradouro"
          label="Logradouro"
          variant="standard"
          sx={{ m: 1 }}
          fullWidth
          value={getCepState.logradouro}
          onChange={(e) => {
            setGetCepState({
              ...getCepState,
              logradouro: e.target.value,
            });
          }}
        />
        <TextField
          id="localidade"
          label="Localidade"
          variant="standard"
          sx={{ m: 1 }}
          fullWidth
          value={getCepState.localidade}
          onChange={(e) => {
            setGetCepState({
              ...getCepState,
              localidade: e.target.value,
            });
          }}
        />
      </div>
      <Button
        sx={{ m: 2 }}
        onClick={() => getCEP(getCepState, setReturnCepStates)}
        variant="contained"
      >
        Procurar CEPw
      </Button>
      <hr />
      {returnCepStates && (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="left">CEP</TableCell>
                <TableCell align="left">Tipo</TableCell>
                <TableCell align="left">UF</TableCell>
                <TableCell align="left">Nome</TableCell>
                <TableCell align="left">Nome da Localidade</TableCell>
                <TableCell align="left">Codigo IBGE</TableCell>
                <TableCell align="left">Tipo Logradouro</TableCell>
                <TableCell align="left">Nome Logradouro</TableCell>
                <TableCell align="left">Nome Bairro Inicial</TableCell>
                <TableCell align="left">Descricao</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {returnCepStates.map((data) => (
                <TableRow
                  key={data.cep}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="left">{data.cep}</TableCell>
                  <TableCell align="left">{data.tipo}</TableCell>
                  <TableCell align="left">{data.nome}</TableCell>
                  <TableCell align="left">{data.uf}</TableCell>
                  <TableCell align="left">{data.nome_localidade}</TableCell>
                  <TableCell align="left">{data.codigo_ibge}</TableCell>
                  <TableCell align="left">{data.tipo_logradouro}</TableCell>
                  <TableCell align="left">{data.nome_logradouro}</TableCell>
                  <TableCell align="left">{data.nome_bairro_inicial}</TableCell>
                  <TableCell align="left">{data.descricao}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </>
  );
};

export default CEPPage;
