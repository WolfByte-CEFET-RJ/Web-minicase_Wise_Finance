import React, {useState} from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useApi from "../hooks/useApi";
import Sidebar from '../components/componentsHome/Sidebar'

const Perfil = () => {
  const [name, setName] = useState("Lucas Teixeira dos Santos");
  const [email, setEmail] = useState("lucast.santos2003@gmail.com");
  const [userName, setUserName] = useState("lucast.santos2003@gmail.com");
  const [pass, setPass] = useState("lucast.santos2003@gmail.com");
  const [passVer, setPassVer] = useState("lucast.santos2003@gmail.com");
  const handlePasswordToggle = () => {
    setShowPassword(!showPassword);
  };
  const handlePasswordVerToggle = () => {
    setShowPasswordVer(!showPasswordVer);
  };

  const handleChange = (event, setText) => {
    setText(event.target.value);
  };
  return (
    <div className = "h-screen bg-no-repeat bg-cover relative " style = {{backgroundImage:"url(/Fundo.svg)"}}>
      <div className=" w-[70%] h-[70%] ml-[1%] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white  rounded-[96px]">
        <div className="flex flex-row h-[100%] w-[100%]">
          <div className="flex flex-col h-[100%] w-[50%] mt-[12%] mb-[12%]">
            <img src={`https://avatar.uimaterial.com/?setId=HovCX3s7UOrjv7DekigX&name=${name}&size=256`} alt="" className="ml-auto mr-auto w-[256px] h-[256px]" />
            <h1 className="pt-3 w-[50%] h-[7%] border-2 border-green rounded-[9px] ml-auto mr-auto mt-[5%] pb-[10px] pl-[7%] font-black">{name}</h1>
            <h1 className="pt-3 w-[50%] h-[7%] border-2 border-green rounded-[9px] ml-auto mr-auto mt-[2%] pb-[10px] pl-[4%] font-black">{email}</h1>
          </div>
          <form action="" className="flex flex-col h-[100%] w-[50%] mt-[12%] mb-[12%]">
            <div>
              <label className = "text-black">R$</label>
              <input
              className="pt-3 w-[50%] h-[7%] border-2 border-green rounded-[9px] ml-auto mr-auto mt-[5%] pb-[10px] pl-[1%] font-black"
              type="text"
              name="name"
              id="name"
              placeholder={userName}
              onChange={(event) => handleChange(event, setUserName)}
              />
            </div>
          <input
          className="pt-3 w-[50%] h-[7%] border-2 border-green rounded-[9px] ml-auto mr-auto mt-[5%] pb-[10px] pl-[1%] font-black"
          type="text"
          name="name"
          id="name"
          placeholder={pass}
          onChange={(event) => handleChange(event, setPass)}
          />
          <input
          className="pt-3 w-[50%] h-[7%] border-2 border-green rounded-[9px] ml-auto mr-auto mt-[5%] pb-[10px] pl-[1%] font-black"
          type="text"
          name="name"
          id="name"
          placeholder={passVer}
          onChange={(event) => handleChange(event, setPassVer)}
          />
          <button className=""></button>
          <button className=""></button>
          </form>
        </div>
      </div>
      <Sidebar/>
    </div>
  );
}

export default Perfil;