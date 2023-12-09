import React, { useState, useContext, useEffect } from "react";
import useApi from "../../../hooks/useApi";
import { AuthContext } from "../../auth";
import ModalReceitasFixas from "./fixas/modalAdicionarReceitasFixas";
import ModalReceitasVariaveis from "./variaveis/modalAdicionarReceitasVariaveis";
import ReceitasFixasGerador from "../../modalComponent/receitas/receitaFixaGerador";
import ReceitasVariaveisGerador from "../../modalComponent/receitas/receitaVariavelGerador";

const ModalReceita = ({ Aberto, Fechado }) => {
  const [receitasFixas, setReceitasFixas] = useState([]);
  const [receitasVariaveis, setReceitasVariaveis] = useState([]);
  const { userID, token } = useContext(AuthContext);
  const valorTotalReceitasFixas = receitasFixas.reduce((acc, receita) => acc + parseFloat(receita.Valor), 0).toFixed(2);
  const totalReceitasFixas = "R$" + valorTotalReceitasFixas
  const valorTotalReceitasVariaveis = receitasVariaveis.reduce((acc, receita) => acc + parseFloat(receita.Valor), 0).toFixed(2);
  const totalReceitasVariaveis = "R$" + valorTotalReceitasVariaveis
  const api = useApi();

  const [estadoModalAdicionarFixas, setEstadoModalAdicionarFixas] =
    useState(false);
  const [estadoModalAdicionarVariaveis, setEstadoModalAdicionarVariaveis] =
    useState(false);

  const AbrirModalAdicionarFixas = () => {
    setEstadoModalAdicionarFixas(true);
  };

  const FecharModalAdicionarFixas = () => {
    setEstadoModalAdicionarFixas(false);
  };

  const AbrirModalAdicionarVariaveis = () => {
    setEstadoModalAdicionarVariaveis(true);
  };

  const FecharModalAdicionarVariaveis = () => {
    setEstadoModalAdicionarVariaveis(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const receitasFixasData = await api.get("http://localhost:5000/receita_fixa/", {
          body: {
            userId: userID,
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setReceitasFixas(receitasFixasData.data);
        const receitasVariaveisData = await api.get("http://localhost:5000/receita_var/", {
          body: {
            userId: userID,
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setReceitasVariaveis(receitasVariaveisData.data);
      } catch (error) {
        console.log(error);
      }
    };

    if (Aberto) {
      fetchData();
    }
  }, [Aberto, api, userID, token]);

  if (!Aberto) {
    return null;
  }

  return (
    <div className="w-[100%] h-[100%]  absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white  rounded-[96px]">
      <div className="container-modal w-[100%] h-[80%]">
        <img
          className="ml-[8%] mt-[5%]"
          alt="Fechar"
          src="X.png"
          onClick={Fechado}
          />
        <h1 className=" mt-[-3.6%] ml-[40%] text-[50px] font-black text-green">
          Receitas
        </h1>

        <div className="text-[30px] mt-[2%] ml-[10%] font-black text-green">
          Receitas Fixas:
          <span className="text-[#156808] ">{totalReceitasFixas}</span>
          <button
            className="  ml-[30%]  w-[180px] h-[23px] rounded-[96px] bg-[#1E7B71] text-[10px] font-black text-white border border-black "
            onClick={AbrirModalAdicionarFixas}
          >
            Adicionar
          </button>
          <ModalReceitasFixas
            Aberto={estadoModalAdicionarFixas}
            Fechado={FecharModalAdicionarFixas}
          />
          <div className="w-[87%] h-[180px] overflow-auto">
          {receitasFixas.map((receita, i) => (
            <ReceitasFixasGerador
              key={receita.ID}
              id={receita.ID}
              nome={receita.Nome}
              valor={receita.Valor}
            />
          ))}
          </div>
        </div>

        <div className="border-green border-t-2 w-[80%] ml-[10%] mt-[2%] ">
          <div className="text-[30px] mt-[3%] ml-[0%] font-black text-green">
            Receitas Variaveis:
            <span className="text-[#156808] ">{totalReceitasVariaveis}</span>
            <button
              className="  ml-[28%]  w-[180px] h-[23px] rounded-[96px] bg-[#1E7B71] text-[10px] font-black text-white border border-black "
              onClick={AbrirModalAdicionarVariaveis}
            >
              Adicionar
            </button>
            <ModalReceitasVariaveis
              Aberto={estadoModalAdicionarVariaveis}
              Fechado={FecharModalAdicionarVariaveis}
            />
            <div className="w-[87%] h-[180px] overflow-auto">
            {receitasVariaveis.map((receita, i) => (
            <ReceitasVariaveisGerador
              key={receita.ID}
              id={receita.ID}
              nome={receita.Nome}
              valor={receita.Valor}
            />
          ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalReceita;