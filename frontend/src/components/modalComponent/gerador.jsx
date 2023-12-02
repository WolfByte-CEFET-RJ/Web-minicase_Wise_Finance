import React from "react";

export default function EquipeAccordion({ id, nome, valor }) {
    return(
<div className="text-[15px] mt-[2%] font-black text-green flex items-center">
            <span className="mr-[10%] ml-[10%]">{nome}</span>{" "}
            <span className=" text-[#156808]">{valor}</span>
            <div className="ml-[20%]">
              <button
                className=" mr-5 w-[105px] h-[20px] rounded-[96px] bg-[#1E7B71] text-[10px] font-black text-white border border-black"
                onClick={AbrirModalAdicionarFixas}
              >
                Editar
              </button>
              <button className="w-[105px] h-[20px] rounded-[96px] bg-[#EF0606] text-[10px] font-black text-white border border-black">
                Excluir
              </button>
            </div>
</div>
    );
}