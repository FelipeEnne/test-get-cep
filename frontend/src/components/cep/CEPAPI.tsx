import { toast } from "react-toastify";

import { GetCEPType } from "../utils/models";
import { baseUrlCEPs } from "../utils/connection";

export const getCEP = (
  getCepState: GetCEPType,
  setReturnCepStates: React.Dispatch<React.SetStateAction<any[] | undefined>>
) => {
  let url = baseUrlCEPs;
  if (getCepState.codigo_ibge) url += `codigo_ibge=${getCepState.codigo_ibge}&`;
  if (getCepState.uf) url += `uf=${getCepState.uf}&`;
  if (getCepState.logradouro) url += `logradouro=${getCepState.logradouro}&`;
  if (getCepState.localidade) url += `localidade=${getCepState.localidade}&`;

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
      setReturnCepStates(data);
    })
    .catch(() => {
      toast.error("There was a problem", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    });
};
