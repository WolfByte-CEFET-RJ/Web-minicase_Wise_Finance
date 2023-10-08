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
            <div className="flex items-center">
                <img className= "mt-[-5%] w-[33px] h-[32px] " alt="ramoLogo" src= "/android-chrome-192x192.png"/>
                <h1 className='text-[12px]' > Wise Finance </h1>
            </div>
        </div>
      );
}

export default Sidebar