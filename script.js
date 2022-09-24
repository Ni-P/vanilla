// the state variables of the app
var firstNumber = null;
var operation = null;
var secondNumber = null;
var result = null;

// for loading initial results from localstorage
const results = [];

// the id of each calculation. gets incremented by 1
var id = 0;

// set a flag to activate the results table
const useResultsFeature = true;

/**
 * this function get called when the window has finished loading the page
 */
window.onload = function () {
  if (useResultsFeature) {
    id = results.push(...loadFromLocalStorage());
    results.forEach((res) => {
      addResultToTable(res);
    });
  }
  update();
};

/**
 * print state to console for debugging
 */
function printState() {
  const output = {
    firstNumber,
    secondNumber,
    operation,
    result,
  };
  //   console.log("firstNumber", firstNumber);
  //   console.log("secondNumber", secondNumber);
  //   console.log("operation", operation);
  //   console.log("result", result);
  console.log(output);
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
    let firstStr = `${event.target.dataset.number}`;
    firstNumber = parseInt(firstStr);
    secondNumber = null;
    operation = null;
    result = null;
  } else if (operation) {
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
    const resultObject = {
      id: ++id,
      result,
      left: firstNumber,
      right: secondNumber,
      operation,
    };
    if (useResultsFeature) {
      addResultToTable(resultObject);
      saveToLocalStorage(resultObject);
    }
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

function addResultToTable(resultObj) {
  const { left, right, operation, result, id } = resultObj;

  const table = document.querySelector("#results-table tbody");

  const tr = document.createElement("tr");

  const tdId = document.createElement("th");
  tdId.innerHTML = id;

  const tdLeft = document.createElement("td");
  tdLeft.innerHTML = left;

  const tdRight = document.createElement("td");
  tdRight.innerHTML = right;

  const tdOperation = document.createElement("td");
  tdOperation.innerHTML = operation;

  const tdResult = document.createElement("td");
  tdResult.innerHTML = result;

  tr.appendChild(tdId);
  tr.appendChild(tdLeft);
  tr.appendChild(tdOperation);
  tr.appendChild(tdRight);
  tr.appendChild(tdResult);

  table.appendChild(tr);

  // console.log(tr);
}

function clearTableContents() {
  const table = document.querySelector("#results-table tbody");
  table.innerHTML = "";
}

function saveToLocalStorage(resultObj) {
  try {
    window.localStorage.setItem(`${id}`, JSON.stringify(resultObj));
    window.localStorage.setItem("id", id);
    return true;
  } catch (e) {
    console.error(e);
    return false;
  }
}

function loadFromLocalStorage() {
  const count = parseInt(window.localStorage.getItem("id"));
  const loadedResults = [];
  for (let i = 0; i < count; i++) {
    const resultObj = window.localStorage.getItem(`${i + 1}`);
    console.log("loaded", resultObj);
    if (resultObj) {
      loadedResults.push(JSON.parse(resultObj));
      id++;
    }
  }
  console.log("total", loadedResults.length);
  return loadedResults;
}

function clearLocalStorage() {
  const count = parseInt(window.localStorage.getItem("id"));
  for (let i = 0; i < count; i++) {
    window.localStorage.removeItem(`${i + 1}`);
  }
  window.localStorage.removeItem("id");
  clearTableContents();
}

// * FEATURE: add backspace button for fixing mistakes
// * ...

// * FEATURE: chain calculations by clicking an operation button instead of using '='
// * ...

// * FEATURE: Add support for floating point calculations
// * ...

// * FEATURE: Remove latest result
function deleteLastResult() {
  // remove from app state
  // remove from table
  // remove from localstorage
}

// * FEATURE: save/load results in a server
async function loadFromServer() {}
async function saveToServer(resultObj) {}
async function deleteFromServer(id) {}
