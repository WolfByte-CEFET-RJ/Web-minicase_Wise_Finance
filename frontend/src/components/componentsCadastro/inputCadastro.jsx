import React from "react";

const InputCadastro = ({ type, placeholder, name, onChange }) => {
  return (
    <input
      className="pt-3 w-[100%] h-[46px] border-2 border-green rounded-[9px] pb-[10px] pl-[10px] font-black"
      type={type}
      name={name}
      onChange={onChange}
      placeholder={placeholder}
    />
  );
};

export default InputCadastro;