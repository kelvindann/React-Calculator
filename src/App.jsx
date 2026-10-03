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

  // Handle number buttons
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

  // Handle operator buttons
  const handleOperator = (selectedOperator) => {
    const currentNumber = Number(display);

    setFirstNumber(currentNumber);
    setOperator(selectedOperator);
    setWaitingForSecondNumber(true);
  };

  // Calculate result
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

  // Clear calculator
  const handleClear = () => {
    setDisplay("0");
    setFirstNumber(null);
    setOperator(null);
    setWaitingForSecondNumber(false);
  };

  // Handle all buttons
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
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">

      <div className="w-full max-w-sm">

        {/* Title */}
        <h1 className="text-3xl font-bold text-center mb-6">
          Calculator
        </h1>

        {/* Calculator */}
        <div className="bg-white rounded-2xl shadow-lg p-5">

          {/* Display */}
          <div className="bg-gray-900 text-white rounded-xl p-5 mb-4 text-right">
            <div className="text-4xl font-semibold overflow-hidden">
              {display}
            </div>
          </div>

          {/* Calculator Buttons */}
          <div className="grid grid-cols-4 gap-3">
            {buttons.map((button) => (
              <button
                key={button}
                onClick={() => handleButtonClick(button)}
                className="h-16 rounded-xl bg-gray-200 text-xl font-semibold hover:bg-gray-300 active:scale-95 transition"
              >
                {button}
              </button>
            ))}
          </div>

        </div>

        {/* User Guide */}
        <div className="bg-white rounded-2xl shadow-lg p-5 mt-5">

          <h2 className="text-xl font-bold mb-3">
            How to Use
          </h2>

          <ol className="list-decimal list-inside space-y-2 text-gray-700">
            <li>Click a number to enter a value.</li>
            <li>Select an operator such as +, −, ×, or ÷.</li>
            <li>Enter the second number.</li>
            <li>Click = to calculate the result.</li>
            <li>Click C to clear and reset the calculator.</li>
          </ol>

          <h2 className="text-xl font-bold mt-5 mb-3">
            Supported Operations
          </h2>

          <div className="space-y-2 text-gray-700">
            <p>
              <strong>+</strong> Addition
            </p>

            <p>
              <strong>−</strong> Subtraction
            </p>

            <p>
              <strong>×</strong> Multiplication
            </p>

            <p>
              <strong>÷</strong> Division
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}

export default App;