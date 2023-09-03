import ConjuntoInput from "../componentsCadastro/conjuntosInputs"

import Button from "../componentsCadastro/buttonCadastro"

const FormCadastro = () => {

   
    return(
        <form action="" className="flex justify-items-center flex-col h-[100%] w-[100%]">

        <img src="/userFoto.svg" alt="" className="ml-auto mr-auto w-[174px] h-[171px]" />
        <ConjuntoInput/>
        <Button Text = "Cadastre-se"/>
        <Button Text="Voltar"/>
      </form>

    )
}

export default FormCadastro