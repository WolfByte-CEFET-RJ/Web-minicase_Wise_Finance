import React from "react";
import Sidebar from '../components/componentsHome/Sidebar'
const Perfil = () => {
  return (
    <div className = "h-screen bg-no-repeat bg-cover relative " style = {{backgroundImage:"url(/Fundo.svg)"}}>
      <div className=" w-[70%] h-[70%] ml-[1%] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white  rounded-[96px]">
      </div>
      <Sidebar/>
    </div>
  );
}

export default Perfil;