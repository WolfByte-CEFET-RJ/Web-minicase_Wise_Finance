import React, { useState, useContext, useEffect } from "react";
import { EyeSlash, Eye } from "phosphor-react";
import Sidebar from "../components/sideBar";
import ModalReceita from "../components/modais/modaisReceitas/modalReceitas";
import ModalDespesa from "../components/modais/modaisDespesas/modalDespesas";
import useApi from "../hooks/useApi";
import axios from "axios";
import { AuthContext } from "../components/auth";

const Home = () => {
  const api = useApi();
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1;
  const currentYear = currentDate.getFullYear();
  const { userID, token } = useContext(AuthContext);
  const [saldoGeral, setSaldoGeral] = useState("");
  const [balancoMensal, setBalancoMensal] = useState("");
  const [showSaldoGeral, setShowSaldoGeral] = useState(false);
  const [totalDespesas, setTotalDespesas] = useState("");
  const [totalReceitas, setTotalReceitas] = useState("");
  const [limiteGastos, setLimiteGastos] = useState("");
  const [despesasFixas, setDespesasFixas] = useState("");
  const [despesasVariaveis, setDespesasVariaveis] = useState("");
  const [receitasFixas, setReceitasFixas] = useState("");
  const [receitasVariaveis, setReceitasVariaveis] = useState("");

  const [estadoModalReceitas, setEstadoModalReceitas] = useState(false);
  const [estadoModalDespesas, setEstadoModalDespesas] = useState(false);

  const AbrirModalReceitas = () => {
    setEstadoModalReceitas(true);
  };

  const FecharModalReceitas = () => {
    setEstadoModalReceitas(false);
  };

  const AbrirModalDespesas = () => {
    setEstadoModalDespesas(true);
  };

  const FecharModalDespesas = () => {
    setEstadoModalDespesas(false);
  };

  const handleSaldoGeralToggle = () => {
    setShowSaldoGeral(!showSaldoGeral);
  };

  useEffect(() => {
    const fetchUsuario = async () => {
      try {
        const response = await api.get("http://localhost:5000/usuario", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log(token);
        console.log("Dados Usuario:", response.data);
        setSaldoGeral(response.data.usuario.Saldo_Geral);
        setDespesasFixas(response.data.usuario.Desp_Fixa_Total);
        setDespesasVariaveis(response.data.usuario.Desp_Var_Total);
        setReceitasVariaveis(response.data.usuario.Rec_Var_Total);
        setReceitasFixas(response.data.usuario.Rec_Fixa_Total);
        setTotalDespesas(
          parseFloat(despesasFixas) + parseFloat(despesasVariaveis),
        );
        setTotalReceitas(
          parseFloat(receitasFixas) + parseFloat(receitasVariaveis),
        );
        setBalancoMensal(parseFloat(totalReceitas) - parseFloat(totalDespesas));
      } catch (error) {
        console.error("Erro na solicitação:", error);
      }
    };

    const fetchLimiteMensal = async () => {
      try {
        const response = await api.get("http://localhost:5000/limite_mensal", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log("Dados Limite gastos:", response.data);
        setLimiteGastos(response.data.limite.Valor_Limite);
      } catch (error) {
        console.error("Erro na solicitação:", error);
      }
    };

    fetchUsuario();
    fetchLimiteMensal();
  }, [api, token]);

  return (
    <div className="min-h-screen bg-no-repeat bg-cover relative" style={{ backgroundImage: "url(/Fundo.svg)" }}>
      <Sidebar />
      {/* {estadoModalReceitas || estadoModalDespesas ? (
        <div className="fixed w-full h-full bg-[rgba(0,0,0,0.7)]  left-0 top-0" />
      ) : (
        <div />
      )}
      
      <div className="w-full md:w-[70%] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-[24px] p-4 md:p-8">
        <div className="Partedecima">
          <div className="Container-saldoGeral mt-[2%]">
            <h1 className="text-[20px] md:text-[90px] ml-[5%] md:ml-[30%] font-black text-green">
              Saldo Geral
            </h1>
            <div className="ml-[5%] md:ml-[38%]  text-[16px] md:text-[49px] flex items-center font-black ">
              {showSaldoGeral ? (
                <div>
                  <p>{saldoGeral}</p>
                  <EyeSlash
                    size={30}
                    weight="duotone"
                    onClick={handleSaldoGeralToggle}
                    className="ml-[5%] md:ml-[110%] mt-[-18%] cursor-pointer"
                  />
                </div>
              ) : (
                <div>
                  <p className="ml-[5%] md:ml-[20%]">******</p>
                  <Eye
                    size={30}
                    weight="duotone"
                    onClick={handleSaldoGeralToggle}
                    className="ml-[5%] md:ml-[173%] mt-[-28%] cursor-pointer"
                  />
                </div>
              )}
            </div>
          </div>
          <div className="Container-BalancoMensal">
            <h1 className="text-[16px] md:text-[21px] ml-[5%] md:ml-[37%] mt-[3%] font-black text-green">
              Balanço Mensal:
              <span className="text-black"> R$ {balancoMensal}</span>
            </h1>
          </div>
        </div>
        <div className="border-green border-t-2 w-[50%] ml-[5%] md:ml-[25%] mt-[2%] md:mt-[2%]  ">
          <div className="mt-[5%] md:flex items-center justify-center">
            <div className="border-green border-r-2 md:pr-[30%]">
              <h1 className="text-[20px] md:text-[50px] font-black text-green">Despesas</h1>
              <button
                className="ml-[5%] md:ml-[20%] w-[120px] md:w-[120px] h-[20px] md:h-[20px] rounded-[96px] bg-[#EF0606] text-[10px] md:text-[10px] font-black text-white border border-black "
                onClick={AbrirModalDespesas}
              >
                Ver despesas
              </button>
              <ModalDespesa
                Aberto={estadoModalDespesas}
                Fechado={FecharModalDespesas}
              />
              <div className="text-[#EF0606] font-black text-[20px] md:text-[35px] mt-[5%]">
                R$ {totalDespesas}
              </div>
              <div className="text-[10px] md:ml-[5%] font-black text-green">
                Limite de Gastos:
                <span className="text-black"> R$ {limiteGastos}</span>
              </div>
              <div className="text-[15px] mt-[5%] md:mt-[5%] font-black text-green">
                Despesas Fixas:
                <span className="text-[#EF0606]"> R$ {despesasFixas}</span>
              </div>
              <div className="text-[15px] mt-[5%] md:mt-[5%] font-black text-green">
                Despesas Variáveis:
                <span className="text-[#EF0606]"> R$ {despesasVariaveis}</span>
              </div>
            </div>
            <div className="ml-[5%] md:ml-[30%]">
              <h1 className="text-[20px] md:text-[50px] font-black text-green">Receitas</h1>
              <div>
                <button
                  className="ml-[5%] md:ml-[20%] w-[120px] md:w-[120px] h-[20px] md:h-[20px] rounded-[96px] bg-[#156808] text-[10px] md:text-[10px] font-black text-white border border-black "
                  onClick={AbrirModalReceitas}
                >
                  {" "}
                  Ver receitas
                </button>
                <ModalReceita
                  Aberto={estadoModalReceitas}
                  Fechado={FecharModalReceitas}
                />
              </div>
              <div className="text-[#156808] font-black text-[20px] md:text-[35px] mt-[5%]">
                R$ {totalReceitas}
              </div>
              <div className="text-[15px] mt-[5%] md:mt-[5%] font-black text-green">
                Receitas Fixas:
                <span className="text-[#156808] "> R$ {receitasFixas}</span>
              </div>
              <div className="text-[15px] mt-[5%] md:mt-[5%] font-black text-green">
                Receitas Variáveis:
                <span className="text-[#156808] "> R$ {receitasVariaveis}</span>
              </div>
            </div>
          </div>
        </div> */}
      </div>
      
    //</div>
  );
};

export default Home;
