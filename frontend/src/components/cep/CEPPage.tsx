import React, { useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import LoadingButton from "@mui/lab/LoadingButton";

import { GetCEPType, ReturnCEPType } from "../utils/models";
import { getCEP } from "./CEPAPI";
import "./CEPPage.css";

const initalGetCEPState: GetCEPType = {
  codigo_ibge: "",
  uf: "",
  logradouro: "",
  localidade: "",
};

const CEPPage: React.FC = () => {
  const [getCepState, setGetCepState] = useState<GetCEPType>(initalGetCEPState);
  const [returnCepStates, setReturnCepStates] = useState<ReturnCEPType[]>();
  const [loading, setLoading] = useState<boolean>(false);

  return (
    <>
      <Paper className="form-cep">
        <h1>Procure o CEP</h1>
        <h4>
          (Para fazer a pesquisa é necessário preencher pelo menos dois campos)
        </h4>
        <TextField
          id="codigo_ibge"
          label="Código IBGE (Exemplo: 1200401)"
          variant="standard"
          sx={{ width: "100%" }}
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
          label="UF (Exemplo: AC)"
          variant="standard"
          sx={{ width: "100%" }}
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
          label="Logradouro (Exemplo: Colinas)"
          variant="standard"
          sx={{ width: "100%" }}
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
          label="Localidade (Exemplo: Rio Branco) "
          variant="standard"
          sx={{ width: "100%" }}
          value={getCepState.localidade}
          onChange={(e) => {
            setGetCepState({
              ...getCepState,
              localidade: e.target.value,
            });
          }}
        />
        <div style={{ textAlign: "right" }}>
          {loading ? (
            <LoadingButton
              sx={{ m: 2 }}
              loading={loading}
              variant="contained"
              disabled
            >
              disabled
            </LoadingButton>
          ) : (
            <Button
              sx={{ m: 2 }}
              onClick={() =>
                getCEP(getCepState, setReturnCepStates, setLoading)
              }
              variant="contained"
            >
              Procurar
            </Button>
          )}
        </div>
      </Paper>

      {returnCepStates && (
        <div style={{ margin: "20px" }}>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: "bold" }} align="left">
                    CEP
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold" }} align="left">
                    Tipo
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold" }} align="left">
                    UF
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold" }} align="left">
                    Nome
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold" }} align="left">
                    Nome da Localidade
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold" }} align="left">
                    Codigo IBGE
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold" }} align="left">
                    Tipo Logradouro
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold" }} align="left">
                    Nome Logradouro
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold" }} align="left">
                    Nome Bairro Inicial
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold" }} align="left">
                    Descricao
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {returnCepStates.length > 0 &&
                  returnCepStates.map((data) => (
                    <TableRow
                      key={data.cep}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell align="left">{data.cep}</TableCell>
                      <TableCell align="left">{data.tipo}</TableCell>
                      <TableCell align="left">{data.uf}</TableCell>
                      <TableCell align="left">{data.nome}</TableCell>
                      <TableCell align="left">{data.nome_localidade}</TableCell>
                      <TableCell align="left">{data.codigo_ibge}</TableCell>
                      <TableCell align="left">{data.tipo_logradouro}</TableCell>
                      <TableCell align="left">{data.nome_logradouro}</TableCell>
                      <TableCell align="left">
                        {data.nome_bairro_inicial}
                      </TableCell>
                      <TableCell align="left">{data.descricao}</TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      )}
      <ToastContainer />
    </>
  );
};

export default CEPPage;
