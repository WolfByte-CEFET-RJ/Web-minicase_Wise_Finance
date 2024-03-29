import React, { useState, useContext } from "react";
import useApi from "../../../hooks/useApi";
import { AuthContext } from "../../auth";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ModalReceitasFixas from "../../modais/modaisReceitas/fixas/modalEditarReceitasFixas";

export default function ReceitasFixasGerador({ id, nome, valor }) {
  const { userID, token } = useContext(AuthContext);
  const receitaId = id;
  const api = useApi();
  const [estadoModalEditarFixas, setEstadoModalEditarFixas] = useState(false);
  const AbrirModalEditarFixas = () => {
    setEstadoModalEditarFixas(true);
  };

  const FecharModalEditarFixas = () => {
    setEstadoModalEditarFixas(false);
  };

  async function Delete() {
    try {
      const response = await api.delete(
        `http://localhost:5000/receita_fixa/${receitaId}`,
        {
          body: {
            userId: userID,
            receitaId: receitaId,
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (response.data.status === true) {
        toast.success("Receita Fixa deletada com sucesso!");
      } else if (response.data.status === false) {
        toast.error(response.data.message.toString());
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="text-[15px] mt-[2%] font-black text-green flex items-center">
      <span className="mr-[10%] ml-[10%]">{nome}</span>{" "}
      <span className=" text-[#156808]">{valor}</span>
      <div className="ml-[20%]">
        <button
          className=" mr-5 w-[105px] h-[20px] rounded-[96px] bg-[#1E7B71] text-[10px] font-black text-white border border-black"
          onClick={AbrirModalEditarFixas}
        >
          Editar
        </button>
        <ModalReceitasFixas
          idReceita={id}
          Aberto={estadoModalEditarFixas}
          Fechado={FecharModalEditarFixas}
        />
        <button
          className="w-[105px] h-[20px] rounded-[96px] bg-[#EF0606] text-[10px] font-black text-white border border-black"
          onClick={Delete}
        >
          Excluir
        </button>
      </div>
    </div>
  );
}
