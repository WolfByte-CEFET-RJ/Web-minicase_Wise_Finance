import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Form from "../components/Forms/formCadastro"
import useApi from "../hooks/useApi";

const Cadastro = () => {
  const navigate = useNavigate();
  return (
    <div className = "w-screen h-screen bg-no-repeat bg-cover flex items-center	justify-center flex-col" style = {{backgroundImage:"url(/Fundo.svg)"}}>
      <div className="rounded-[60px] bg-[#FFF] md:h-[766px] md:w-[466px] p-[43px] ">
        <Form/>
      </div>
    </div>
  );
}

export default Cadastro;