import React from "react";
import Botao from "../components/Botao"
import Input from "../components/Input"




const Cadastro = () => {
  
  
  return (
    <div className = "w-screen h-screen bg-no-repeat bg-cover flex items-center	justify-items-center flex-col" style = {{backgroundImage:"url(/Fundo.svg)"}}>
      <div className="bg-[#FFF]">
        <form action="" className="">
          <h1 className="">Nome Completo:</h1>
          <div className="">
            <input
              type="text"
              name="nomeCompleto"
              id="nomeCompleto"
              placeholder="Digite seu nome completo"
              onChange=""
            />
          </div>
          <h1 className="">Nome de Usuário:</h1>
          <div className="">
          <input
              type="text"
              name="nomeUsuario"
              id="nomeUsuario"
              placeholder="Digite seu nome de Usuário"
              onChange=""
            />
          </div>
          <h1 className="">Email:</h1>
          <div className="">
          <input
              type="text"
              name="email"
              id="email"
              placeholder="Digite seu E-mail"
              onChange=""
            />
          </div>
          <h1 className="">Senha:</h1>
          <div className="">
          <input
              type="text"
              name="senha"
              id="senha"
              placeholder="Digite sua senha"
              onChange=""
            />
          </div>
          <h1 className="">Confirmar Senha:</h1>
          <div className="">
          <input
              type="text"
              name="confirmarSenha"
              id="confirmarSenha"
              placeholder="Confirme sua senha"
              onChange=""
            />
          </div>
          <button className="">
            Cadastre-se
          </button>
          <button className="">
            Voltar
          </button>
        </form>
      </div>
    </div>
  );
}

export default Cadastro;