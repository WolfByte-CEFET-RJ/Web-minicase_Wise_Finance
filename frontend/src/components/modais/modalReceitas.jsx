import React, { useState } from "react";
import ModalReceitasFixas from "./modalAdicionarReceitasFIxas";
import ModalReceitasVariaveis from "./modalAdicionarReceitasVariaveis";

const ModalReceita = ({ Aberto, Fechado}) => {
  const [totalReceitasFixas, setTotalReceitasFixas] = useState("R$2000,00");
  const [totalReceitasVariaveis, setTotalReceitasVariaveis] = useState("R$2000,00");
  const [ReceitaFixaUm, setReceitaFixaUm] = useState("R$1000,00");
  const [ReceitasFixaDois, setReceitasFixaDois] = useState("R$1000,00");
  const [ReceitaVariavelUm, setReceitaVariavelUm] = useState("R$1000,00");
  const [ReceitasVariavelDois, setReceitasVariavelDois] = useState("R$1000,00");


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
          <h1 className=" mt-[-3.6%] ml-[40%] text-[50px] font-black text-green">Receitas</h1>
          
          <div className="text-[30px] mt-[2%] ml-[10%] font-black text-green">
            Receitas Fixas:<span className="text-[#156808] ">{totalReceitasFixas}</span>
            <button className="  ml-[40%]  w-[180px] h-[23px] rounded-[96px] bg-[#1E7B71] text-[10px] font-black text-white border border-black "onClick={AbrirModalAdicionarFixas}>Adicionar</button> 
            <ModalReceitasFixas Aberto={estadoModalAdicionarFixas} Fechado={FecharModalAdicionarFixas}/>
             <div className="text-[15px] mt-[2%] font-black text-green flex items-center">
              <span className="mr-[10%] ml-[10%]">Nome Receita</span> <span className=" text-[#156808]">{ReceitaFixaUm}</span>
              <div className="ml-[20%]"> 
                <button className=" mr-5 w-[105px] h-[20px] rounded-[96px] bg-[#1E7B71] text-[10px] font-black text-white border border-black" onClick={AbrirModalAdicionarFixas}>Editar</button>
                <button className="w-[105px] h-[20px] rounded-[96px] bg-[#EF0606] text-[10px] font-black text-white border border-black">Excluir</button>
              </div>
            </div>
            <div className="text-[15px] mt-[2%] font-black text-green flex items-center">
              <span className="mr-[10%] ml-[10%]">Nome Receita</span> <span className=" text-[#156808]">{ReceitasFixaDois}</span>
              <div className="ml-[20%]"> 
                <button className=" mr-5 w-[105px] h-[20px] rounded-[96px] bg-[#1E7B71] text-[10px] font-black text-white border border-black" onClick={AbrirModalAdicionarFixas}>Editar</button>
                <button className="w-[105px] h-[20px] rounded-[96px] bg-[#EF0606] text-[10px] font-black text-white border border-black">
                  Excluir
                </button>
              </div>
            </div>
          </div>

          <div className="border-green border-t-2 w-[80%] ml-[10%] mt-[2%] ">
          <div className="text-[30px] mt-[3%] ml-[0%] font-black text-green">
            Receitas Variaveis:<span className="text-[#156808] ">{totalReceitasVariaveis}</span>
            <button className="  ml-[38%]  w-[180px] h-[23px] rounded-[96px] bg-[#1E7B71] text-[10px] font-black text-white border border-black " onClick={AbrirModalAdicionarVariaveis}
            >Adicionar</button> 
            <ModalReceitasVariaveis Aberto={estadoModalAdicionarVariaveis} Fechado={FecharModalAdicionarVariaveis}/>
             <div className="text-[15px] mt-[2%] font-black text-green flex items-center">
              <span className="mr-[10%] ml-[10%]">Nome Receita</span> <span className=" text-[#156808]">{ReceitaVariavelUm}</span>
              <div className="ml-[25%]"> 
                <button className=" mr-5 w-[105px] h-[20px] rounded-[96px] bg-[#1E7B71] text-[10px] font-black text-white border border-black" onClick={AbrirModalAdicionarVariaveis}>
                  Editar
                </button>
                <button className="w-[105px] h-[20px] rounded-[96px] bg-[#EF0606] text-[10px] font-black text-white border border-black">
                  Excluir
                </button>
              </div>
            </div>
            <div className="text-[15px] mt-[2%] font-black text-green flex items-center">
              <span className="mr-[10%] ml-[10%]">Nome Receita</span> <span className=" text-[#156808]">{ReceitasVariavelDois}</span>
              <div className="ml-[25%]"> 
                <button className=" mr-5 w-[105px] h-[20px] rounded-[96px] bg-[#1E7B71] text-[10px] font-black text-white border border-black" onClick={AbrirModalAdicionarVariaveis}>
                  Editar
                </button>
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

export default ModalReceita;