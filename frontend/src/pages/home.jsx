import React, {useState, useContext, useEffect} from "react";
import {EyeSlash, Eye } from 'phosphor-react'
import Sidebar from '../components/componentsHome/Sidebar'
import ModalReceita from '../components/modais/modalReceitas'
import ModalDespesa from '../components/modais/modalDespesas'
import useApi from "../hooks/useApi";
import axios from 'axios';
import { AuthContext } from "../components/auth";
const Home = () => {
  const api = useApi();
  const { token } = useContext(AuthContext);
  const [saldoGeral, setSaldoGeral] = useState("NÃO");
  const [balancoMensal, setBalancoMensal] = useState("")
  const [showSaldoGeral, setShowSaldoGeral] = useState(false);
  const [totalDespesas, setTotalDespesas] = useState("")
  const [totalReceitas, setTotalReceitas] = useState("")
  const [limiteGastos, setLimiteGastos] = useState("")
  const [despesasFixas, setDespesasFixas] = useState("NÃO")
  const [despesasVariaveis, setDespesasVariaveis] = useState("NÃO")
  const [receitasFixas, setReceitasFixas] = useState("NÃO")
  const [receitasVariaveis, setReceitasVariaveis] = useState("NÃO")
  
  const [estadoModalReceitas, setEstadoModalReceitas] = useState(false);
  const [estadoModalDespesas, setEstadoModalDespesas] = useState(false);
  const AbrirModalReceitas = () => {
    setEstadoModalReceitas(true);
  }

  const FecharModalReceitas = () => {
    setEstadoModalReceitas(false);
  }
  const AbrirModalDespesas = () => {
    setEstadoModalDespesas(true);
  }

  const FecharModalDespesas = () => {
    setEstadoModalDespesas(false);
  }
  const handleSaldoGeralToggle = () => {
    setShowSaldoGeral(!showSaldoGeral);
  };



    useEffect(() => {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1; // Months are zero-based, so add 1
    const currentYear = currentDate.getFullYear();
    
    // Exemplo de solicitação usando axios
    api.get(`http://localhost:5000/balanco_mensal/${currentMonth}/${currentYear}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(response => {
      console.log('Dados recebidos:', response.data);
      setBalancoMensal(response.data.balanco.Valor_Balanco);
      setTotalDespesas(response.data.balanco.Total_Despesas);
      setTotalReceitas(response.data.balanco.Total_Receitas);
    })
    .catch(error => {
      console.error('Erro na solicitação:', error);
    });


    api.get("http://localhost:5000/limite_mensal", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(response => {
      console.log('Dados recebidos2:', response.data);
      setLimiteGastos(response.data.limite.Valor_Limite)
      console.log(limiteGastos);
    })
    .catch(error => {
      console.error('Erro na solicitação:', error);
    });


  }, []);



  return (
    <div className = "h-screen bg-no-repeat bg-cover relative " style = {{backgroundImage:"url(/Fundo.svg)"}}>
      {estadoModalReceitas || estadoModalDespesas ? ( <div className = "fixed w-full h-full bg-[rgba(0,0,0,0.7)]  left-0 top-0"/>) : <div/>}
      <div className=" w-[70%] h-[70%] ml-[1%] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white  rounded-[96px]">
        <div className="Partedecima">
          <div className="Container-saldoGeral mt-[2%]">
            <h1 className="text-[90px] ml-[30%]  font-black text-green">Saldo Geral</h1>
            <div className="ml-[38%]  text-[49px] flex items-center font-black ">
                      {showSaldoGeral ? (
                      <div>
                        <p>{saldoGeral}</p>
                        <EyeSlash
                          size={30}
                          weight="duotone"
                          onClick={handleSaldoGeralToggle}
                          className="ml-[110%] mt-[-18%] cursor-pointer"
                        />
                      </div>
                    ) : (
                      <div>
                        <p className="ml-[20%]" >******</p>
                        <Eye
                          size={30}
                          weight="duotone"
                          onClick={handleSaldoGeralToggle}
                          className="ml-[173%] mt-[-28%] cursor-pointer"
                        />
                      </div>
                    )}
            </div> 
          </div>  
          <div className="Container-BalancoMensal">
            <h1 className="text-[21px] ml-[37%] mt-[3%] font-black text-green">Balanço Mensal:<span className="text-black">{balancoMensal}</span></h1>
          </div>
        </div> 
        <div className="border-green border-t-2 w-[50%] ml-[25%] mt-[2%]  ">
          <div className="mt-[5%] flex items-center justify-center">
            <div className=" border-green border-r-2 pr-[30%]">
                <h1 className=" text-[50px] font-black text-green">Despesas</h1>
                <button className=" ml-[20%] w-[120px] h-[20px] rounded-[96px] bg-[#EF0606] text-[10px] font-black text-white border border-black "
                onClick={AbrirModalDespesas}
                > 
                Ver despesas
                </button>
                <ModalDespesa Aberto={estadoModalDespesas} Fechado={FecharModalDespesas}/>
                <div className="text-[#EF0606] font-black text-[35px] mt-[5%]">{totalDespesas}</div>
                <div className="text-[10px] ml-[15%] font-black text-green">Limite de Gastos:<span className="text-black">{limiteGastos}</span></div>
                <div className="text-[15px] mt-[5%] font-black text-green">Despesas Fixas:<span className="text-[#EF0606]">{despesasFixas}</span></div>
                <div className="text-[15px] mt-[5%] font-black text-green">Despesas Variáveis:<span className="text-[#EF0606]">{despesasVariaveis}</span></div>
            </div>
            <div className="ml-[30%]">
              <h1 className=" text-[50px] font-black text-green">Receitas</h1>
              <div>
                <button className="ml-[20%] w-[120px] h-[20px] rounded-[96px] bg-[#156808] text-[10px] font-black text-white border border-black "
                 onClick={AbrirModalReceitas}
                > Ver receitas
                </button>
                  <ModalReceita Aberto={estadoModalReceitas} Fechado={FecharModalReceitas}/>
              </div>
              <div className="text-[#156808] font-black text-[35px] mt-[5%]">{totalReceitas}</div>
              <div className="text-[15px] mt-[5%] font-black text-green">Receitas Fixas:<span className="text-[#156808] ">{receitasFixas}</span></div>
              <div className="text-[15px] mt-[5%] font-black text-green">Receitas Variáveis:<span className="text-[#156808] ">{receitasVariaveis}</span></div>
            </div>
          </div>  
        </div> 
      </div>
      <Sidebar/>
    </div>
  );
}

export default Home;