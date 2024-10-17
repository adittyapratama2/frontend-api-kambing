import React from "react";
import { useParams } from "react-router-dom";

const InputDataKambing = () => {
  const { id } = useParams(); // Get the id from the URL parameters

  return (
    <div className="min-h-screen p-4 bg-gray-200">
      <h1 className="text-xl font-bold">Input Data for Kambing ID: {id}</h1>
      {/* Your form or input logic goes here */}
    </div>
  );
};

export default InputDataKambing;
