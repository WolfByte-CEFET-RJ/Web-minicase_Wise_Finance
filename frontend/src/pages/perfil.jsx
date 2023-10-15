import React from "react";
import Sidebar from '../components/componentsHome/Sidebar'
const Perfil = () => {
  return (
    <div className = "h-screen bg-no-repeat bg-cover relative " style = {{backgroundImage:"url(/Fundo.svg)"}}>
      <Sidebar/>
    </div>
  );
}

export default Perfil;