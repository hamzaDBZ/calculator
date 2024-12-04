function add(a, b) {
    return Number(a) + Number(b);
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return b != 0 ? a / b : "ERROR";
}

function operate(a, b, op) {
    if (a === null || a === "" || b === null || b === "" || op === null)
        return false;
    
    let answer;
    switch (op) {
        case "+":
            answer = add(a, b);
            return !checkLength(String(answer)) ? answer.toExponential(5) : answer;
        case "-":
            answer = subtract(a, b);
            return !checkLength(String(answer)) ? answer.toExponential(5) : answer;

        case "*":
            answer = multiply(a, b);
            return !checkLength(String(answer)) ? answer.toExponential(5) : answer;

        case "/":
            answer = divide(a, b);
            if (typeof answer === 'string') return answer;
            return !checkLength(String(answer)) ? answer.toExponential(5) : answer;
    }
}

function checkLength(str = "") {
    return str.length < 11;
}

let num1 = null,
    num2 = null,
    op = null,
    clearScreen = false;

const display = document.querySelector('.display');
const numbers = document.querySelector('.numbers');
const operator = document.querySelector('.op');
const answer = document.querySelector('#answer');
const otherButtons = document.querySelector('.other-buttons');

numbers.addEventListener('click', (event) => {
    if (clearScreen) {
        display.textContent = "";
        clearScreen = false;
    }

    if (event.target.id === "." && display.textContent.includes("."))
        return;
    if (checkLength(display.textContent)) {
        display.textContent += event.target.id;
    }
});

operator.addEventListener('click', (event) => {
    if (event.target.textContent === "=") return;
    if (clearScreen && (display.textContent === "" || num1 === display.textContent || num2 === display.textContent)) {
        op = event.target.textContent;
        clearScreen = true;
        return;
    }
    if (num1 !== null && op !== null) {
        num2 = display.textContent;
        let result = operate(num1, num2, op);
        display.textContent = result !== false ? result : display.textContent;
        num1 = display.textContent;
        op = null;
        clearScreen = true;
    }
    if (num1 === null) {
        num1 = display.textContent !== "" ? display.textContent : num1;
        clearScreen = true;
    }
    op = event.target.textContent;
});

answer.addEventListener('click', () => {
    if (clearScreen === true && num2 === null)
        return;
    if (num1 !== null)
        num2 = display.textContent;
    let result = operate(num1, num2, op);
    if (result === false) return;
    display.textContent = result;
    num1 = display.textContent;
    op = null;
    clearScreen = true;
});

otherButtons.addEventListener('click', (event) => {
    switch (event.target.textContent) {
        case 'CLEAR':
            display.textContent = "";
            num1 = null,
            num2 = null,
            op = null;
            break;
        
        case 'DEL':
            display.textContent = display.textContent.slice(0, -1)
            break;
        
        case '+/-':
            display.textContent = display.textContent * -1;
            break;
    }
})