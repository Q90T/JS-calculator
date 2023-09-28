class Calculator {
    // Calculator class represents a calculator object

    constructor(previousOperandTextElement, currentOperandTextElement) {
        // Creates a calculator object
        this.previousOperandTextElement = previousOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement;
        this.clear();
    }

    clear() {
        // Clears the current operand, previous operand, and operation
        this.currentOperand = '';
        this.previousOperand = '';
        this.operation = undefined;
    }

    delete() {
        // delet one element to the left of the current operand

        this.currentOperand = this.currentOperand.slice(0,-1);
    }

    appendNumber(number) {
        // Appends a number to the current operand
        this.currentOperand += number;
    }

    chooseOperation(operation) {
        // Chooses an operation
        if (isNaN(this.currentOperand) || this.currentOperand === '')  return;
        calculator.udatePrevious();  
        this.operation = operation;
        
        
    }
    udatePrevious() {
        // Updates the previous operand
        if (this.previousOperand === '') {
            this.previousOperand =  this.currentOperand;
            this.currentOperand = '';
        }
        else{
            
            this.previousOperand = calculator.compute() ;
            this.currentOperand = '';
        }
        
    }

    compute() {
        // Computes the current operand
        let computation;
        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);
        if (isNaN(prev) || isNaN(current)) return;
        switch (this.operation) {
            case '+':
                computation = prev + current;
                break;
            case '-':
                computation = prev - current;
                break;
            case '*':
                computation = prev * current;
                break;
            case '÷':
                computation = prev / current;
                break;
            default:
                return;
        }
        return computation;
        
    }

    updateDisplay() {
        // Updates the display of the current operand
        this.currentOperandTextElement.innerText = this.currentOperand;
        this.previousOperandTextElement.innerText =  this.previousOperand;
    }

    toggleNegative() {
        // Toggles the sign of the current operand
        if (this.currentOperand !== '') {
            this.currentOperand = (-parseFloat(this.currentOperand)).toString();
            this.updateDisplay();
        }
    }
    result (){
        this.currentOperand = calculator.compute();
        this.operation = undefined;
        this.previousOperand = '';
    }
    
}

// Get DOM elements
const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-delete]');
const allClearButton = document.querySelector('[data-all-clear]');
const previousOperandTextElement = document.querySelector('[data-previous-operand]');
const currentOperandTextElement = document.querySelector('[data-current-operand]');
const negativeButton = document.querySelector('[data-negative]');

// Create a calculator object
const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement);

// Add event listeners to number buttons
numberButtons.forEach((button) => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    });
});

// Add event listener to the negative button
negativeButton.addEventListener('click', () => {
    calculator.toggleNegative();
});
// Add event listener to delete button
deleteButton.addEventListener('click', ()=> {
    calculator.delete();
    calculator.updateDisplay();


});
// Add event listener to all clear button
allClearButton.addEventListener('click', () => {
    
    calculator.clear();
    calculator.updateDisplay();

})
// Add event listener to operation buttons
operationButtons.forEach((button) => {
    button.addEventListener('click', () => {

        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay();

    });
})
// Add event listener to equals button
equalsButton.addEventListener('click', () => {
    calculator.result();
    calculator.updateDisplay();
});