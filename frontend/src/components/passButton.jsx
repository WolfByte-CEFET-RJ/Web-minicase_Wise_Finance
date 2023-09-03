import React from "react";

const passButton = ({Text, onClick, Type = "button"}) => {
    
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

export default passButton;