import React, { useState } from "react";
import {EyeSlash, Eye } from 'phosphor-react'
import Sidebar from '../components/componentsHome/Sidebar'
const Home = () => {
  const [saldoGeral, setSaldoGeral] = useState("R$1000,00");
  const [showSaldoGeral, setShowSaldoGeral] = useState(false);
  const handleSaldoGeralToggle = () => {
    setShowSaldoGeral(!showSaldoGeral);
  };

  return (
    <div className = "h-screen bg-no-repeat bg-cover relative " style = {{backgroundImage:"url(/Fundo.svg)"}}>
      <div className=" w-[60%] h-[80%] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-4 rounded-[96px]">
          <h1 className="text-[94px] ml-[28%]  font-black text-green">Saldo Geral</h1>
          
          <div className="ml-[36%] mt-[3%] text-[49px] flex items-center font-black ">
                    {showSaldoGeral ? (
                    <div>
                      <p>{saldoGeral}</p>
                      <EyeSlash
                        size={30}
                        weight="duotone"
                        onClick={handleSaldoGeralToggle}
                        className="ml-[110%] mt-[-18%] cursor-pointer"
                      />
                    </div>
                  ) : (
                    <div>
                      <p className="ml-[20%]" >******</p>
                      <Eye
                        size={30}
                        weight="duotone"
                        onClick={handleSaldoGeralToggle}
                        className="ml-[173%] mt-[-28%] cursor-pointer"
                      />
                    </div>
                  )}
          </div>       
      </div>
      <Sidebar/>
    </div>
  );
}

export default Home;