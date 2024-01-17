import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useApi from "../hooks/useApi";
import { AuthContext } from "./auth";

const Sidebar = () => {
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1; // Months are zero-based, so add 1
  const currentYear = currentDate.getFullYear();
  const { token } = useContext(AuthContext);
  const [expandir, setExpandir] = useState(false);
  const [urlRelatorio, setUrlRelatorio] = useState("");
  const [larguraDaTela, setLarguraDaTela] = useState(window.innerWidth);
  const [aberto, setAberto] = useState(false);
  const atualizarLarguraDaTela = () => {
    setLarguraDaTela(window.innerWidth);
  };
  const navigate = useNavigate();
  const api = useApi();


  useEffect(() => {
    window.addEventListener('resize', atualizarLarguraDaTela);

    return () => {
      window.removeEventListener('resize', atualizarLarguraDaTela);
    };
  }, []);

  const abrirMenu = () => {
    setAberto(!aberto);
  };


  const handleMouseEnter = () => {
    setExpandir(true);
  };
  const handleMouseLeave = () => {
    setExpandir(false);
  };
  async function logout() {
    try {
      const response = await api.post(
        "http://localhost:5000/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (response.data.status === false) {
        toast.error("Ocorreu um erro ao realizar o logout");
      } else if (response.data.status === true) {
        toast.success("Logout bem-sucedido");
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      toast.error("Falha ao realizar o logout");
    }
  }

  async function gerarRelatorio() {
    try {
      const response = await api.get(
        `http://localhost:5000/relatorio/${currentMonth}/${currentYear}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        },
      );

      console.log("Resposta da API:", response);

      
      const filePath = response.data.Link_Relatorio;

     
      navigate(`/relatorio/${filePath}`);

      
    } catch (error) {
      console.error(error);
      toast.error("Falha ao baixar relatório");
    }
  }

return (
  <div>
    {larguraDaTela > 700 ? (
      <div
        className={`w-20 h-screen font-black text-white transition-[width] duration-[0.1s] ease-[ease] p-5
            ${expandir ? "w-[284px] bg-[#0b564f] " : " bg-[#1E7B71]"} flex flex-col items-center`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="flex items-center mb-8">
          <img
            className="w-[33px] h-[32px] mx-auto"
            alt="ramoLogo"
            src="/android-chrome-192x192.png"
          />
          {expandir && <div className="text-xs ml-2">Wise Finance</div>}
        </div>

        <button onClick={() => navigate("/home")} className="mb-8">
          <div className="flex items-center justify-center">
            <img
              className="w-[20px] h-[20px] mx-auto"
              alt="SimboloDashBoard"
              src="/DashBoard.png"
            />
            {expandir && <div className="text-xs ml-2">Dashboard</div>}
          </div>
        </button>

        <button onClick={() => navigate("/perfil")} className="mb-8">
          <div className="flex items-center justify-center">
            <img
              className="w-[20px] h-[20px] mx-auto"
              alt="SimboloPerfil"
              src="/Perfil.png"
            />
            {expandir && <div className="text-xs ml-2">Perfil</div>}
          </div>
        </button>

        <button onClick={gerarRelatorio} className="mb-8">
          <div className="flex items-center justify-center">
            <img
              className="w-[20px] h-[20px] mx-auto"
              alt="SimboloBaixar"
              src="/Baixar.png"
            />
            {expandir && <div className="text-xs ml-2">Baixar Relatório</div>}
          </div>
        </button>

        <button onClick={logout} className="mt-auto mb-8">
          <div className="flex items-center justify-center">
            <img
              className="w-[20px] h-[20px] mx-auto"
              alt="SimboloLogout"
              src="/logout.png"
            />
            {expandir && <div className="text-xs ml-2">Logout</div>}
          </div>
        </button>
      </div>
      ):(
        <div className="painel-body">
          <header className="flex items-center justify-between fixed w-full h-[70px] box-border bg-green pl-5 pr-[60px] py-0;">
            <div className="flex items-center justify-center;">
              <img className="w-10 cursor-pointer" src="/android-chrome-192x192.png" alt="logo" />
            </div>

            <button className="w-10 cursor-pointer" onClick={abrirMenu}>
              <img className="w-10 h-35 cursor-pointer" src="/menuHamburguer.png" alt="menuHamburguer" />
            </button>
          </header>

          <div className={`w-full ${aberto ? 'animate-[cascadeAnimation_0.3s_forwards]' : 'hidden'}`}>
            <nav className="absolute flex flex-col items-center w-full h-[calc(100vh_-_70px)] box-border bg-[#3a3939] transition-[1s] mt-[70px] px-[30px] py-0;">
              <div className="flex items-center justify-center w-full box-border border-b-[#747474] border-b border-solid;">
                <img className="w-[30px] h-[30px] mr-5" id="sidebar-userIcon" src="/android-chrome-192x192.png" alt="logo" />
                <h2 className="text-[28px] text-white" id="sidebar-userName">Wise Finance</h2>
              </div>

              <div className="flex flex-col items-center justify-center w-full box-border">
                <div className="w-full">
                  <div>
                    <button className="flex items-center justify-start w-full h-[60px] bg-[#3a3939] transition-[1s] transition-[background-color] cursor-pointer border-[none]" onClick={() =>{navigate("/home"); abrirMenu()}}>
                      <img className="w-[25px] h-[25px] ml-[30%]" id="sidebar-Icon" alt="SimboloDashBoard" src="/DashBoard.png" />  
                      <span className="text-base font-medium transition-all duration-[0.3s] ease-[ease-in-out] text-[rgb(253,253,253)] ml-[10px]" id="sidebar-text">Dashboard</span>
                    </button>
                    <button className="flex items-center justify-start w-full h-[60px] bg-[#3a3939] transition-[1s] transition-[background-color] cursor-pointer border-[none]" onClick={() => {navigate("/perfil"); abrirMenu()}} >
                      <img className="w-[25px] h-[25px] ml-[30%]" id="sidebar-Icon" alt="SimboloPerfil" src="/Perfil.png" />  
                      <span className="text-base font-medium transition-all duration-[0.3s] ease-[ease-in-out] text-[rgb(253,253,253)] ml-[10px]" id="sidebar-text">Perfil</span>
                    </button>
                   
                  </div>
                </div>
              </div>
            </nav>
          </div>
        </div>
      )}
  </div>
  );
};

export default Sidebar;