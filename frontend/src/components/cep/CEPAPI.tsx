import { toast } from "react-toastify";

import { GetCEPType, ReturnCEPType } from "../utils/models";
import { baseUrlCEPs } from "../utils/connection";

export const getCEP = (
  getCepState: GetCEPType,
  setReturnCepStates: React.Dispatch<
    React.SetStateAction<ReturnCEPType[] | undefined>
  >,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const numberOfQueries = Object.values(getCepState).filter((x) => x !== "");

  if (numberOfQueries.length < 2) {
    toast.warn("Número de campos preenchido insuficiente.", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    return;
  }

  let url = baseUrlCEPs;
  if (getCepState.codigo_ibge) url += `codigo_ibge=${getCepState.codigo_ibge}&`;
  if (getCepState.uf) url += `uf=${getCepState.uf}&`;
  if (getCepState.logradouro) url += `logradouro=${getCepState.logradouro}&`;
  if (getCepState.localidade) url += `localidade=${getCepState.localidade}&`;

  setLoading(true);
  fetch(url, {
    method: "GET",
    mode: "cors",
    cache: "no-cache",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (!!data.mensagem) {
        toast.warn(data.mensagem, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
      setReturnCepStates(data);
    })
    .catch(() => {
      toast.error("Houve um problema.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    })
    .finally(() => setLoading(false));
};
