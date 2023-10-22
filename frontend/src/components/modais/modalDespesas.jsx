import React, { useState } from "react";
import modalDespesasFixas from './modalAdicionarDespesasFIxas'
import modalDespesasVariaveis from './modalAdicionarDespesasVariaveis'
import ModalDespesasFixas from "./modalAdicionarDespesasFIxas";
import ModalDespesasVariaveis from "./modalAdicionarDespesasVariaveis";
const ModalDespesa = ({ Aberto, Fechado}) => {
  const [totalDespesas, setTotalDespesas] = useState("R$4000,00");
  const [totalDespesasFixas, setTotalDespesasFixas] = useState("R$2000,00");
  const [totalDespesasVariaveis, setTotalDespesasVariaveis] = useState("R$2000,00");
  const [DespesaFixaUm, setDespesaFixaUm] = useState("R$1000,00");
  const [DespesasFixaDois, setDespesasFixaDois] = useState("R$1000,00");
  const [DespesaVariavelUm, setDespesaVariavelUm] = useState("R$1000,00");
  const [DespesasVariavelDois, setDespesasVariavelDois] = useState("R$1000,00");
  
  const [estadoModalAdicionarFixas, setEstadoModalAdicionarFixas] = useState(false);
  const [estadoModalAdicionarVariaveis, setEstadoModalAdicionarVariaveis] = useState(false);

  const AbrirModalAdicionarFixas = () => {
    setEstadoModalAdicionarFixas(true);
  }

  const FecharModalAdicionarFixas = () => {
    setEstadoModalAdicionarFixas(false);
  }
  const AbrirModalAdicionarVariaveis = () => {
    setEstadoModalAdicionarVariaveis(true);
  }

  const FecharModalAdicionarVariaveis = () => {
    setEstadoModalAdicionarVariaveis(false);
  }








  if (!Aberto) return null;
  return (     
      <div className="w-[100%] h-[100%]  absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white  rounded-[96px]">
        <div className="container-modal">
          <img className='ml-[8%] mt-[5%]' alt="Fechar" src= "X.png"  onClick={Fechado}/>
          <h1 className=" mt-[-3.6%] ml-[40%] text-[50px] font-black text-green">Despesas</h1>
          
          <div className="text-[30px] mt-[2%] ml-[10%] font-black text-green">
            Despesas Fixas:<span className="text-[black] ">{totalDespesasFixas}</span>
            <button className="  ml-[38.5%]  w-[180px] h-[23px] rounded-[96px] bg-[#1E7B71] text-[10px] font-black text-white border border-black " onClick={AbrirModalAdicionarFixas} > Adicionar </button> 
             <div className="text-[15px] mt-[2%] font-black text-green flex items-center">
              <span className="mr-[10%] ml-[10%]">Nome Despesa</span> <span className=" text-[black]">{DespesaFixaUm}</span>
              <div className="ml-[20%]"> 
                <button className=" mr-5 w-[105px] h-[20px] rounded-[96px] bg-[#1E7B71] text-[10px] font-black text-white border border-black" onClick={AbrirModalAdicionarFixas}> Editar </button>
                <ModalDespesasFixas Aberto={estadoModalAdicionarFixas} Fechado={FecharModalAdicionarFixas}/>
                <button className="w-[105px] h-[20px] rounded-[96px] bg-[#EF0606] text-[10px] font-black text-white border border-black">
                  Excluir
                </button>
              </div>
            </div>
            <div className="text-[15px] mt-[2%] font-black text-green flex items-center">
              <span className="mr-[10%] ml-[10%]">Nome Despesa</span> <span className=" text-[black]">{DespesasFixaDois}</span>
              <div className="ml-[20%]"> 
                <button className=" mr-5 w-[105px] h-[20px] rounded-[96px] bg-[#1E7B71] text-[10px] font-black text-white border border-black"onClick={AbrirModalAdicionarFixas}> Editar </button>
                <button className="w-[105px] h-[20px] rounded-[96px] bg-[#EF0606] text-[10px] font-black text-white border border-black">
                  Excluir
                </button>
              </div>
            </div>
          </div>

          <div className="border-green border-t-2 w-[80%] ml-[10%] mt-[2%] ">
          <div className="text-[30px] mt-[3%] ml-[0%] font-black text-green">
            Despesas Variaveis:<span className="text-[black] ">{totalDespesasVariaveis}</span>
            <button className="  ml-[37%]  w-[180px] h-[23px] rounded-[96px] bg-[#1E7B71] text-[10px] font-black text-white border border-black " onClick={AbrirModalAdicionarVariaveis} >Adicionar</button> 
             <div className="text-[15px] mt-[2%] ml-[1.5%] font-black text-green flex items-center">
              <span className="mr-[10%] ml-[10%]">Nome Despesa</span> <span className=" text-[black]">{DespesaVariavelUm}</span>
              <div className="ml-[24.5%]"> 
                <button className=" mr-5 w-[105px] h-[20px] rounded-[96px] bg-[#1E7B71] text-[10px] font-black text-white border border-black" onClick={AbrirModalAdicionarVariaveis}>Editar</button>
                <ModalDespesasVariaveis Aberto={estadoModalAdicionarVariaveis} Fechado={FecharModalAdicionarVariaveis} />
                <button className="w-[105px] h-[20px] rounded-[96px] bg-[#EF0606] text-[10px] font-black text-white border border-black">
                  Excluir
                </button>
              </div>
            </div>
            <div className="text-[15px] mt-[2%] ml-[1.5%] font-black text-green flex items-center">
              <span className="mr-[10%] ml-[10%]">Nome Despesa</span> <span className=" text-[black]">{DespesasVariavelDois}</span>
              <div className="ml-[24.5%]"> 
                <button className=" mr-5 w-[105px] h-[20px] rounded-[96px] bg-[#1E7B71] text-[10px] font-black text-white border border-black" onClick={AbrirModalAdicionarVariaveis}> Editar </button>
                <button className="w-[105px] h-[20px] rounded-[96px] bg-[#EF0606] text-[10px] font-black text-white border border-black">
                  Excluir
                </button>
              </div>
            </div>
          </div>
          </div>




        </div>
      </div> 
  );
};

export default ModalDespesa;