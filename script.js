// the state variables of the app
var firstNumber = null;
var secondNumber = null;
var result = null;
var operation = null;
const results = [];
var id = 0;

/**
 * this function get called when the window has finished loading the page
 */
window.onload = function () {
  id = results.push(...loadFromLocalStorage());
  results.forEach((res) => {
    addResultToTable(res);
  });
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
    addResultToTable(resultObject);
    saveToLocalStorage(resultObject);
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

  const tdId = document.createElement("td");
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

function deleteLastResult() {
  // remove from app state
  // remove from table
  // remove form localstorage
}

// TODO Implement backend connection to store results

async function loadFromServer() {}
async function saveToServer(resultObj) {}
async function deleteFromServer(id) {}
