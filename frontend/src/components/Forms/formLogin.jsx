import Input from "../componentsLogin/inputLogin"
import React, { useState } from "react";
import Button from "../componentsLogin/buttonLogin"
import {EyeSlash, Eye } from 'phosphor-react'
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useApi from "../../hooks/useApi";


const FormCadastro = () => {
    const [login, setLogin] = useState("");
    const [pass, setPass] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const api = useApi();
    const handlePasswordToggle = () => {
      setShowPassword(!showPassword);
    };
    const handleChange = (event, setText) => {
      setText(event.target.value);
    };
    async function handleEnvio(event) {
      event.preventDefault();
      const user = {
        login,
        pass
      };
  
      try {
        const response = await api.post("http://localhost:5000/login", user);
        console.log(response.data);
        if (response.data.status.sucess === false) {
          toast.error("Falha ao realizar o login!");
        }
        if (response.data.message === "Usuário não encontrado") {
          toast.error("Usuário não encontrado!");
        } else if (response.data.message === "Senha inválida") {
          toast.error("Senha inválida!");
        } else if (response.data.status === true) {
          toast.success("Login realizado com êxito!");
           navigate("/");
        }
      } catch (error) {
        console.log(error);
        toast.error("Falha ao realizar o login!");
      }
    }
    return(
        <form className="flex justify-items-center flex-col h-[100%] w-[100%] " onSubmit={handleEnvio}>


        <img src="/ImagemLogin.svg" alt="" className="ml-auto mr-auto w-[174px] h-[171px]" />
        <div className= "ml-[40px] mb-[20px]">
          <h1 className="mt-[37px] font-medium">Login:</h1>

          <Input
          type="text"
          name="login"
          id="login"
          placeholder="Digite seu nome de usuário ou E-mail"
          onChange={(event) => handleChange(event, setLogin)}
          />

          <h1 className="mt-[10px] font-medium">Senha:</h1>
          <div className="w-full flex justify-between items-center;">
            <Input
            type={showPassword ? "text" : "password"}
            name="pass"
            id="pass"
            placeholder="Digite sua senha"
            onChange={(event) => handleChange(event, setPass)}
            />
              {showPassword
                  ? <EyeSlash size={30} weight="duotone" onClick={handlePasswordToggle}className="ml-[-90%]  h-[98%] mr-[13%] pt-[1.5%] cursor-pointer" />
                  : <Eye size={30} weight="duotone" onClick={handlePasswordToggle} className="ml-[-90%]  h-[98%] mr-[13%] pt-[1.5%] cursor-pointer" />
              }

          </div>
    
        </div>
        <div className="ml-[40px]">
          <Button type = "submit" Text = "Entrar"/>
          <Button onClick={() => navigate("/cadastro")} Text="Criar Conta"/>
        </div>
      </form>

    )
}

export default FormCadastro;