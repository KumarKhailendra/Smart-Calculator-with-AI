class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement;
        this.computationFinished = false;
        this.clear();
    }

    clear() {
        this.currentOperand = '0';
        this.previousOperand = '';
        this.operation = undefined;
        this.computationFinished = false;
    }

    delete() {
        if (this.currentOperand === '0' || this.currentOperand.length === 1) {
            this.currentOperand = '0';
            return;
        }
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
    }

    appendNumber(number) {
        if (this.computationFinished) {
            this.currentOperand = '';
            this.computationFinished = false;
        }
        if (number === '.' && this.currentOperand.includes('.')) return;
        if (this.currentOperand === '0' && number !== '.') {
            this.currentOperand = number;
        } else {
            this.currentOperand = this.currentOperand.toString() + number.toString();
        }
    }

    chooseOperation(operation) {
        if (this.currentOperand === '' || this.currentOperand === '.') return;
        if (this.computationFinished) {
            this.computationFinished = false;
        }
        if (this.previousOperand !== '') {
            this.compute();
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';
    }

    compute() {
        let computation;
        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);
        if (isNaN(prev) || isNaN(current)) return;
        
        const expression = `${this.getDisplayNumber(this.previousOperand)} ${this.operation} ${this.getDisplayNumber(current)}`;

        switch (this.operation) {
            case '+':
                computation = prev + current;
                break;
            case '-':
                computation = prev - current;
                break;
            case '×':
                computation = prev * current;
                break;
            case '÷':
                computation = prev / current;
                break;
            case '^':
                computation = Math.pow(prev, current);
                break;
            default:
                return;
        }
        this.currentOperand = computation;
        if (this.historyManager) this.historyManager.add(expression, this.currentOperand);
        this.operation = undefined;
        this.previousOperand = '';
        this.computationFinished = true;
    }

    updateDisplay() {
        this.currentOperandTextElement.innerText = this.getDisplayNumber(this.currentOperand);
        if (this.operation != null) {
            this.previousOperandTextElement.innerText = 
                `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`;
        } else {
            this.previousOperandTextElement.innerText = '';
        }
    }

    getDisplayNumber(number) {
        const stringNumber = number.toString();
        const integerDigits = parseFloat(stringNumber.split('.')[0]);
        const decimalDigits = stringNumber.split('.')[1];
        let integerDisplay;
        if (isNaN(integerDigits)) {
            integerDisplay = '';
        } else {
            integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 });
        }
        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`;
        } else {
            return integerDisplay;
        }
    }
}

// ---------------------------- standard-calculator ----------------------------------------

const calculatorElement = document.getElementById('standard-calculator');
if (!calculatorElement) return;
const previousOperandTextElement = calculatorElement.querySelector('[data-previous-operand]');
const currentOperandTextElement = calculatorElement.querySelector('[data-current-operand]');

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)

const numberButtons = calculatorElement.querySelectorAll('[data-number]');
const operationButtons = calculatorElement.querySelectorAll('[data-operation]');
const equalsButtons = calculatorElement.querySelectorAll('[data-equals]');
const deleteButtons = calculatorElement.querySelectorAll('[data-delete]');
const allClearButtons = calculatorElement.querySelectorAll('[data-all-clear]');

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    })
});


operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay();
    })
});

if (equalsButtons) equalsButtons.addEventListener('click', () => {
    calculator.compute();
    calculator.updateDisplay();
});

if (deleteButtons) deleteButtons.addEventListener('click', () => {
    calculator.delete();
    calculator.updateDisplay();
});

if (allClearButtons) allClearButtons.addEventListener('click', () => {
    calculator.clear();
    calculator.updateDisplay();
});


// --------------------------------------------------------------------

const navLinks = document.querySelectorAll('.sidebar li[data-nav-target]');
const allSidebarLinks = document.querySelectorAll('.sidebar li');
const calculatorContainers = document.querySelectorAll('.calculator');
const historyPanel = document.querySelector('.history-panel');
const historyToggleButton = document.querySelector('[data-action="toggle-history"]');


navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        
        allSidebarLinks.forEach(nav => nav.classList.remove('active'));
        link.classList.add('active');
        
        const targetId = link.dataset.navTarget;
        calculatorContainers.forEach(container => {
            if (container.id === targetId) {
                container.classList.remove('hidden');
            } else {
                container.classList.add('hidden');
            }
        });
    });
});

historyToggleButton.addEventListener('click', (e) => {
    e.preventDefault();
    historyPanel.classList.toggle('hidden');
});

const themeSwitcher = document.getElementById('theme-switcher');
themeSwitcher.addEventListener('change', () => {
    document.body.classList.toggle('dark-mode');
});