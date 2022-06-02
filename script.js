var firstNumber = null;
var secondNumber = null;
var result = null;
var operation = null;

window.onload = function () {
  update();
};

function handleClick(event) {
  //   console.log(event);
  console.log(event.target.dataset.number);
  console.log("firstNumber", firstNumber);
  console.log("secondNumber", secondNumber);
  console.log("operation", operation);
}

function printState() {
  console.log("firstNumber", firstNumber);
  console.log("secondNumber", secondNumber);
  console.log("operation", operation);
  console.log("result", result);
}

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

function reset() {
  firstNumber = null;
  secondNumber = null;
  result = null;
  operation = null;
  update();
  printState();
}
