import Input from "../componentsCadastro/inputCadastro" 
import React, { useState } from "react";

const ConjuntoInputs = () => {

    const [name, setName] = useState("");
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const [passVer, setPassVer] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const handlePasswordToggle = () => {
      setShowPassword(!showPassword);
    };

    const handleChange = (event, setText) => {
      setText(event.target.value);
    };


    return (
        <div className = "mb-[20px]">
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

        <Input
            type="text"
            name="pass"
            id="pass"
            placeholder="Digite sua senha"
            onChange={(event) => handleChange(event, setPass)}
            />

        <h1 className="mt-[10px] font-medium">Confirmar Senha:</h1>

        <Input
            className = "mb-[100px]"
            type="text"
            name="passVer"
            id="passVer"
            placeholder="Confirme sua senha"
            onChange={(event) => handleChange(event, setPassVer)}
            />
        </div>        
    )
}

export default ConjuntoInputs