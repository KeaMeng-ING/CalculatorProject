pads = document.querySelectorAll(".pad");
display = document.querySelector(".result");
let currentOperand = "";
let previousOperand = "";
let operator = "";
let result = "";

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
      } else if (event.target.classList.contains("digit")) {
        currentOperand += value;
        display.innerHTML = currentOperand;
        console.log(`Current ${currentOperand}`);
        console.log(`Pre ${previousOperand}`);
      } else if (event.target.classList.contains("operator")) {
        if (currentOperand == "" && previousOperand == "") return;
        previousOperand = currentOperand;
        currentOperand = "";
        operator = value;
        console.log(`Current ${currentOperand}`);
        console.log(`Pre ${previousOperand}`);
      } else if (event.target.classList.contains("equal")) {
        if (currentOperand == "" || previousOperand == "") return;
        result = calculate(currentOperand, previousOperand, operator);
        currentOperand = result;
        display.innerHTML = currentOperand;
        operator = "";
        previousOperand = "";
        console.log(`Current ${currentOperand}`);
        console.log(`Pre ${previousOperand}`);
      }
    });
  });
}

function calculate(firstValue, secondValue, operator) {
  let intValue1 = parseInt(firstValue);
  let intValue2 = parseInt(secondValue);
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
