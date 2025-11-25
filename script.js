const previousEl = document.getElementById('previous');
const currentEl = document.getElementById('current');
const buttons = document.querySelectorAll('.btn');

let current = '';
let previous = '';
let operator = null;

function updateDisplay(){
  currentEl.textContent = current || '0';
  previousEl.textContent = previous ? `${previous} ${operator || ''}` : '';
}

function appendNumber(num){
  if (num === '.' && current.includes('.')) return;
  current = current + num;
}

function chooseOperator(op){
  if (!current) return;
  if (previous){
    compute();
  }
  operator = op;
  previous = current;
  current = '';
}

function clearAll(){
  current = '';
  previous = '';
  operator = null;
}

function backspace(){
  current = current.slice(0,-1);
}

function compute(){
  let a = parseFloat(previous);
  let b = parseFloat(current);
  if (isNaN(a) || isNaN(b)) return;

  let result = 0;
  switch(operator){
    case '+': result = a + b; break;
    case '-': result = a - b; break;
    case '*': result = a * b; break;
    case '/': result = b===0 ? 'Error' : a / b; break;
    case '%': result = (a * b) / 100; break;
  }

  current = String(result);
  previous = '';
  operator = null;
}

buttons.forEach(btn=>{
  btn.addEventListener('click',()=>{
    let action = btn.dataset.action;
    let value = btn.dataset.value;

    if(action === 'number') appendNumber(value);
    else if(action === 'operator') chooseOperator(value);
    else if(action === 'clear') clearAll();
    else if(action === 'backspace') backspace();
    else if(action === 'equals') compute();

    updateDisplay();
  });
});

updateDisplay();
