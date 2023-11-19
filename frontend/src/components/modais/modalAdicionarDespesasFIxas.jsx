import React, { useState } from "react";
import Form from '../Forms/formDespesasFixas'
const ModalDespesasFixas = ({ Aberto, Fechado}) => {

    if (!Aberto) return null;
    return ( 
        <div className="w-[100.2%] h-[100.1%]  absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[rgba(0,0,0,0.7)]  rounded-[96px]">
            <div className="w-[70%] h-[100%]  absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white  rounded-[96px]">
                <div className="container-modal">
                    <img className='ml-[8%] mt-[5%]' alt="Fechar" src= "X.png"  onClick={Fechado}/>
                    <h1 className=" mt-[-3.6%] ml-[28%] text-[50px] font-black text-green">Despesas Fixas</h1>
                    <h1 className=" ml-[31.5%] text-[10px] font-black text-green">Lembrando que essa é uma despesa fixa e se manterá todo mês</h1>
                    <Form/>
                </div>
            </div>
        </div>
    )
}

export default ModalDespesasFixas