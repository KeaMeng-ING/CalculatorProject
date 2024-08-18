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
    event.target.style.backgroundColor = "red";
  });
});

function operation() {
  pads.forEach((pad) => {
    pad.addEventListener("click", function (event) {
      const value = event.target.value;
      if (event.target.classList.contains("clear")) {
        currentOperand = "";
        previousOperand = "";
        result = "";
        operator = "";
        display.innerHTML = "0";
        operators.forEach((op) => {
          op.style.backgroundColor = "white";
        });
        return;
      } else if (event.target.classList.contains("dot")) {
        if (currentOperand.includes(".")) return;
        currentOperand += value;
      } else if (event.target.classList.contains("digit")) {
        if (
          currentOperand.includes(".") &&
          currentOperand.split(".")[1].length > 0
        )
          return;
        currentOperand += value;
      } else if (event.target.classList.contains("operator")) {
        if (currentOperand == "" && previousOperand == "") return;
        previousOperand = currentOperand;
        currentOperand = "";
        operator = value;
        return;
      } else if (event.target.classList.contains("equal")) {
        if (currentOperand == "" || previousOperand == "") return;
        result = calculate(currentOperand, previousOperand, operator);
        if (String(result).includes(".")) {
          result = Number.parseFloat(result).toFixed(1);
        }
        currentOperand = result;
        operator = "";
        previousOperand = "";
        operators.forEach((op) => {
          op.style.backgroundColor = "white";
        });
      } else if (event.target.classList.contains("backspace")) {
        currentOperand = currentOperand.slice(0, -1);
      }
      display.innerHTML = currentOperand;
    });
  });
}

function calculate(firstValue, secondValue, operator) {
  let intValue1 = parseFloat(firstValue);
  let intValue2 = parseFloat(secondValue);
  if (operator == "+") {
    return intValue1 + intValue2;
  } else if (operator == "-") {
    return intValue1 - intValue2;
  } else if (operator == "*") {
    return intValue1 * intValue2;
  } else if (operator == "/") {
    return intValue1 / intValue2;
  } else {
    return "Error";
  }
}

operation();
