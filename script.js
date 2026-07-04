// ==============================
// Calculator Elements
// ==============================

const screen = document.getElementById("screen");
const buttons = document.querySelectorAll(".btn");

// ==============================
// Calculator Variables
// ==============================

let displayValue = "0";
let firstOperand = null;
let operator = null;
let waitingForSecondOperand = false;

// ==============================
// Update Display
// ==============================

function updateDisplay() {
    screen.textContent = displayValue;
}

updateDisplay();

// ==============================
// Button Click Events
// ==============================

buttons.forEach(button => {

    button.addEventListener("click", function () {

        const value = this.value;

        // Number Buttons
        if (!isNaN(value)) {

            inputNumber(value);

        }

        // Decimal
        else if (value === ".") {

            inputDecimal();

        }

        // Clear
        else if (value === "AC") {

            clearCalculator();

        }

        // Equal
        else if (value === "=") {

            calculateResult();

        }

        // Operators
        else {

            handleOperator(value);

        }

        updateDisplay();

    });

});

// ==============================
// Number Input
// ==============================

function inputNumber(number) {

    if (waitingForSecondOperand) {

        displayValue = number;
        waitingForSecondOperand = false;

    }

    else {

        if (displayValue === "0") {

            displayValue = number;

        }

        else {

            displayValue += number;

        }

    }

}

// ==============================
// Decimal Input
// ==============================

function inputDecimal() {

    if (waitingForSecondOperand) {

        displayValue = "0.";
        waitingForSecondOperand = false;
        return;

    }

    if (!displayValue.includes(".")) {

        displayValue += ".";

    }

}

// ==============================
// Operator Handling
// ==============================

function handleOperator(nextOperator) {

    const inputValue = parseFloat(displayValue);

    if (firstOperand === null) {

        firstOperand = inputValue;

    }

    else if (operator) {

        const result = performCalculation(firstOperand, inputValue, operator);

        displayValue = String(result);

        firstOperand = result;

    }

    operator = nextOperator;

    waitingForSecondOperand = true;

}

// ==============================
// Perform Calculation
// ==============================

function performCalculation(first, second, operator) {

    if (operator === "+") {

        return first + second;

    }

    else if (operator === "-") {

        return first - second;

    }

    else if (operator === "*") {

        return first * second;

    }

    else if (operator === "/") {

        if (second === 0) {

            alert("Cannot divide by zero");

            clearCalculator();

            return 0;

        }

        return first / second;

    }

    else if (operator === "%") {

        return first % second;

    }

    return second;

}

// ==============================
// Equal Button
// ==============================

function calculateResult() {

    if (operator === null) {

        return;

    }

    const secondOperand = parseFloat(displayValue);

    const result = performCalculation(firstOperand, secondOperand, operator);

    displayValue = String(parseFloat(result.toFixed(7)));

    firstOperand = null;

    operator = null;

    waitingForSecondOperand = false;

}

// ==============================
// Clear Calculator
// ==============================

function clearCalculator() {

    displayValue = "0";

    firstOperand = null;

    operator = null;

    waitingForSecondOperand = false;

}

// ==============================
// Keyboard Support
// ==============================

document.addEventListener("keydown", function (event) {

    const key = event.key;

    if (!isNaN(key)) {

        inputNumber(key);

    }

    else if (key === ".") {

        inputDecimal();

    }

    else if (
        key === "+" ||
        key === "-" ||
        key === "*" ||
        key === "/" ||
        key === "%"
    ) {

        handleOperator(key);

    }

    else if (key === "Enter" || key === "=") {

        calculateResult();

    }

    else if (key === "Escape") {

        clearCalculator();

    }

    updateDisplay();

});