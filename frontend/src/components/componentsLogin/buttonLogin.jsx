import React from "react";

const button = ({onClick, Text}) => {
    
    return(
        <button onClick = {onClick} className=" w-[90%] h-[100%] mt-[15px] border-2 border-2 border-black rounded-[9px] bg-green text-[#FFF] font-black ">
        {Text}
        </button>    
    ) 
};

export default button;