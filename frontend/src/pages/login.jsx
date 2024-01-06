import React, { useState } from "react";
import { EyeSlash, Eye } from "phosphor-react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useApi from "../hooks/useApi";

const Login = () => {
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
      identificador: login,
      senha: pass,
    };
    try {
      const response = await api.post("http://localhost:5000/login", user);
      if (response.data.success === false) {
        toast.error("Falha ao realizar o login!");
      }
      if (response.data.message === "Usuário não encontrado") {
        toast.error("Usuário não encontrado!");
      } else if (response.data.message === "Senha inválida") {
        toast.error("Senha inválida!");
      } else if (response.data.success === true) {
        toast.success("Login realizado com sucesso!");
        navigate("/home");
      }
    } catch (error) {
      console.log(error);
      toast.error("Falha ao realizar o login!");
    }
  }
  return (
    <div className="flex flex-col md:flex-row min-h-screen">
          <div className="w-full md:w-1/2 bg-cover flex items-center justify-center" style={{ backgroundImage: "url(/Fundo.svg)" }}>
      <div className="text-center">
        <img className="ml-[10%] mt-[-5%] w-[80%] h-[80%]" alt="ramoLogo" src="/android-chrome-192x192.png" />
        <h1 className="mt-[10%] font-black text-white text-5xl">Wise Finance</h1>
      </div>
    </div>

      <div className=" w-full md:w-1/2 flex items-center justify-center">
        <form
          className="w-full md:w-3/4 lg:w-2/4 xl:w-1/3"
          onSubmit={handleEnvio}
        >
          <img
            src="/ImagemLogin.svg"
            alt=""
            className="ml-auto mr-auto w-[174px] h-[171px]"
          />
          <div className="ml-[40px] mb-[20px]">
            <h1 className="mt-[37px] font-medium">Login:</h1>
            <input
              className="pt-3 w-[90%] h-[46px] border-2 border-green rounded-[9px] pb-[10px] pl-[10px] font-black"
              type="text"
              name="login"
              id="login"
              placeholder="Digite seu nome de usuário ou E-mail"
              onChange={(event) => handleChange(event, setLogin)}
            />
            <h1 className="mt-[10px] font-medium">Senha:</h1>
            <div className="w-full flex justify-between items-center;">
              <input
                className="pt-3 w-[90%] h-[46px] border-2 border-green rounded-[9px] pb-[10px] pl-[10px] font-black"
                type={showPassword ? "text" : "password"}
                name="pass"
                id="pass"
                placeholder="Digite sua senha"
                onChange={(event) => handleChange(event, setPass)}
              />
              {showPassword ? (
                <EyeSlash
                  size={30}
                  weight="duotone"
                  onClick={handlePasswordToggle}
                  className="ml-[-90%]  h-[98%] mr-[13%] pt-[1.5%] cursor-pointer"
                />
              ) : (
                <Eye
                  size={30}
                  weight="duotone"
                  onClick={handlePasswordToggle}
                  className="ml-[-90%]  h-[98%] mr-[13%] pt-[1.5%] cursor-pointer"
                />
              )}
            </div>
          </div>
          <div className="ml-[40px]">
            <button
              className="w-[90%] h-[100%] mt-[15px] border-2 border-2 border-black rounded-[9px] bg-green text-[#FFF] font-black"
              type="submit"
            >
              Entrar
            </button>
            <button
              className=" w-[90%] h-[100%] mt-[15px] border-2 border-2 border-black rounded-[9px] bg-green text-[#FFF] font-black"
              onClick={() => navigate("/cadastro")}
            >
              Criar Conta
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
