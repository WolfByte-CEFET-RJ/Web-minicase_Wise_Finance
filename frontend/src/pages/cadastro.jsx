import React from "react";
import Botao from "../components/Botao"
import Input from "../components/Input"




const Cadastro = () => {
  
  
  return (
    <div className = "w-screen h-screen bg-no-repeat bg-cover flex items-center	justify-center flex-col" style = {{backgroundImage:"url(/Fundo.svg)"}}>
      <div className="rounded-[60px] bg-[#FFF] md:h-[766px] md:w-[466px] p-[43px] ">
        <form action="" className="flex justify-items-center flex-col h-[100%] w-[100%]">
          <img src="/userFoto.svg" alt="" className="ml-auto mr-auto w-[174px] h-[171px]" />
          <h1 className="mt-[37px]">Nome Completo:</h1>
            <input
              className="pt-3 w-[100%] h-[46px] border-2 border-green rounded-[9px]"
              type="text"
              name="nomeCompleto"
              id="nomeCompleto"
              placeholder="Digite seu nome completo"
              onChange=""
            />
          <h1 className="mt-[10px]">Nome de Usuário:</h1>
          <input
              className="pt-3 w-[100%] h-[46px] border-2 border-green rounded-[9px]"
              type="text"
              name="nomeUsuario"
              id="nomeUsuario"
              placeholder="Digite seu nome de Usuário"
              onChange=""
            />
          <h1 className="mt-[10px]">Email:</h1>
          <input
              className="pt-3 w-[100%] h-[46px] border-2 border-green rounded-[9px]"
              type="text"
              name="email"
              id="email"
              placeholder="Digite seu E-mail"
              onChange=""
            />
          <h1 className="mt-[10px]">Senha:</h1>
          <input
              className="pt-3 w-[100%] h-[46px] border-2 border-green rounded-[9px]"
              type="text"
              name="senha"
              id="senha"
              placeholder="Digite sua senha"
              onChange=""
            />
          <h1 className="mt-[10px]">Confirmar Senha:</h1>
          <input
              className="pt-3 w-[100%] h-[46px] border-2 border-green rounded-[9px]"
              type="text"
              name="confirmarSenha"
              id="confirmarSenha"
              placeholder="Confirme sua senha"
              onChange=""
            />
          <button className="mt-[15px] border-2 border-2 border-black rounded-[9px] bg-green text-[#FFF]">
            Cadastre-se
          </button>
          <button className="border-2 border-black rounded-[9px] bg-green text-[#FFF] mt-[15px]">
            Voltar
        </button>
        </form>
      </div>
    </div>
  );
}

export default Cadastro;