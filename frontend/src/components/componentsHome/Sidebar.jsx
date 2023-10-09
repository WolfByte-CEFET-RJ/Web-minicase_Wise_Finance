import React, { useState } from 'react';
function Sidebar (){
    const [expandir, setExpandir] = useState(false);

    const  handleMouseEnter = () =>{
        setExpandir(true);
    } 
    const  handleMouseLeave = () =>{
        setExpandir(false);
    }       

    return (
        <div
          className={`w-20 h-screen bg-[#1E7B71] font-black text-white transition-[width] duration-[0.3s] ease-[ease] p-5
          ${expandir ? 
            'w-[284px]' : 
            ''}`}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className= "Container-LogoNome bg-[#000]  ">
            <div className="flex items-center justify-center fixed " >
                <img className= "mt-[-5%] w-[33px] h-[32px] mr-[30%] ml-[30%]  " alt="ramoLogo" src= "/android-chrome-192x192.png"/>
            </div>
            <div className='text-[12px] ml-[85px] mt-[6px] fixed ' > Wise Finance </div>
          </div>

            <button className= "Container-DashBoard bg-[#000]">
              <div className="flex items-center justify-center fixed  mt-[3%] ml-[0.35%]  " >
                  <img className= "mt-[-5%] w-[20px] h-[20px] mr-[30%] ml-[30%]  " alt="ramoLogo" src= "/DashBoard.png"/>
              </div>
              <div className='text-[12px] ml-[87px] mt-[6px] fixed  mt-[3%]  ' > Dashboard </div>
            </button>

            <button className= "Container-Perfil bg-[#000]">
              <div className="flex items-center justify-center fixed  mt-[6%] ml-[0.35%]  " >
                  <img className= "mt-[-5%] w-[20px] h-[20px] mr-[30%] ml-[30%]  " alt="ramoLogo" src= "/Perfil.png"/>
              </div>
              <div className='text-[12px] ml-[87px] mt-[6px] fixed  mt-[6%]  ' > Perfil </div>
            </button>

            <button className= "Container-Baixar bg-[#000]">
              <div className="flex items-center justify-center fixed  mt-[9%] ml-[0.35%]  " >
                  <img className= "mt-[-5%] w-[20px] h-[20px] mr-[30%] ml-[30%]  " alt="ramoLogo" src= "/Baixar.png"/>
              </div>
              <div className='text-[12px] ml-[87px] mt-[6px] fixed  mt-[9%]  ' > Baixar Relatório </div>
            </button>

            <button className= "Container-Logout bg-[#000] ">
              <div className="flex items-center justify-center fixed  mt-[45%] ml-[0.35%]  " >
                  <img className= "mt-[-5%] w-[20px] h-[20px] mr-[30%] ml-[30%]  " alt="ramoLogo" src= "/logout.png"/>
              </div>
              <div className='text-[12px] ml-[87px] mt-[6px] fixed  mt-[45%]  ' > Logout </div>
            </button>
        </div>
      );
}

export default Sidebar