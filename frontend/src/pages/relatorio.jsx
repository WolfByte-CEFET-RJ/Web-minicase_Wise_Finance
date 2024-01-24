import React from "react";
import { useParams } from "react-router-dom";

const Relatorio = () => {
  const { relatorio } = useParams();

  return (
    <div className="w-full h-full">
      <embed src={relatorio} type="application/pdf"></embed>
    </div>
  );
};

export default Relatorio;
