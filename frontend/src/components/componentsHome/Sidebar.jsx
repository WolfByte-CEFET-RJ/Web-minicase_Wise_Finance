import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
function Sidebar (){
    const [expandir, setExpandir] = useState(false);
    const navigate = useNavigate();
    const  handleMouseEnter = () =>{
        setExpandir(true);
    } 
    const  handleMouseLeave = () =>{
        setExpandir(false);
    }       

    return (
      <div
          className={`w-20 h-screen font-black text-white transition-[width] duration-[0.1s] ease-[ease] p-5
          ${expandir ? 
            'w-[284px] bg-[#0b564f] ' : 
            ' bg-[#1E7B71]'}`}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
      >
            <div className= "flex">
              <div className="flex items-center justify-center  " >
                  <img className= "mt-[-5%] w-[33px] h-[32px] mr-[30%] ml-[30%]  " alt="ramoLogo" src= "/android-chrome-192x192.png"/>
              </div>
   
              {expandir && <div className="text-[12px] ml-[85px] mt-[6px] fixed">Wise Finance</div>}

            </div>

              <button 
              onClick={() =>navigate("/home")}
              >
                <div className="flex items-center justify-center fixed  mt-[3%] ml-[0.35%]  " >
                    <img className= "mt-[-5%] w-[20px] h-[20px] mr-[30%] ml-[30%]  " alt="SimboloDashBoard" src= "/DashBoard.png"/>
                </div>
                {expandir && <div className='text-[12px] ml-[87px]  fixed  mt-[3%]' > Dashboard </div>}
              </button>

              <button 
              onClick={() =>navigate("/perfil")}
              >
                <div className="flex items-center justify-center fixed  mt-[6%] ml-[0.35%]  " >
                    <img className= "mt-[-5%] w-[20px] h-[20px] mr-[30%] ml-[30%]  " alt="SimboloPerfil" src= "/Perfil.png"/>
                </div>
                {expandir && <div className='text-[12px] ml-[87px]  fixed  mt-[6%]' > Perfil </div>}
              </button>

              <button 
              // onClick={}
              >
                <div className="flex items-center justify-center fixed  mt-[9%] ml-[0.35%]  " >
                    <img className= "mt-[-5%] w-[20px] h-[20px] mr-[30%] ml-[30%]  " alt="SimboloBaixar" src= "/Baixar.png"/>
                </div>
                {expandir && <div className='text-[12px] ml-[87px]  fixed  mt-[9%]' > Baixar Relatório </div>}
              </button>

              <button
              // onClick={}
              >
                <div className="flex items-center justify-center fixed  mt-[44%] ml-[0.35%]  " >
                    <img className= "mt-[-5%] w-[20px] h-[20px] mr-[30%] ml-[30%]  " alt="SimboloLogout" src= "/logout.png"/>
                </div>
                {expandir && <div className='text-[12px] ml-[87px]  fixed  mt-[44%]' > Logout </div>}
              </button>
        </div>
      );
}

export default Sidebar