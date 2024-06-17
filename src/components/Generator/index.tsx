import React from "react";
import "react-tabs/style/react-tabs.css";
import NumberGenerator from "../NumberGenerator";

const Generator: React.FC = () => {
  return (
    <section className="w-screen h-screen flex flex-col justify-center items-center bg-blue-500/95">
      <div className="p-8 bg-white border-gray-300 rounded-md flex flex-col justify-center items-center">
        <NumberGenerator />
      </div>
    </section>
  );
};

export default Generator;
