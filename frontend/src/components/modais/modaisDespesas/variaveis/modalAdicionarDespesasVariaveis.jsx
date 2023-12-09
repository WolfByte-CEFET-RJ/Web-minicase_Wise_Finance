import React, { useState, useContext } from "react";
import useApi from "../../../../hooks/useApi";
import { AuthContext } from "../../../auth";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ModalDespesasVariaveis = ({ Aberto, Fechado }) => {
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [preco, setPreco] = useState("");
  const { userID, token } = useContext(AuthContext);
  const api = useApi();
  const dataAtual = new Date().toISOString();

  const handleChange = (event, setText) => {
    setText(event.target.value);
  };

  function formatarDataParaEnvio(data) {
    const dataFormatada = new Date(data);
    const ano = dataFormatada.getFullYear();
    const mes = (dataFormatada.getMonth() + 1).toString().padStart(2, '0');
    const dia = dataFormatada.getDate().toString().padStart(2, '0');
  
    return `${ano}-${mes}-${dia}`;
  }

  async function handleEnvio(event) {
    event.preventDefault();
    const body = {
      userId:  userID,
      nome: nome,
      valor: preco,
      descricao: descricao,
      dataPagamento: formatarDataParaEnvio(dataAtual),
    };
    try {
      const response = await api.post("http://localhost:5000/despesa_var", body, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.data.status === true) {
        toast.success("Despesa Variável adicionada com sucesso!");
        Fechado();
      } else if (response.data.status === false){
        toast.error(response.data.message.toString())
      }
      
    } catch (error) {
      console.log(error);
    }
  }
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
          <h1 className=" mt-[-3.6%] ml-[25%] text-[50px] font-black text-green">
            Despesas Variaveis
          </h1>
          <h1 className=" ml-[30%] text-[10px] font-black text-green">
            Lembrando que essa é uma despesa variável e será apagada após um mês
          </h1>
          <div>
            <form 
              className="flex flex-col items-center text-[15px]"
              onSubmit={handleEnvio}
              >
              <div className="mb-30 mt-[20px]">
                <h1 className="text-black">Nome Despesa:</h1>
                <input
                  id="nome"
                  className="border border-black rounded-[5px] w-[380px] h-[40px] mb-[30px] pl-[5px]"
                  placeholder="Digite o nome"
                  onChange={(event) => handleChange(event, setNome)}
                />
              </div>
              <div className="mb-30">
                <h1 className="text-black">Descrição Despesa:</h1>
                <textarea
                  id="detalhes"
                  className="border border-black rounded-[5px] w-[380px] h-[150px] mb-[30px] pl-[5px] pt-[5px]"
                  placeholder="Detalhes da despesa"
                  onChange={(event) => handleChange(event, setDescricao)}
                />
              </div>
              <div className="mb-30 ml-[-2%]">
                <h1 className="text-black ml-[5%]">Valor Despesa:</h1>
                <label className="text-black">R$</label>
                <input
                  id="valor"
                  className="border border-black rounded-[5px] w-[380px] mb-[30px] h-[40px] pl-[5px]"
                  placeholder="Digite o valor"
                  onChange={(event) => handleChange(event, setPreco)}
                />
              </div>
              <button 
                className="border border-black rounded-[9px] bg-[#1E7B71] mb-[10px] text-white h-[31px] w-[380px]"
                type="submit"
                >
                Salvar
              </button>
              <button 
                className="border border-black rounded-[9px] bg-[#1E7B71] mb-[10px] text-white h-[31px] w-[380px]"
                onClick={Fechado}
                >
                Cancelar
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalDespesasVariaveis;
