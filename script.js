// the state variables of the app
var firstNumber = null;
var secondNumber = null;
var result = null;
var operation = null;

/**
 * this function get called when the window has finished loading the page
 */
window.onload = function () {
  update();
};

/**
 * print state to console for debugging
 */
function printState() {
  console.log("firstNumber", firstNumber);
  console.log("secondNumber", secondNumber);
  console.log("operation", operation);
  console.log("result", result);
}

/**
 * Update the ui
 */
function update() {
  const el = document.querySelector("#calculator-screen");
  if (firstNumber === null) {
    el.classList.add("blink");
  } else {
    if (el.classList.contains("blink")) {
      el.classList.remove("blink");
    }
  }
  if (result !== null) {
    el.innerHTML = `${result}`;
  } else if (operation) {
    el.innerHTML = `${firstNumber} ${operation} ${
      secondNumber === null ? "" : secondNumber
    }`;
  } else {
    el.innerHTML = `${firstNumber || 0}`;
  }
}

/**
 * Click event handler.
 * Adds the next digit to the calculator.
 * @param {MouseEvent} event
 */
function insertNumber(event) {
  if (result) {
    firstNumber = result;
    secondNumber = null;
    operation = null;
  }
  if (operation) {
    let secondStr = `${secondNumber || ""}${event.target.dataset.number}`;
    secondNumber = parseInt(secondStr);
  } else {
    let firstStr = `${firstNumber ?? ""}${event.target.dataset.number}`;
    firstNumber = parseInt(firstStr);
  }

  printState();
  update();
}

/**
 * Click event handler.
 * Sets the mathematical operation.
 * @param {MouseEvent} event
 */
function setOperation(event) {
  operation = event.target.dataset.operation;
  if (result !== null) {
    firstNumber = result;
    secondNumber = null;
    result = null;
  }
  printState();
  update();
}

/**
 * Performs the calculation.
 */
function calculate() {
  switch (operation) {
    case "+":
      result = firstNumber + secondNumber;
      break;
    case "-":
      result = firstNumber - secondNumber;
      break;
    case "*":
      result = firstNumber * secondNumber;
      break;
    case "/":
      if (secondNumber !== 0) {
        result = firstNumber / secondNumber;
      } else {
        alert("error: cannot divide by zero");
      }
      break;
    default:
      alert("error: invalid operation");
  }
  if (result !== null) {
    update();
  }
  printState();
}

/**
 * Resets the state of the calculator.
 */
function reset() {
  firstNumber = null;
  secondNumber = null;
  result = null;
  operation = null;
  update();
  printState();
}
