import { useState } from "react";
import { FaCopy } from "react-icons/fa";
import { copyToClipboard, downloadCSV } from "../../utils";

const NumberGenerator: React.FC = () => {
  const [range, setRange] = useState({ min: 0, max: 100 });
  const [count, setCount] = useState(1);
  const [numbers, setNumbers] = useState<number[]>([]);
  const [isGenerated, setIsGenerated] = useState(false);
  const [isUnique, setIsUnique] = useState(false);
  const [isEven, setIsEven] = useState(false);
  const [exclude, setExclude] = useState<string>("");
  const [isPrime, setIsPrime] = useState(false);

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
    } else if (name === "isPrime") {
      setIsPrime(checked);
    }
  };

  const handleExcludeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setExclude(e.target.value);
  };

  const isPrimeNumber = (num: number) => {
    for (let i = 2, sqrt = Math.sqrt(num); i <= sqrt; i++) {
      if (num % i === 0) return false;
    }
    return num > 1;
  };

  const generateRandomNumbers = () => {
    const { min, max } = range;
    let generatedNumbers: number[] = [];
    const excludeNumbers = exclude.split(",").map(Number);

    while (generatedNumbers.length < count) {
      let randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;

      if (isEven && randomNumber % 2 !== 0) continue;
      if (isPrime && !isPrimeNumber(randomNumber)) continue;
      if (isUnique && generatedNumbers.includes(randomNumber)) continue;
      if (excludeNumbers.includes(randomNumber)) continue;

      generatedNumbers.push(randomNumber);
    }

    setNumbers(generatedNumbers);
    setIsGenerated(true);
  };

  return (
    <div>
      <h1 className="text-xl text-center font-bold text-black/80">
        Generator of random numbers
      </h1>
      <div className="text-black flex flex-col items-start justify-start mt-4 space-y-4">
        <div className="w-full flex items-center justify-between">
          <div className="w-full flex flex-col items-center justify-center">
            <label className="text-lg text-black mb-4">Min range value:</label>
            <input
              className="w-32 border border-gray-500 rounded-full py-1 px-8 text-center"
              type="number"
              name="min"
              value={range.min}
              onChange={handleRangeChange}
            />
          </div>
          <div className="w-full flex flex-col items-center justify-center">
            <label className="text-lg text-black mb-4">Max range value:</label>
            <input
              className="w-32 border border-gray-500 rounded-full py-1 px-8 text-center"
              type="number"
              name="max"
              value={range.max}
              onChange={handleRangeChange}
            />
          </div>
        </div>
        <div className="flex items-center justify-start space-x-4">
          <div className="flex flex-col items-start justify-start">
            <label className="mb-2">Unique numbers only:</label>
            <input
              className="border border-gray-200 "
              type="checkbox"
              name="isUnique"
              checked={isUnique}
              onChange={handleCheckboxChange}
            />
          </div>
          <div className="flex flex-col items-start justify-start">
            <label className="mb-2">Even numbers only: </label>
            <input
              className="border border-gray-200 rounded-md"
              type="checkbox"
              name="isEven"
              checked={isEven}
              onChange={handleCheckboxChange}
            />
          </div>
          <div className="flex flex-col items-start justify-start">
            <label className="mb-2">Prime numbers only:</label>
            <input
              className="border border-gray-200 rounded-md"
              type="checkbox"
              name="isPrime"
              checked={isPrime}
              onChange={handleCheckboxChange}
            />
          </div>
        </div>
        <div className="flex items-center justify-center">
          <label className="mb-2">Count of numbers:</label>
          <input
            className="ml-2 border border-gray-200 rounded-md"
            type="number"
            value={count}
            onChange={handleCountChange}
          />
        </div>
        <div className="w-full flex flex-col items-start justify-start ">
          <label className="mb-2">Exclude numbers (comma separated):</label>
          <input
            className="w-full border border-gray-200 rounded-md"
            type="text"
            value={exclude}
            onChange={handleExcludeChange}
          />
        </div>
        <button
          className="bg-blue-400 px-8 py-2 text-white rounded-md"
          onClick={generateRandomNumbers}
        >
          Generate
        </button>
        {isGenerated && (
          <div className="w-full h-full ">
            <div className="flex items-start justify-between mb-4 ">
              <h2 className="text-lg font-medium">Generated numbers:</h2>
              <div className="flex items-center justify-start space-x-2">
                <button
                  className="bg-blue-400 px-4 py-1 text-white rounded-md flex items-center justify-center mr-2"
                  onClick={() => copyToClipboard(numbers)}
                >
                  <FaCopy className="mr-2" /> Copy
                </button>
                <button
                  className="bg-blue-400 px-4 py-1 text-white rounded-md flex items-center justify-center"
                  onClick={() => downloadCSV(numbers)}
                >
                  Download CSV
                </button>
              </div>
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
  );
};

export default NumberGenerator;
