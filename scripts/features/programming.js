export function programmingCalc() {
    // Tab switching for programming calculator
    const tabs = document.querySelector('.programming-tabs');
    const contents = document.querySelectorAll('.programming-content');

    if (tabs) {
        tabs.addEventListener('click', (e) => {
            const clickedTab = e.target.closest('.tab-link');
            if (clickedTab) {
                // Remove active class from all tabs and contents
                tabs.querySelectorAll('.tab-link').forEach(tab => tab.classList.remove('active'));
                contents.forEach(content => content.classList.remove('active'));

                // Add active class to clicked tab and corresponding content
                clickedTab.classList.add('active');
                const targetContent = document.getElementById(e.target.dataset.tabTarget);
                if (targetContent) {
                    targetContent.classList.add('active');
                }
            }
        });
    }

    // Base conversion logic
    const baseInput = document.querySelectorAll('#base-converter input');
    const validationPatterns = {
        2: /^[01]+$/,
        8: /^[0-7]+$/,
        10: /^\d+$/,
        16: /^[0-9a-fA-F]+$/
    };

    baseInput.forEach(input => {
        input.addEventListener('input', (e) => {
            const sourceInput = e.target;
            const base = parseInt(sourceInput.dataset.base);
            let value = sourceInput.value.trim(); 
            
            if (!validationPatterns[base].test(value)) {
                e.target.value = value.slice(0, -1);
                return;
            };
            
            if (value === '') {
                baseInput.forEach(i => { if (i !== sourceInput) i.value = ''; });
                return;
            }

            const decimalValue = parseInt(value, base);

            if (isNaN(decimalValue)) {
                return;
            }

            baseInput.forEach(i => {
                if (i !== sourceInput) {
                    const targetBase = parseInt(i.dataset.base);
                    i.value = decimalValue.toString(targetBase).toUpperCase();
                }
            });
        });
    });

    // Bitwise calculator logic
    const op1Input = document.getElementById('bitwise-op1');
    const op2Input = document.getElementById('bitwise-op2');
    const operatorSelect = document.getElementById('bitwise-operator');
    const bitwiseResult = document.getElementById('bitwise-result');
    const calculateBitwiseBtn = document.getElementById('calculate-bitwise');

    if (calculateBitwiseBtn) {
        calculateBitwiseBtn.addEventListener('click', () => {
            const op1 = parseInt(op1Input.value);
            const op2 = parseInt(op2Input.value);
            const operator = operatorSelect.value;
            if (isNaN(op1) || isNaN(op2)) {
                bitwiseResult.textContent = "Please enter valid binary numbers.";
                return;
            }
            let result;
            switch (operator) {
                case 'AND': result = op1 & op2; break;
                case 'OR': result = op1 | op2; break;
                case 'XOR': result = op1 ^ op2; break;
                case 'NOT': result = ~op1; break;
                case 'NAND': result = ~(op1 & op2); break;
                case 'NOR': result = ~(op1 | op2); break;
                case 'XNOR': result = ~(op1 ^ op2); break;
                case 'LEFT_SHIFT': result = op1 << op2; break;
                case 'RIGHT_SHIFT': result = op1 >> op2; break;
                default: return;
            }
            bitwiseResult.textContent = `Result: ${result.toString(2).toUpperCase()}`;
            if (window.historyManager) window.historyManager.add(expression, result.toString(2).toUpperCase());
        });
    }

}