import { useState } from "react";

function App() {
  const [display, setDisplay] = useState("0");
  const [firstNumber, setFirstNumber] = useState(null);
  const [operator, setOperator] = useState(null);
  const [waitingForSecondNumber, setWaitingForSecondNumber] = useState(false);

  const buttons = [
    "7", "8", "9", "÷",
    "4", "5", "6", "×",
    "1", "2", "3", "−",
    "0", "C", "=", "+"
  ];

  const handleNumber = (number) => {
    if (display === "Error") {
      setDisplay(number);
      return;
    }

    if (waitingForSecondNumber) {
      setDisplay(number);
      setWaitingForSecondNumber(false);
    } else {
      setDisplay(display === "0" ? number : display + number);
    }
  };

  const handleOperator = (selectedOperator) => {
    const currentNumber = Number(display);

    setFirstNumber(currentNumber);
    setOperator(selectedOperator);
    setWaitingForSecondNumber(true);
  };

  const calculate = () => {
    if (firstNumber === null || operator === null) {
      return;
    }

    const secondNumber = Number(display);
    let result;

    switch (operator) {
      case "+":
        result = firstNumber + secondNumber;
        break;

      case "−":
        result = firstNumber - secondNumber;
        break;

      case "×":
        result = firstNumber * secondNumber;
        break;

      case "÷":
        if (secondNumber === 0) {
          setDisplay("Error");
          setFirstNumber(null);
          setOperator(null);
          return;
        }

        result = firstNumber / secondNumber;
        break;

      default:
        return;
    }

    setDisplay(String(result));
    setFirstNumber(null);
    setOperator(null);
    setWaitingForSecondNumber(false);
  };

  const handleClear = () => {
    setDisplay("0");
    setFirstNumber(null);
    setOperator(null);
    setWaitingForSecondNumber(false);
  };

  const handleButtonClick = (button) => {
    if (!isNaN(button)) {
      handleNumber(button);
    } else if (["+", "−", "×", "÷"].includes(button)) {
      handleOperator(button);
    } else if (button === "=") {
      calculate();
    } else if (button === "C") {
      handleClear();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 flex items-center justify-center p-4">

      <div className="w-full max-w-sm">

        {/* Title */}
        <h1 className="text-4xl font-extrabold text-center text-blue-700 mb-6">
          Calculator
        </h1>

        {/* Calculator */}
        <div className="bg-white rounded-3xl shadow-2xl p-5 border border-white">

          {/* Display */}
          <div className="bg-gradient-to-r from-gray-900 to-gray-700 text-white rounded-2xl p-5 mb-5 text-right shadow-inner">
            <div className="text-4xl font-bold overflow-hidden">
              {display}
            </div>
          </div>

          {/* Buttons */}
          <div className="grid grid-cols-4 gap-3">

            {buttons.map((button) => {

              const isOperator = ["+", "−", "×", "÷"].includes(button);
              const isClear = button === "C";
              const isEquals = button === "=";

              let buttonStyle =
                "bg-blue-100 text-blue-800 hover:bg-blue-200";

              if (isOperator) {
                buttonStyle =
                  "bg-purple-500 text-white hover:bg-purple-600";
              }

              if (isClear) {
                buttonStyle =
                  "bg-red-500 text-white hover:bg-red-600";
              }

              if (isEquals) {
                buttonStyle =
                  "bg-green-500 text-white hover:bg-green-600";
              }

              return (
                <button
                  key={button}
                  onClick={() => handleButtonClick(button)}
                  className={`h-16 rounded-2xl text-xl font-bold shadow-md ${buttonStyle} active:scale-95 transition`}
                >
                  {button}
                </button>
              );
            })}

          </div>

        </div>

        {/* User Guide */}
        <div className="bg-white rounded-3xl shadow-xl p-5 mt-5">

          <h2 className="text-xl font-bold text-blue-700 mb-3">
            How to Use
          </h2>

          <ol className="list-decimal list-inside space-y-2 text-gray-700">
            <li>Click a number to enter a value.</li>
            <li>Select an operator such as +, −, ×, or ÷.</li>
            <li>Enter the second number.</li>
            <li>Click = to calculate the result.</li>
            <li>Click C to clear and reset the calculator.</li>
          </ol>

          <h2 className="text-xl font-bold text-purple-700 mt-5 mb-3">
            Supported Operations
          </h2>

          <div className="space-y-2 text-gray-700">
            <p>
              <strong className="text-purple-600">+</strong> Addition
            </p>

            <p>
              <strong className="text-purple-600">−</strong> Subtraction
            </p>

            <p>
              <strong className="text-purple-600">×</strong> Multiplication
            </p>

            <p>
              <strong className="text-purple-600">÷</strong> Division
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}

export default App;