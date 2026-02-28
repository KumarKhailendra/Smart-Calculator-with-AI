export function financialCalc() {
    // Tab switching for financial calculator
    const tabs = document.querySelector('.financial-tabs');
    const contents = document.querySelectorAll('.financial-content');

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

    // EMI Calculator logic
    const principalInput = document.getElementById('principal');
    const interestInput = document.getElementById('interest-rate');
    const tenureInput = document.getElementById('tenure');
    const emiResult = document.getElementById('emi-result');
    const calculateEmiBtn = document.getElementById('calculate-emi');

    if (calculateEmiBtn) {
        calculateEmiBtn.addEventListener('click', () => {
            const principal = parseFloat(principalInput.value);
            const annualInterestRate = parseFloat(interestInput.value);
            const tenureYears = parseFloat(tenureInput.value);

            if (isNaN(principal) || isNaN(annualInterestRate) || isNaN(tenureYears)) {
                emiResult.textContent = "Please enter valid inputs.";
                return;
            }

            const monthlyInterestRate = annualInterestRate / 12 / 100;
            const tenureMonths = tenureYears * 12;

            const emi = (principal * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, tenureMonths)) / (Math.pow(1 + monthlyInterestRate, tenureMonths) - 1);

            emiResult.textContent = `Your EMI is: ₹${emi.toFixed(2)}`;
        });
    }

    // GST Calculator logic
    const gstAmountInput = document.getElementById('gst-amount');
    const gstResult = document.getElementById('gst-result');
    const calculateGstBtn = document.getElementById('calculate-gst');

    if (calculateGstBtn) {
        calculateGstBtn.addEventListener('click', () => {
            const amount = parseFloat(gstAmountInput.value);
            const rateElement = document.querySelector('input[name="gst-rate"]:checked');
            const typeElement = document.querySelector('input[name="gst-type"]:checked');

            if (isNaN(amount) || !rateElement || !typeElement) {
                gstResult.textContent = "Please enter valid inputs.";
                return;
            }

            const gstRate = parseFloat(rateElement.value);
            const calculationType = typeElement.value;

            let finalAmount;
            if (calculationType === "add") {
                finalAmount = amount + (amount * gstRate / 100);
                gstResult.textContent = `Amount after adding GST: ₹${finalAmount.toFixed(2)}`;
            } else {
                finalAmount = amount - (amount * gstRate / 100);
                gstResult.textContent = `Amount after subtracting GST: ₹${finalAmount.toFixed(2)}`;
            }
        });
    }

    // Income Tax Calculator logic (if needed, can be implemented similarly)

    const annualIncomeInput = document.getElementById('annual-income');
    const taxResult = document.getElementById('tax-result');
    const calculateTaxBtn = document.getElementById('calculate-tax');

    if (calculateTaxBtn) {
        calculateTaxBtn.addEventListener('click', () => {
            const annualIncome = parseFloat(annualIncomeInput.value);
            if (isNaN(annualIncome)) {
                taxResult.textContent = "Please enter a valid annual income.";
                return;
            }
            let tax = 0;
            if (annualIncome <= 250000) {
                tax = 0;
            } else if (annualIncome <= 500000) {
                tax = (annualIncome - 250000) * 0.05;
            } else if (annualIncome <= 1000000) {
                tax = (annualIncome - 500000) * 0.2 + 12500;
            } else {
                tax = (annualIncome - 1000000) * 0.3 + 112500;
            }
            taxResult.textContent = `Your estimated income tax is: ₹${tax.toFixed(2)}`;
        });
    }

    // SIP Calculator logic (if needed, can be implemented similarly)

    const sipAmountInput = document.getElementById('monthly-investment');
    const sipRateInput = document.getElementById('return-rate');
    const sipTenureInput = document.getElementById('time-period');
    const sipResult = document.getElementById('sip-result');
    const calculateSipBtn = document.getElementById('calculate-sip');

    if (calculateSipBtn) {
        calculateSipBtn.addEventListener('click', () => {
            const monthlyInvestment = parseFloat(sipAmountInput.value);
            const returnRate = parseFloat(sipRateInput.value);
            const timePeriod = parseFloat(sipTenureInput.value);
            if (isNaN(monthlyInvestment) || isNaN(returnRate) || isNaN(timePeriod)) {
                sipResult.textContent = "Please enter valid inputs.";
                return;
            }
            const monthlyReturnRate = returnRate / 12 / 100;
            const totalMonths = timePeriod * 12;
            const futureValue = monthlyInvestment * ((Math.pow(1 + monthlyReturnRate, totalMonths) - 1) / monthlyReturnRate) * (1 + monthlyReturnRate);
            const totalInvestment = monthlyInvestment * totalMonths;
            const gain = futureValue - totalInvestment;
            
            sipResult.textContent = `Your SIP will grow to: ₹${futureValue.toFixed(2)} (Gain: ₹${gain.toFixed(2)})`;
        });
    }

    // Currency Converter logic (if needed, can be implemented similarly)

    const currencyAmountInput = document.getElementById('currency-amount');
    const fromCurrencySelect = document.getElementById('from-currency');
    const toCurrencySelect = document.getElementById('to-currency');
    const currencyResult = document.getElementById('currency-result');
    const calculateCurrencyBtn = document.getElementById('convert-currency');

    let exchangeRates = {};
    const fetchExchangeRates = async () => {
        try {
            if (!fromCurrencySelect || !toCurrencySelect) return;
            const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
            const data = await response.json();
            exchangeRates = data.rates;

            const currencies = Object.keys(exchangeRates);
            currencies.forEach(currency => {
                const option1 = document.createElement('option');
                option1.value = currency;
                option1.textContent = currency;
                fromCurrencySelect.appendChild(option1);
                const option2 = document.createElement('option');
                option2.value = currency;
                option2.textContent = currency;
                toCurrencySelect.appendChild(option2);
            });

            fromCurrencySelect.value = 'USD';
            toCurrencySelect.value = 'INR';
        } catch (error) {
            if (currencyResult) currencyResult.textContent = "Failed to fetch exchange rates.";
            console.error('Error fetching exchange rates:', error);
        }
    };

    if (calculateCurrencyBtn) {
        fetchExchangeRates();
        calculateCurrencyBtn.addEventListener('click', () => {
            const amount = parseFloat(currencyAmountInput.value);
            const fromCurrency = fromCurrencySelect.value;
            const toCurrency = toCurrencySelect.value;

            if (isNaN(amount) || !fromCurrency || !toCurrency) {
                currencyResult.textContent = "Please enter valid inputs.";
                return;
            }
            const fromRate = exchangeRates[fromCurrency];
            const toRate = exchangeRates[toCurrency];
            if (!fromRate || !toRate) {
                currencyResult.textContent = "Invalid currency selected.";
                return;
            }
            const convertedAmount = (amount / fromRate) * toRate;
            currencyResult.textContent = `Converted Amount: ₹${convertedAmount.toFixed(2)}`;
        });
    }
}        