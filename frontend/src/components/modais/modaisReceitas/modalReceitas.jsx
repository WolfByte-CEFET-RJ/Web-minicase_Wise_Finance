import React, { useState, useContext, useEffect } from "react";
import useApi from "../../../hooks/useApi";
import { AuthContext } from "../../auth";
import ModalReceitasFixas from "./fixas/modalAdicionarReceitasFixas";
import ModalReceitasVariaveis from "./variaveis/modalAdicionarReceitasVariaveis";
import ReceitasFixasGerador from "../../modalComponent/gerador"

const ModalReceita = ({ Aberto, Fechado }) => {
  const [receitasFixas, setReceitasFixas] = useState([]);
  const [receitasVariaveis, setReceitasVariaveis] = useState([]);
  const { userID, token } = useContext(AuthContext);
  const api = useApi();

  const [totalReceitasFixas, setTotalReceitasFixas] = useState("R$2000,00");
  const [totalReceitasVariaveis, setTotalReceitasVariaveis] = useState("R$2000,00");
  
  const [estadoModalAdicionarFixas, setEstadoModalAdicionarFixas] =
    useState(false);
  const [estadoModalAdicionarVariaveis, setEstadoModalAdicionarVariaveis] =
    useState(false);
    
    
    async function loadReceitas() {
      try {
        const receitasFixas = await api.get("http://localhost:5000/receita_fixa/", {
          body: {
            userId: userID,
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setReceitasFixas(receitasFixas.data);
      } catch (error) {
        console.log(error);
      }
    }
    
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
  
  if (!Aberto){
    return null
  } else{
    loadReceitas();
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
              key={receita.id}
              id={receita.id}
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
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalReceita;
