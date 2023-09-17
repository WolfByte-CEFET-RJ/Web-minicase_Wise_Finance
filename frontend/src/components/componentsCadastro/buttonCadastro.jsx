import React from "react";

const button = ({type, onClick, Text}) => {
    
    return(
        <button type = {type} onClick = {onClick} className=" w-[100%] h-[100%] mt-[15px] border-2 border-2 border-black rounded-[9px] bg-green text-[#FFF] font-black ">
        {Text}
        </button>    
    ) 
};

export default button;