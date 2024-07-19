let display = document.getElementById('display');
let currentInput = '';

// 숫자를 input 창에 띄우는 함수
const appendNumber = (number) => {
  currentInput += number.toString();
  display.value = currentInput;
};

// input 창을 깨끗이 지우는 함수
const clearDisplay = () => {
  currentInput = '';
  display.value = currentInput;
};

// 연산자를 확인하고 input 창에 띄우는 함수
const appendOperation = (operation) => {
  const lastChar = currentInput.slice(-1); // 숫자 뒤의 연산자를 선택
  if (['+', '-', '*', '/'].includes(lastChar)) {
    // 연산자가 맞는지 확인
    currentInput = currentInput.slice(0, -1) + operation; // 숫자와 연산자를 붙여서 currentInput에 넣는다.
  } else {
    currentInput += operation; // 숫자가 없다면 그냥 연산자만 currentInput 뒤에 붙인다.
  }
  display.value = currentInput;
};

// 계산 결과를 input 창에 띄우는 함수
const calculateResult = () => {
  try {
    currentInput = evaluateExpression(currentInput).toString();
  } catch (e) {
    currentInput = 'Error';
  }
  display.value = currentInput;
};

const evaluateExpression = (ci) => {
  // ci는 currentInput의 약자이다
  let tokens = ci.match(/(\d+|\+|\-|\*|\/)/g);
  if (!tokens) return alert('error'); // 숫자 없이 c버튼 클릭 시 에러

  let values = [];
  let operations = [];

  for (let i = 0; i < tokens.length; i++) {
    let token = tokens[i];
    if (!isNaN(token)) {
      values.push(Number(token));
    } else {
      while (operations.length && precedence(operations[operations.length - 1]) >= precedence(token)) {
        let b = values.pop();
        let a = values.pop();
        let op = operations.pop();
        values.push(applyOperation(a, b, op));
      }
      operations.push(token);
    }
  }

  while (operations.length) {
    let b = values.pop();
    let a = values.pop();
    let op = operations.pop();
    values.push(applyOperation(a, b, op));
  }

  return values[0];
};

// 연산의 우선순위를 결정하는 함수
const precedence = (op) => {
  if (op === '+' || op === '-') return 1;
  if (op === '*' || op === '/') return 2;
  return 0;
};

// 연산을 하는 함수
const applyOperation = (a, b, op) => {
  if (op === '+') return a + b;
  if (op === '-') return a - b;
  if (op === '*') return a * b;
  if (op === '/') return a / b;
  return 0;
};
