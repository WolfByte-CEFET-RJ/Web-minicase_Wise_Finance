import React from "react";

const Botao = ({Text, onClick, Type = "button"}) => {
    return(
        <button
        className = "Botao"
        type ={Type}
        onClick ={onClick}
        >
            {Text}
        </button>    

        
    ) 
};

export default Botao;