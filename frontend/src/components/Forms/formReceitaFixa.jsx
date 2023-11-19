const formReceitaFixa = ({}) =>{
    return (
        <div>
            <form className="flex flex-col items-center text-[15px]">
                <div className="mb-30 mt-[20px]">
                    <h1 className ="text-black" >Nome Receita:</h1>
                    <input
                        id="nome"
                        className="border border-black rounded-[5px] w-[380px] h-[40px] mb-[30px] pl-[5px]"
                        placeholder="Digite o nome"
                    />
                </div>
                <div className="mb-30">
                    <h1 className ="text-black" >Descrição Receita:</h1>
                    <textarea
                        id="detalhes"
                        className="border border-black rounded-[5px] w-[380px] h-[150px] mb-[30px] pl-[5px] pt-[5px]"
                        placeholder="Detalhes da despesa"
                    />
                </div>
                <div className="mb-30 ml-[-2%]">
                    <h1 className ="text-black ml-[5%]" >Valor Receita:</h1>                    
                    <label className = "text-black">R$</label>
                    <input
                        id="valor"
                        className="border border-black rounded-[5px] w-[380px] mb-[30px] h-[40px] pl-[5px]"
                        placeholder="Digite o valor"
                    />
                </div>
                <button className="border border-black rounded-[9px] bg-[#1E7B71] mb-[10px] text-white h-[31px] w-[380px]">
                    Salvar
                </button>
                <button className="border border-black rounded-[9px] bg-[#1E7B71] mb-[10px] text-white h-[31px] w-[380px]">
                    Cancelar
                </button>
            </form>
        </div>
    );
}

export default formReceitaFixa