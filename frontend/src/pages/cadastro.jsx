import React from "react";
import Form from "../components/Forms/formCadastro";

const Cadastro = () => {
  return (
    <div className = " fixed w-screen h-screen bg-no-repeat bg-cover flex items-center	justify-center flex-col" style = {{backgroundImage:"url(/Fundo.svg)"}}>
      <div className="rounded-[60px] bg-[#FFF] md:h-[800px] md:w-[500px] p-[43px] ">
        <Form/>
      </div>
    </div>
  );
}

export default Cadastro;