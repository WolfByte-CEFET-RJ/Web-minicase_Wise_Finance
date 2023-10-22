import Input from "../componentsCadastro/inputCadastro"
import React, {useState} from "react";
import Button from "../componentsCadastro/buttonCadastro"
import {EyeSlash, Eye } from 'phosphor-react'
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useApi from "../../hooks/useApi";


const FormCadastro = () => {
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
          console.log(response.data);
          if (response.data.status === false) {
            toast.error("Falha no envio do formulário");
          }
          if (response.data.message === "Preencha os campos obrigatórios.") {
            toast.error("Preencha os campos obrigatórios!");
          } else if (response.data.message === "Senha muito curta!") {
            toast.error("Senha muito curta!");
          } else if (response.data.message === "As senhas precisam ser iguais.") {
            toast.error("As senhas precisam ser iguais!");
          } else if (response.data.message === "Endereço de e-mail já cadastrado!") {
            toast.error("Endereço de e-mail já cadastrado!");
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
    return(
        <form className="flex justify-items-center flex-col h-[100%] w-[100%]" onSubmit={handleEnvio}>
        {name === "" 
              ? <img src="/ImagemLogin.svg" alt="" className="ml-auto mr-auto w-[174px] h-[171px]" />
              : <img src={`https://avatar.uimaterial.com/?setId=HovCX3s7UOrjv7DekigX&name=${name}`} alt="" className="ml-auto mr-auto w-[174px] h-[171px]" />
          }
        <div className= "mb-[20px]">
          <h1 className="mt-[37px] font-medium">Nome Completo:</h1>

          <Input
          type="text"
          name="name"
          id="name"
          placeholder="Digite seu nome completo"
          onChange={(event) => handleChange(event, setName)}
          />

          <h1 className="mt-[10px] font-medium">Nome de Usuário:</h1>

          <Input
          type="text"
          name="userName"
          id="userName"
          placeholder="Digite seu nome de usuário"
          onChange={(event) => handleChange(event, setUserName)}
          />

          <h1 className="mt-[10px] font-medium">Email:</h1>

          <Input
          type="text"
          name="email"
          id="email"
          placeholder="Digite seu e-mail"
          onChange={(event) => handleChange(event, setEmail)}
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
                  ? <EyeSlash size={30} weight="duotone" onClick={handlePasswordToggle}className="ml-[-90%]  h-[98%] mr-[5%] pt-[2%] cursor-pointer" />
                  : <Eye size={30} weight="duotone" onClick={handlePasswordToggle} className="ml-[-90%]  h-[98%] mr-[5%] pt-[2%] cursor-pointer" />
              }

          </div>
          
          <h1 className="mt-[10px] font-medium">Confirmar Senha:</h1>
          
          <div className=" w-full flex justify-between items-center;">
            <Input
            className = "mb-[100px]"
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
        <Button type = "submit" Text = "Cadastre-se"/>
        <Button onClick={() => navigate("/")} Text="Voltar"/>
      </form>

    )
}

export default FormCadastro;