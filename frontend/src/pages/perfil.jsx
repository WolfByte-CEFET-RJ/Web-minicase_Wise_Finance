import React, {useState, useContext} from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useApi from "../hooks/useApi";
import Sidebar from '../components/sideBar'
import { AuthContext } from "../components/auth";


const Perfil = () => {
  const { userID, token } = useContext(AuthContext);
  const [name, setName] = useState("Lucas Teixeira dos Santos");
  const [email, setEmail] = useState("lucast.santos2003@gmail.com");
  const [userName, setUserName] = useState("luquinhas");
  const [pass, setPass] = useState("123");
  const [passVer, setPassVer] = useState("123");
  const [editarNome, setEditarNome] = useState(false);
  const [editarPassword, setEditarPassword] = useState(false);
  const [editarPasswordVer, setEditarPasswordVer] = useState(false);
  // const handlePasswordToggle = () => {
  //   setShowPassword(!showPassword);
  // };
  // const handlePasswordVerToggle = () => {
  //   setShowPasswordVer(!showPasswordVer);
  // };
  const handleEditartrue = () => {
    setEditarNome(true);
    setEditarPassword(true);
    setEditarPasswordVer(true);
  }
  const handleEditarFalse = () => {
    setEditarNome(false);
    setEditarPassword(false);
    setEditarPasswordVer(false);
  }
  const handleChange = (event, setText) => {
    setText(event.target.value);
  };
  return (
    <div className = "h-screen bg-no-repeat bg-cover relative " style = {{backgroundImage:"url(/Fundo.svg)"}}>
      <div className=" w-[70%] h-[70%] ml-[1%] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white  rounded-[96px]">
        <div className="flex flex-row h-[100%] w-[100%]">
          <div className="flex flex-col h-[100%] w-[50%] mt-[12%] mb-[12%]">
            <img src={`https://avatar.uimaterial.com/?setId=HovCX3s7UOrjv7DekigX&name=${name}&size=256`} alt="" className="ml-auto mr-auto w-[256px] h-[256px]" />
            <h1 className="pt-3 w-[50%] h-[7%] border-2 border-green rounded-[9px] ml-auto mr-auto mt-[5%] pb-[10px] pl-[12%] font-black text-[12px]">{name}</h1>
            <h1 className="pt-3 w-[50%] h-[7%] border-2 border-green rounded-[9px] ml-auto mr-auto mt-[2%] pb-[10px] pl-[9%] font-black text-[12px]">{email}</h1>
          </div>
          <form action="" className="flex flex-col h-[100%] w-[50%] mt-[12%] mb-[12%]">
            <div className="mb-30  ">
              <h1 className ="font-black text-[12px]" >Nome de Usuário:</h1>
                <div className="border-2 border-green rounded-[5px] w-[380px] h-[51px] mb-[30px] pl-[5px] flex align-itens">
                  {editarPassword === true ?
                  <input
                  id="nome"
                  className="w-[89%] h-[100%] ml-[-5px] pl-[5px]"
                  placeholder={userName}
                  />
                    : <h1  className="w-[89%] h-[100%] ml-[-5px] pl-[5px]  pt-[3%]"> {userName} </h1>
                  }
                  <div className="border-l border-green w-[10%] h-[34px] mt-[1.5%]">
                    <img src="/Lapis.png" alt="" className=" w-[18px] h-[19px] ml-[10px] mt-[6px]" onClick={handleEditartrue} />
                  </div>
                </div>
            </div>
            <div className="mb-30  ">
              <h1 className ="font-black text-[12px]" >Senha:</h1>
              <div className="border-2 border-green rounded-[5px] w-[380px] h-[51px] mb-[30px] pl-[5px] flex align-itens">
                {editarPassword === true ?
                <input
                id="senha"
                className="w-[89%] h-[100%] ml-[-5px] pl-[5px]"
                placeholder={pass}
                />
                  : <h1  className="w-[89%] h-[100%] ml-[-5px] pl-[5px]  pt-[3%]"> {pass} </h1>
                }
                <div className="border-l border-green w-[10%] h-[34px] mt-[1.5%]">
                  <img src="/Lapis.png" alt="" className=" w-[18px] h-[19px] ml-[10px] mt-[6px]" onClick={handleEditartrue} />
                </div>
              </div>
            </div>
            {editarNome === true || editarPassword === true || editarPasswordVer === true ?        
            <div className="mb-30 ">
              <h1 className ="font-black text-[12px]" >Confirmar senha:</h1>
              <input
              id="nome"
              className="border-2 border-green rounded-[5px] w-[380px] h-[51px] mb-[30px] pl-[5px]"
              placeholder={passVer}
              />
              <button className="border-2 border-black rounded-[9px] bg-[#1E7B71] mb-[10px] font-black text-white h-[31px] w-[380px]">Salvar</button> 
              <button className="border-2 border-black rounded-[9px] bg-[#1E7B71] mb-[10px] font-black text-white h-[31px] w-[380px]" onClick={handleEditarFalse}>Cancelar</button> 
            </div> 
              : <button className="border-2 border-black rounded-[9px] bg-[#1E7B71] mb-[10px] font-black text-white h-[31px] w-[380px]">Deletar</button>
            }
          </form>
        </div>
      </div>
      <Sidebar/>
    </div>
  );
}

export default Perfil;