let display = document.getElementById('display');
let currentInput = '';

function appendNumber(number) {
  // input 박스에 입력한 숫자와 연산자들을 넣는 함수
  currentInput += number.toString();
  display.value = currentInput;
}

function clearDisplay() {
  currentInput = '';
  display.value = currentInput;
}
