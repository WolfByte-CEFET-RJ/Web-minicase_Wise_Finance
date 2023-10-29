import React, { useState } from "react";
import Form from '../Forms/formDespesasVariaveis'
const ModalDespesasVariaveis = ({ Aberto, Fechado}) => {
    if (!Aberto) return null;
    return ( 
        <div className="w-[100%] h-[100%]  absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white  rounded-[96px]">
            <div className="container-modal">
                <img className='ml-[8%] mt-[5%]' alt="Fechar" src= "X.png"  onClick={Fechado}/>
                <h1 className=" mt-[-3.6%] ml-[30%] text-[50px] font-black text-green">Despesas Variaveis</h1>
                <h1 className=" ml-[34%] text-[10px] font-black text-green">Lembrando que essa é uma despesa variável e será apagada após um mês</h1>
                <Form/>
            </div>
        </div>
    )
}

export default ModalDespesasVariaveis