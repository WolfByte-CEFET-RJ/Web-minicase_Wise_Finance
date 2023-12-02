import React, {useState} from "react";
import {EyeSlash, Eye } from 'phosphor-react'
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useApi from "../hooks/useApi";

const Cadastro = () => {
  const [name, setName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [passVer, setPassVer] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordVer, setShowPasswordVer] = useState(false);
  const navigate = useNavigate();
  const api = useApi();
  async function handleEnvio(event) {
    event.preventDefault();
    const user = {
      nome: name,
      username: userName,
      email: email,
      senha: pass,
      senhaConfirmacao: passVer,
    };
    try {
      const response = await api.post("http://localhost:5000/usuario", user);
      if (response.data.status === false) {
        toast.error(JSON.stringify(response.data.message));
      } else if (response.data.message === "Endereço de e-mail já cadastrado!") {
        toast.error("Endereço de e-mail já cadastrado!");
      }  else if (response.data.message === "Username indisponível!") {
        toast.error("Username indisponível!");
      } else if (response.data.status === true) {
        toast.success("Usuário cadastrado com êxito!");
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      toast.error("Falha no envio do formulário");
    }
  }
  const handlePasswordToggle = () => {
    setShowPassword(!showPassword);
  };
  const handlePasswordVerToggle = () => {
    setShowPasswordVer(!showPasswordVer);
  };
  const handleChange = (event, setText) => {
    setText(event.target.value);
  };
  return (
    <div className = " fixed w-screen h-screen bg-no-repeat bg-cover flex items-center	justify-center flex-col" style = {{backgroundImage:"url(/Fundo.svg)"}}>
      <div className="rounded-[60px] bg-[#FFF] md:h-[800px] md:w-[500px] p-[43px] ">
        <form className="flex justify-items-center flex-col h-[100%] w-[100%]" onSubmit={handleEnvio}>
          {name === "" 
            ? <img src="/ImagemLogin.svg" alt="" className="ml-auto mr-auto w-[174px] h-[171px]" />
            : <img src={`https://avatar.uimaterial.com/?setId=HovCX3s7UOrjv7DekigX&name=${name}`} alt="" className="ml-auto mr-auto w-[174px] h-[171px]" />
          }
          <div className= "mb-[20px]">
            <h1 className="mt-[37px] font-medium">Nome Completo:</h1>
            <input className="pt-3 w-[100%] h-[46px] border-2 border-green rounded-[9px] pb-[10px] pl-[10px] font-black"
            type="text"
            name="name"
            id="name"
            placeholder="Digite seu nome completo"
            onChange={(event) => handleChange(event, setName)}
            />
            <h1 className="mt-[10px] font-medium">Nome de Usuário:</h1>
            <input className="pt-3 w-[100%] h-[46px] border-2 border-green rounded-[9px] pb-[10px] pl-[10px] font-black"
            type="text"
            name="userName"
            id="userName"
            placeholder="Digite seu nome de usuário"
            onChange={(event) => handleChange(event, setUserName)}
            />
            <h1 className="mt-[10px] font-medium">Email:</h1>
            <input className="pt-3 w-[100%] h-[46px] border-2 border-green rounded-[9px] pb-[10px] pl-[10px] font-black"
            type="text"
            name="email"
            id="email"
            placeholder="Digite seu e-mail"
            onChange={(event) => handleChange(event, setEmail)}
            />
            <h1 className="mt-[10px] font-medium">Senha:</h1>
            <div className="w-full flex justify-between items-center;">
              <input className="pt-3 w-[100%] h-[46px] border-2 border-green rounded-[9px] pb-[10px] pl-[10px] font-black"
              type={showPassword ? "text" : "password"}
              name="pass"
              id="pass"
              placeholder="Digite sua senha"
              onChange={(event) => handleChange(event, setPass)}
              />
              {showPassword
                ? <EyeSlash size={30} weight="duotone" onClick={handlePasswordToggle}className="ml-[-90%]  h-[98%] mr-[5%] pt-[2%] cursor-pointer" />
                : <Eye size={30} weight="duotone" onClick={handlePasswordToggle} className="ml-[-90%]  h-[98%] mr-[5%] pt-[2%] cursor-pointer" />
              }
            </div>
            <h1 className="mt-[10px] font-medium">Confirmar Senha:</h1>
            <div className=" w-full flex justify-between items-center;">
              <input className="pt-3 w-[100%] h-[46px] border-2 border-green rounded-[9px] pb-[10px] pl-[10px] font-black"
              type={showPasswordVer ? "text" : "password"}
              name="passVer"
              id="passVer"
              placeholder="Confirme sua senha"
              onChange={(event) => handleChange(event, setPassVer)}
              />
              {showPasswordVer
                ? <EyeSlash size={30} weight="duotone" onClick={handlePasswordVerToggle}className="ml-[-90%]  h-[98%] mr-[5%] pt-[2%] cursor-pointer" />
                : <Eye size={30} weight="duotone" onClick={handlePasswordVerToggle} className="ml-[-90%]  h-[98%] mr-[5%] pt-[2%] cursor-pointer" />
              }
            </div>
          </div>
          <button className="w-[100%] h-[100%] mt-[15px] border-2 border-2 border-black rounded-[9px] bg-green text-[#FFF] font-black" type = "submit">Cadastre-se</button>
          <button className="w-[100%] h-[100%] mt-[15px] border-2 border-2 border-black rounded-[9px] bg-green text-[#FFF] font-black" onClick={() => navigate("/")}>Voltar</button>
        </form>
      </div>
    </div>
  );
}

export default Cadastro;