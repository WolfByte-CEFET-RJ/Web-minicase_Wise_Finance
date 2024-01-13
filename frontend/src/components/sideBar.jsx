import React, { useState, useContext } from "react";
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
  const navigate = useNavigate();
  const api = useApi();
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
  );
};

export default Sidebar;