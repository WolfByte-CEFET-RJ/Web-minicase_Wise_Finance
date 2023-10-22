import React, { useState } from "react";
import {EyeSlash, Eye } from 'phosphor-react'
import Sidebar from '../components/componentsHome/Sidebar'
import ModalReceita from '../components/modais/modalReceitas'
import ModalDespesa from '../components/modais/modalDespesas'
const Home = () => {
  const [saldoGeral, setSaldoGeral] = useState("R$2000,00");
  const [balancoMensal, setBalancoMensal] = useState("+R$2000,00")
  const [showSaldoGeral, setShowSaldoGeral] = useState(false);
  const [totalDespesas, setTotalDespesas] = useState("-R$2000,00")
  const [totalReceitas, setTotalReceitas] = useState("+R$4000,00")
  const [limiteGastos, setLimiteGastos] = useState("R$5000,00")
  const [despesasFixas, setDespesasFixas] = useState("-R$1000,00")
  const [despesasVariaveis, setDespesasVariaveis] = useState("-R$1000,00")
  const [receitasFixas, setReceitasFixas] = useState("R$2000,00")
  const [receitasVariaveis, setReceitasVariaveis] = useState("R$2000,00")
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

  <div className = "fixed w-full h-full bg-[rgba(0,0,0,0.5)] z-[1000] left-0 top-0"></div>


  return (
    <div className = "h-screen bg-no-repeat bg-cover relative " style = {{backgroundImage:"url(/Fundo.svg)"}}>
      {/* {estadoModalReceitas === true ?     <div className = "fixed w-full h-full bg-[rgba(0,0,0,0.5)] z-[1000] left-0 top-0"/> :<div/>}
      {estadoModalDespesas === true ?     <div className = "fixed w-full h-full bg-[rgba(0,0,0,0.5)] z-[1000] left-0 top-0"/> :<div/>} */}
      <div className=" w-[70%] h-[70%] ml-[1%] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white  rounded-[96px]">
        <div className="Partedecima">
          <div className="Container-saldoGeral">
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