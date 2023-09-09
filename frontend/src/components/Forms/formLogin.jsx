import Input from "../componentsLogin/inputLogin"
import React, { useState } from "react";
import Button from "../componentsLogin/buttonLogin"
import {EyeSlash, Eye } from 'phosphor-react'


const FormCadastro = () => {
    const [userName, setUserName] = useState("");  
    const [pass, setPass] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const handlePasswordToggle = () => {
      setShowPassword(!showPassword);
    };

    const handleChange = (event, setText) => {
      setText(event.target.value);
    };
   
    return(
        <form action="" className="flex justify-items-center flex-col h-[100%] w-[100%]">

        <img src="/ImagemLogin.svg" alt="" className="ml-auto mr-auto w-[174px] h-[171px]" />
        <div className= "ml-[40px] mb-[20px]">
          <h1 className="mt-[37px] font-medium">Login:</h1>

          <Input
          type="text"
          name="login"
          id="login"
          placeholder="Digite seu nome de usuário ou E-mail"
          onChange={(event) => handleChange(event, setUserName)}
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
          <Button Text = "Entrar"/>
          <Button Text="Criar Conta"/>
        </div>
      </form>

    )
}

export default FormCadastro