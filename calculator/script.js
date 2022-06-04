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
  // get a reference to the element we need to access
  const el = document.querySelector("#calculator-screen");

  if (result !== null) {
    // we have a result to print
    el.innerHTML = `${result}`;
  } else if (operation) {
    // we are printing the second number as we type it
    el.innerHTML = `${firstNumber} ${operation} ${
      secondNumber === null ? "" : secondNumber
    }`;
  } else {
    // we are printing the first number as we type it
    el.innerHTML = `${firstNumber || 0}`;
  }
}

/**
 * Click event handler.
 * Adds the next digit to the calculator.
 * @param {MouseEvent} event
 */
function insertNumber(event) {
  // insert a digit to the current number we are inputting

  printState();
  update();
}

/**
 * Click event handler.
 * Sets the mathematical operation.
 * @param {MouseEvent} event
 */
function setOperation(event) {
  // set the operation we are inputting


  printState();
  update();
}

/**
 * Performs the calculation.
 */
function calculate() {
  // do a calculation depending on the operation selected  

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
