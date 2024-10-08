let pads = document.querySelectorAll(".pad");
let display = document.querySelector(".result");
let operators = document.querySelectorAll(".operator");
let currentOperand = "";
let previousOperand = "";
let operator = "";
let result = "";

operators.forEach((operator) => {
  operator.addEventListener("click", function (event) {
    if (currentOperand == "" && previousOperand == "") return;
    operators.forEach((op) => {
      op.style.backgroundColor = "";
    });
    // Change background color for the clicked operator
    event.target.style.backgroundColor = "#6bceb7";
  });
});

function operation() {
  pads.forEach((pad) => {
    pad.addEventListener("click", function (event) {
      const value = event.target.value;

      if (event.target.classList.contains("clear")) {
        clear();
        return;
      } else if (event.target.classList.contains("dot")) {
        if (currentOperand.includes(".")) return;
        currentOperand += value;
      } else if (event.target.classList.contains("digit")) {
        if (
          (currentOperand.includes(".") &&
            currentOperand.split(".")[1].length > 0) ||
          currentOperand.length > 10
        )
          return;
        currentOperand += value;
      } else if (event.target.classList.contains("operator")) {
        operatorFunc(value);
        return;
      } else if (event.target.classList.contains("equal")) {
        equalFunc();
      } else if (event.target.classList.contains("backspace")) {
        currentOperand = currentOperand.slice(0, -1);
      }
      display.innerHTML = currentOperand;
    });
  });
}

let digitsKey = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];
let operatorsKey = ["+", "-", "*", "/"];

document.addEventListener("keydown", (event) => {
  const value = event.key;
  console.log(value);
  if (digitsKey.includes(value)) {
    if (
      (currentOperand.includes(".") &&
        currentOperand.split(".")[1].length > 0) ||
      currentOperand.length > 10
    )
      return;
    currentOperand += value;
  } else if (operatorsKey.includes(value)) {
    const operatorButton = Array.from(operators).find(
      (op) => op.value === event.key
    );
    if (operatorButton) {
      if (currentOperand == "" && previousOperand == "") return;
      operators.forEach((op) => {
        op.style.backgroundColor = "";
      });
      operatorButton.style.backgroundColor = "#6bceb7";
    }
    console.log(
      `currentOperand ${currentOperand}, previousOperand ${previousOperand}`
    );
    operatorFunc(value);
    console.log(
      `currentOperand ${currentOperand}, previousOperand ${previousOperand}`
    );

    return;
  } else if (value == ".") {
    if (currentOperand.includes(".")) return;
    currentOperand += value;
  } else if (value == "Enter") {
    equalFunc();
  } else if (value == "Backspace") {
    if (currentOperand == "") {
      clear();
      return;
    }
    currentOperand = currentOperand.slice(0, -1);
  }
  display.innerHTML = currentOperand;
});

function operatorFunc(val) {
  if (currentOperand == "" && previousOperand == "") return;
  previousOperand = currentOperand;
  currentOperand = "";
  operator = val;
}

function equalFunc() {
  if (currentOperand == "" || previousOperand == "") return;
  result = calculate(currentOperand, previousOperand, operator);
  if (String(result).includes(".")) {
    result = Number.parseFloat(result).toFixed(1);
  }
  currentOperand = result;
  operator = "";
  previousOperand = "";
  operators.forEach((op) => {
    op.style.backgroundColor = "";
  });
}

function clear() {
  currentOperand = "";
  previousOperand = "";
  result = "";
  operator = "";
  display.innerHTML = "0";
  operators.forEach((op) => {
    op.style.backgroundColor = "";
  });
}

function calculate(firstValue, secondValue, operator) {
  let intValue1 = parseFloat(firstValue);
  let intValue2 = parseFloat(secondValue);
  if (operator == "+") {
    return intValue1 + intValue2;
  } else if (operator == "-") {
    return intValue2 - intValue1;
  } else if (operator == "*") {
    return intValue2 * intValue1;
  } else if (operator == "/") {
    return intValue2 / intValue1;
  } else {
    return "Error";
  }
}

operation();
