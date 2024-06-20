import React from "react";
import NumberGenerator from "../NumberGenerator";

const Generator: React.FC = () => {
  return (
    <section className="w-full sm:w-screen h-full sm:h-screen flex flex-col justify-center items-center bg-blue-500/95">
      <div className="p-4 sm:p-8 bg-white border-gray-300 rounded-md flex flex-col justify-center items-center">
        <NumberGenerator />
      </div>
    </section>
  );
};

export default Generator;
