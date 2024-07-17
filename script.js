let display = document.getElementById('display');
let currentInput = '';

function appendNumber(number) {
  currentInput += number.toString();
  updateDisplay();
}

function appendOperation(operation) {
  const lastChar = currentInput.slice(-1);
  if (['+', '-', '*', '/'].includes(lastChar)) {
    currentInput = currentInput.slice(0, -1) + operation;
  } else {
    currentInput += operation;
  }
  updateDisplay();
}

function calculateResult() {
  try {
    currentInput = eval(currentInput).toString();
  } catch (e) {
    currentInput = 'Error';
  }
  updateDisplay();
}

function clearDisplay() {
  currentInput = '';
  updateDisplay();
}

function updateDisplay() {
  display.value = currentInput;
}
