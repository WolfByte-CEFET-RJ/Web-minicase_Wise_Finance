import React, { useState } from "react";

const ModalReceitasFixas = ({ Aberto, Fechado }) => {
  if (!Aberto) return null;
  return (
    <div className="w-[100.2%] h-[100.1%]  absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[rgba(0,0,0,0.7)]  rounded-[96px]">
      <div className="w-[70%] h-[100%]  absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white  rounded-[96px]">
        <div className="container-modal">
          <img
            className="ml-[8%] mt-[5%]"
            alt="Fechar"
            src="X.png"
            onClick={Fechado}
          />
          <h1 className=" mt-[-3.6%] ml-[30%] text-[50px] font-black text-green">
            Receitas Fixas
          </h1>
          <h1 className=" ml-[33%] text-[10px] font-black text-green">
            Lembrando que essa é uma receita fixa e se manterá todo mês
          </h1>
          <div>
            <form className="flex flex-col items-center text-[15px]">
              <div className="mb-30 mt-[20px]">
                <h1 className="text-black">Nome Receita:</h1>
                <input
                  id="nome"
                  className="border border-black rounded-[5px] w-[380px] h-[40px] mb-[30px] pl-[5px]"
                  placeholder="Digite o nome"
                />
              </div>
              <div className="mb-30">
                <h1 className="text-black">Descrição Receita:</h1>
                <textarea
                  id="detalhes"
                  className="border border-black rounded-[5px] w-[380px] h-[150px] mb-[30px] pl-[5px] pt-[5px]"
                  placeholder="Detalhes da despesa"
                />
              </div>
              <div className="mb-30 ml-[-2%]">
                <h1 className="text-black ml-[5%]">Valor Receita:</h1>
                <label className="text-black">R$</label>
                <input
                  id="valor"
                  className="border border-black rounded-[5px] w-[380px] mb-[30px] h-[40px] pl-[5px]"
                  placeholder="Digite o valor"
                />
              </div>
              <button className="border border-black rounded-[9px] bg-[#1E7B71] mb-[10px] text-white h-[31px] w-[380px]">
                Salvar
              </button>
              <button className="border border-black rounded-[9px] bg-[#1E7B71] mb-[10px] text-white h-[31px] w-[380px]">
                Cancelar
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalReceitasFixas;
