import React, { useState, useContext, useEffect  } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useApi from "../hooks/useApi";
import Sidebar from "../components/sideBar";
import { AuthContext } from "../components/auth";

const Perfil = () => {
  const api = useApi();
  const { userID, token } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [pass, setPass] = useState("123");
  const [passVer, setPassVer] = useState("123");
  const [editarNome, setEditarNome] = useState(false);
  const [editarPassword, setEditarPassword] = useState(false);
  const [editarPasswordVer, setEditarPasswordVer] = useState(false);
  const handleEditartrue = () => {
    setEditarNome(true);
    setEditarPassword(true);
    setEditarPasswordVer(true);
  };
  const handleEditarFalse = () => {
    setEditarNome(false);
    setEditarPassword(false);
    setEditarPasswordVer(false);
  };
  const handleChange = (event, setText) => {
    setText(event.target.value);
  };

  useEffect(() => {
    const fetchUsuario = async () => {
      try {
        const response = await api.get("http://localhost:5000/usuario", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log(token);
        console.log("Dados Usuario:", response.data);
        setName(response.data.usuario.Nome);
        setEmail(response.data.usuario.Email);
        setUserName(response.data.usuario.Username);       
      } catch (error) {
        console.error("Erro na solicitação:", error);
      }
    };
   
    fetchUsuario();
  }, [api, token]);

  async function handleEnvio(event) {
    event.preventDefault();
    
    try {
      const response = await api.patch("http://localhost:5000/usuario");
      if (response.data.success === false) {
        toast.error("Falha ao realizar o login!");
      }
      if (response.data.message === "Usuário não encontrado") {
        toast.error("Usuário não encontrado!");
      } else if (response.data.message === "Senha inválida") {
        toast.error("Senha inválida!");
      } else if (response.data.success === true) {
        toast.success("Login realizado com sucesso!");
        // navigate("/home");
      }
    } catch (error) {
      console.log(error);
      toast.error("Falha ao realizar o login!");
    }
  }


  return (
    <div
      className="h-screen bg-no-repeat bg-cover relative "
      style={{ backgroundImage: "url(/Fundo.svg)" }}
    >
      <div className=" w-[70%] h-[70%] ml-[1%] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white  rounded-[96px]">
        <div className="flex flex-row h-[100%] w-[100%]">
          <div className="flex flex-col h-[100%] w-[50%] mt-[12%] mb-[12%]">
            <img
              src={`https://avatar.uimaterial.com/?setId=HovCX3s7UOrjv7DekigX&name=${name}&size=256`}
              alt=""
              className="ml-auto mr-auto w-[256px] h-[256px]"
            />
            <h1 className="pt-3 w-[50%] h-[7%] border-2 border-green rounded-[9px] ml-auto mr-auto mt-[5%] pb-[10px] pl-[12%] font-black text-[12px]">
              {name}
            </h1>
            <h1 className="pt-3 w-[50%] h-[7%] border-2 border-green rounded-[9px] ml-auto mr-auto mt-[2%] pb-[10px] pl-[9%] font-black text-[12px]">
              {email}
            </h1>
          </div>

          <form
            action=""
            className="flex flex-col h-[100%] w-[50%] mt-[12%] mb-[12%]"
            onSubmit={handleEnvio}
          >
            <div className="mb-30  ">
              <h1 className="font-black text-[12px]">Nome completo:</h1>
              <div className="border-2 border-green rounded-[5px] w-[380px] h-[51px] mb-[30px] pl-[5px] flex align-itens">
                {editarPassword === true ? (
                  <input
                    id="nome"
                    className="w-[89%] h-[100%] ml-[-5px] pl-[5px]"
                    placeholder={name}
                    onChange={(event) => handleChange(event, setName)}
                  />
                ) : (
                  <h1 className="w-[89%] h-[100%] ml-[-5px] pl-[5px]  pt-[3%]">
                    {" "}
                    {name}{" "}
                  </h1>
                )}
                <div className="border-l border-green w-[10%] h-[34px] mt-[1.5%]">
                  <img
                    src="/Lapis.png"
                    alt=""
                    className=" w-[18px] h-[19px] ml-[10px] mt-[6px]"
                    onClick={handleEditartrue}
                  />
                </div>
              </div>
            </div>
            <div className="mb-30  ">
              <h1 className="font-black text-[12px]">Nome de Usuário:</h1>
              <div className="border-2 border-green rounded-[5px] w-[380px] h-[51px] mb-[30px] pl-[5px] flex align-itens">
                {editarPassword === true ? (
                  <input
                    id="nome"
                    className="w-[89%] h-[100%] ml-[-5px] pl-[5px]"
                    placeholder={userName}
                    onChange={(event) => handleChange(event, setUserName)}
                  />
                ) : (
                  <h1 className="w-[89%] h-[100%] ml-[-5px] pl-[5px]  pt-[3%]">
                    {" "}
                    {userName}{" "}
                  </h1>
                )}
                <div className="border-l border-green w-[10%] h-[34px] mt-[1.5%]">
                  <img
                    src="/Lapis.png"
                    alt=""
                    className=" w-[18px] h-[19px] ml-[10px] mt-[6px]"
                    onClick={handleEditartrue}
                  />
                </div>
              </div>
            </div>
            <div className="mb-30  ">
              <h1 className="font-black text-[12px]">Senha:</h1>
              <div className="border-2 border-green rounded-[5px] w-[380px] h-[51px] mb-[30px] pl-[5px] flex align-itens">
                {editarPassword === true ? (
                  <input
                    id="senha"
                    className="w-[89%] h-[100%] ml-[-5px] pl-[5px]"
                    placeholder={pass}
                    onChange={(event) => handleChange(event, setPass)}
                  />
                ) : (
                  <h1 className="w-[89%] h-[100%] ml-[-5px] pl-[5px]  pt-[3%]">
                    {" "}
                    {pass}{" "}
                  </h1>
                )}
                <div className="border-l border-green w-[10%] h-[34px] mt-[1.5%]">
                  <img
                    src="/Lapis.png"
                    alt=""
                    className=" w-[18px] h-[19px] ml-[10px] mt-[6px]"
                    onClick={handleEditartrue}
                  />
                </div>
              </div>
            </div>
            {editarNome === true ||
            editarPassword === true ||
            editarPasswordVer === true ? (
              <div className="mb-30 ">
                <h1 className="font-black text-[12px]">Confirmar senha:</h1>
                <input
                  id="nome"
                  className="border-2 border-green rounded-[5px] w-[380px] h-[51px] mb-[30px] pl-[5px]"
                  placeholder={passVer}
                  onChange={(event) => handleChange(event, setPassVer)}
                />
                <button className="border-2 border-black rounded-[9px] bg-[#1E7B71] mb-[10px] font-black text-white h-[31px] w-[380px]"
                type="submit"
                >
                  Salvar
                </button>
                <button
                  className="border-2 border-black rounded-[9px] bg-[#1E7B71] mb-[10px] font-black text-white h-[31px] w-[380px]"
                  onClick={handleEditarFalse}

                >
                  Cancelar
                </button>
              </div>
            ) : (
              <button className="border-2 border-black rounded-[9px] bg-[#1E7B71] mb-[10px] font-black text-white h-[31px] w-[380px]">
                Deletar
              </button>
            )}
          </form>
        </div>
      </div>
      <Sidebar />
    </div>
  );
};
