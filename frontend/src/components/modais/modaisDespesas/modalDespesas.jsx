import React, { useState, useContext, useEffect } from "react";
import useApi from "../../../hooks/useApi";
import { AuthContext } from "../../auth";
import ModalDespesasFixas from "./fixas/modalAdicionarDespesasFIxas";
import ModalDespesasVariaveis from "./variaveis/modalAdicionarDespesasVariaveis";
import DespesasFixasGerador from "../../modalComponent/despesas/despesaFixaGerador";
import DespesasVariaveisGerador from "../../modalComponent/despesas/despesaVariavelGerador";

const ModalDespesa = ({ Aberto, Fechado }) => {
  const [despesasFixas, setDespesasFixas] = useState([]);
  const [despesasVariaveis, setDespesasVariaveis] = useState([]);
  const { userID, token } = useContext(AuthContext);
  const valorTotalDespesasFixas = despesasFixas
    .reduce((acc, despesa) => acc + parseFloat(despesa.Valor), 0)
    .toFixed(2);
  const totalDespesasFixas = "R$" + valorTotalDespesasFixas;
  const valorTotalDespesasVariaveis = despesasVariaveis
    .reduce((acc, despesa) => acc + parseFloat(despesa.Valor), 0)
    .toFixed(2);
  const totalDespesasVariaveis = "R$" + valorTotalDespesasVariaveis;
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

  const [progress, setProgress] = useState(0);

  const handleSliderChange = (event) => {
    setProgress(event.target.value);
  };

  const min = 0;
  const max = 30000;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const despesasFixasData = await api.get(
          "http://localhost:5000/despesa_fixa/",
          {
            body: {
              userId: userID,
            },
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        setDespesasFixas(despesasFixasData.data);
        const despesasVariaveisData = await api.get(
          "http://localhost:5000/despesa_var/",
          {
            body: {
              userId: userID,
            },
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        setDespesasVariaveis(despesasVariaveisData.data);
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
      <div className="container-modal">
        <img
          className="ml-[8%] mt-[5%]"
          alt="Fechar"
          src="X.png"
          onClick={Fechado}
        />
        <h1 className=" mt-[-3.6%] ml-[40%] text-[50px] font-black text-green">
          Despesas
        </h1>

        <div className="text-[30px] mt-[2%] ml-[10%] font-black text-green">
          Despesas Fixas:
          <span className="text-[green] ">{totalDespesasFixas}</span>
          <button
            className="  ml-[38.5%]  w-[180px] h-[23px] rounded-[96px] bg-[#1E7B71] text-[10px] font-black text-white border border-black "
            onClick={AbrirModalAdicionarFixas}
          >
            Adicionar
          </button>
          <ModalDespesasFixas
            Aberto={estadoModalAdicionarFixas}
            Fechado={FecharModalAdicionarFixas}
          />
          <div className="w-[87%] h-[100px] overflow-auto mt-[10px]">
            {despesasFixas.map((despesa, i) => (
              <DespesasFixasGerador
                key={despesa.ID}
                id={despesa.ID}
                nome={despesa.Nome}
                valor={despesa.Valor}
              />
            ))}
          </div>
        </div>

        <div className="border-green border-t-2 w-[80%] ml-[10%] mt-[2%] ">
          <div className="text-[30px] mt-[3%] ml-[0%] font-black text-green">
            Despesas Variaveis:
            <span className="text-[green] ">{totalDespesasVariaveis}</span>
            <button
              className="  ml-[25%]  w-[180px] h-[23px] rounded-[96px] bg-[#1E7B71] text-[10px] font-black text-white border border-black "
              onClick={AbrirModalAdicionarVariaveis}
            >
              Adicionar
            </button>
            <ModalDespesasVariaveis
              Aberto={estadoModalAdicionarVariaveis}
              Fechado={FecharModalAdicionarVariaveis}
            />
            <div className="w-[87%] h-[100px] overflow-auto mt-[10px]">
              {despesasVariaveis.map((despesa, i) => (
                <DespesasVariaveisGerador
                  key={despesa.ID}
                  id={despesa.ID}
                  nome={despesa.Nome}
                  valor={despesa.Valor}
                />
              ))}
            </div>
            <div className=" mt-[3%]">
              <div className="text-center mt-4 ">
                <h1 className="mr-[3%]">Limite de gastos</h1>
                <div className="relative">
                  <input
                    type="range"
                    id="progressSlider"
                    value={progress}
                    onChange={handleSliderChange}
                    min={min}
                    max={max}
                    className="w-full  p-1"
                  />
                  <div className="flex justify-between">
                    <span>{min}</span>
                    <span>{progress}</span>
                    <span>{max}</span>
                  </div>
                </div>
                <br />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalDespesa;
