import React from "react";
import Sidebar from '../components/componentsHome/Sidebar'
const Home = () => {
  return (
    <div className = "h-screen bg-no-repeat bg-cover" style = {{backgroundImage:"url(/Fundo.svg)"}}>
      <Sidebar/>
      
    </div>
  );
}

export default Home;