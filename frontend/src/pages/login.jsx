import React from "react";
import Form from "../components/Forms/formLogin"

const Login = () => {
  return (
<div className="border-4 border-[black] h-screen w-screen" >
      <div className = " fixed w-[50%] h-screen bg-no-repeat bg-cover flex items-center	justify-center flex-col" style = {{backgroundImage:"url(/Fundo.svg)"}}>
          <img className="mt-[-5%] " src= "/android-chrome-192x192.png" />
          <h1 className="mt-[10%] font-black text-[white] text-[48px]">Wise Finance</h1>
      </div>
      <div className=" mt-[10%] ml-[60%] w-[30%]">
        <Form/>
      </div>
</div>
  );
}

export default Login;