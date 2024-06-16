import React, { useState } from "react";
import { FaCopy } from "react-icons/fa";

const Generator: React.FC = () => {
  const [range, setRange] = useState({ min: 0, max: 100 });
  const [count, setCount] = useState(1);
  const [numbers, setNumbers] = useState<number[]>([]);
  const [isGenerated, setIsGenerated] = useState(false);
  const [isUnique, setIsUnique] = useState(false);
  const [isEven, setIsEven] = useState(false);

  const handleRangeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRange((prevRange) => ({
      ...prevRange,
      [name]: Number(value),
    }));
  };

  const handleCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCount(Number(e.target.value));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    if (name === "isUnique") {
      setIsUnique(checked);
    } else if (name === "isEven") {
      setIsEven(checked);
    }
  };

  const generateRandomNumbers = () => {
    const { min, max } = range;
    let generatedNumbers: number[] = [];

    while (generatedNumbers.length < count) {
      let randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;

      if (isEven && randomNumber % 2 !== 0) continue;
      if (isUnique && generatedNumbers.includes(randomNumber)) continue;

      generatedNumbers.push(randomNumber);
    }

    setNumbers(generatedNumbers);
    setIsGenerated(true);
  };

  const copyToClipboard = () => {
    const copyText = numbers.join(", ");
    navigator.clipboard.writeText(copyText);
  };

  return (
    <section className="w-screen h-screen flex flex-col justify-center items-center bg-blue-500/95">
      <div className="p-8 bg-white border-gray-300 rounded-md flex flex-col justify-center items-center">
        <h1 className="text-xl font-bold text-black/80">
          Generator of random numbers
        </h1>
        <div className="text-black flex flex-col items-start justify-start mt-4 space-y-4">
          <div className="flex items-center justify-center border border-gray-200 rounded-md">
            <label>
              Min range value:
              <input
                className="ml-2"
                type="number"
                name="min"
                value={range.min}
                onChange={handleRangeChange}
              />
            </label>
          </div>
          <div className="flex items-center justify-center border border-gray-200 rounded-md">
            <label>
              Max range value:
              <input
                className="ml-2"
                type="number"
                name="max"
                value={range.max}
                onChange={handleRangeChange}
              />
            </label>
          </div>
          <div className="flex items-center justify-center border border-gray-200 rounded-md">
            <label>
              Count of numbers:
              <input className="ml-2" type="number" value={count} onChange={handleCountChange} />
            </label>
          </div>
          <div className="flex items-center justify-center border border-gray-200 rounded-md">
            <label>
              Unique numbers only:
              <input
                className="ml-2"
                type="checkbox"
                name="isUnique"
                checked={isUnique}
                onChange={handleCheckboxChange}
              />
            </label>
          </div>
          <div className="flex items-center justify-center border border-gray-200 rounded-md">
            <label>
              Even numbers only:
              <input
                className="ml-2"
                type="checkbox"
                name="isEven"
                checked={isEven}
                onChange={handleCheckboxChange}
              />
            </label>
          </div>
          <button
            className="bg-blue-400 px-8 py-2 text-white rounded-md"
            onClick={generateRandomNumbers}
          >
            Generate
          </button>
          {isGenerated && (
            <div className="w-full h-full ">
              <div className="flex items-start justify-between">
                <h2 className="text-lg font-medium">Generated numbers is: </h2>
                <button
                  className="bg-blue-400 px-4 py-1 text-white rounded-md flex items-center justify-center"
                  onClick={copyToClipboard}
                >
                  <FaCopy className="mr-2" /> Copy
                </button>
              </div>
              <ul className="flex items-start justify-start space-x-4">
                {numbers.map((num, index) => (
                  <li key={index}>{num}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Generator;
