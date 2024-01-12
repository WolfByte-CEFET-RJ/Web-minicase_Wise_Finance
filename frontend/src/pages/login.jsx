import React, { useState, useEffect } from "react";
import { EyeSlash, Eye } from "phosphor-react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useApi from "../hooks/useApi";

const Login = () => {
  const [login, setLogin] = useState("");
  const [pass, setPass] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 800);
  const navigate = useNavigate();
  const api = useApi();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 800);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

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
    <div className="flex flex-col ">
      {isMobile ? (
        <div
          className="w-full min-h-screen bg-no-repeat bg-cover flex items-center justify-center"
          style={{ backgroundImage: "url(/Fundo.svg)" }}
        >
          <form
            className="w-3/4 md:w-1/3 bg-white p-8 rounded-lg shadow-md"
            onSubmit={handleEnvio}
          >
            <img
              src="/android-chrome-192x192.png"
              alt=""
              className="ml-auto mr-auto w-174 h-171"
            />
            <h1 className="mt-[10%] text-[25px] font-black text-green flex items-center justify-center">
                Wise Finance
            </h1>
            <div className="ml-4 mb-4">
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
                <div className="w-full flex justify-between items-center">
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
                      size={20}
                      weight="duotone"
                      onClick={handlePasswordToggle}
                      className="ml-[-90%] h-[98%] mr-[13%] pt-1.5 cursor-pointer"
                    />
                  ) : (
                    <Eye
                      size={20}
                      weight="duotone"
                      onClick={handlePasswordToggle}
                      className="ml-[-90%] h-[98%] mr-[13%] pt-1.5 cursor-pointer"
                    />
                  )}
                </div>
            </div>
            <div className="ml-4">
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
      ) : (
        <div className="flex flex-col md:flex-row min-h-screen">
          <div
            className="w-full md:w-1/2 bg-cover flex items-center justify-center"
            style={{ backgroundImage: "url(/Fundo.svg)" }}
          >
            <div className="text-center">
              <img
                className=" w-[70%] h-[70%] items-center justify-center"
                alt="ramoLogo"
                src="/android-chrome-192x192.png"
              />
              <h1 className="mt-[10%] ml-[-30%] font-black text-white text-5xl">
                Wise Finance
              </h1>
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
                  className="pt-3 w-[100%] h-[46px] border-2 border-green rounded-[9px] pb-[10px] pl-[10px] font-black"
                  type="text"
                  name="login"
                  id="login"
                  placeholder="Digite seu nome de usuário ou E-mail"
                  onChange={(event) => handleChange(event, setLogin)}
                />
                <h1 className="mt-[10px] font-medium">Senha:</h1>
                <div className="w-full flex justify-between items-center">
                  <input
                    className="pt-3 w-[100%] h-[46px] border-2 border-green rounded-[9px] pb-[10px] pl-[10px] font-black"
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
                      className="ml-[-90%] h-[95%] mr-[7%] pt-1.5 cursor-pointer"
                    />
                  ) : (
                    <Eye
                      size={30}
                      weight="duotone"
                      onClick={handlePasswordToggle}
                      className="ml-[-90%] h-[95%] mr-[7%] pt-1.5 cursor-pointer"
                    />
                  )}
                </div>
              </div>
              <div className="ml-[40px]">
                <button
                  className="w-[100%] h-[100%] mt-[15px] border-2 border-2 border-black rounded-[9px] bg-green text-[#FFF] font-black"
                  type="submit"
                >
                  Entrar
                </button>
                <button
                  className=" w-[100%] h-[100%] mt-[15px] border-2 border-2 border-black rounded-[9px] bg-green text-[#FFF] font-black"
                  onClick={() => navigate("/cadastro")}
                >
                  Criar Conta
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
