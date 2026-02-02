export const calculators = {
    standard: {
    id: "standard-calculator",
    type: "calculator",
    display: true,
    buttons: [
      { label: "AC", attrs: { "data-all-clear": "", class: "span-two" } },
      { label: "DEL", attrs: { "data-delete": "" } },
      { label: "÷", attrs: { "data-operation": "" } },
      { label: "1", attrs: { "data-number": "" } },
      { label: "2", attrs: { "data-number": "" } },
      { label: "3", attrs: { "data-number": "" } },
      { label: "×", attrs: { "data-operation": "" } },
      { label: "4", attrs: { "data-number": "" } },
      { label: "5", attrs: { "data-number": "" } },
      { label: "6", attrs: { "data-number": "" } },
      { label: "+", attrs: { "data-operation": "" } },
      { label: "7", attrs: { "data-number": "" } },
      { label: "8", attrs: { "data-number": "" } },
      { label: "9", attrs: { "data-number": "" } },
      { label: "−", attrs: { "data-operation": "" } },
      { label: ".", attrs: { "data-number": "" } },
      { label: "0", attrs: { "data-number": "" } },
      { label: "=", attrs: { "data-equals": "", class: "span-two" } },
    ],
  },

  scientific: {
    id: "scientific-calculator",
    type: "calculator",
    display: true,
    buttons: [
      // Row 1
      { label: "sin", attrs: { "data-sci-operation": "sin" } },
      { label: "cos", attrs: { "data-sci-operation": "cos" } },
      { label: "tan", attrs: { "data-sci-operation": "tan" } },
      { label: "log", attrs: { "data-sci-operation": "log" } },
      { label: "ln", attrs: { "data-sci-operation": "ln" } },

      // Row 2
      { label: "^", attrs: { "data-operation": "" } },
      { label: "√", attrs: { "data-sci-operation": "sqrt" } },
      { label: "(", attrs: { "data-number": "" } },
      { label: ")", attrs: { "data-number": "" } },
      { label: "%", attrs: { "data-sci-operation": "percent" } },

      // Row 3
      { label: 'π', attrs: { "data-constant": "pi" } },
      { label: "7", attrs: { "data-number": "" } },
      { label: "8", attrs: { "data-number": "" } },
      { label: "9", attrs: { "data-number": "" } },
      { label: "÷", attrs: { "data-operation": "" } },

      // Row 4
      { label: 'e', attrs: { "data-constant": "e" } },
      { label: "4", attrs: { "data-number": "" } },
      { label: "5", attrs: { "data-number": "" } },
      { label: "6", attrs: { "data-number": "" } },
      { label: "×", attrs: { "data-operation": "" } },

      // Row 5
      { label: "AC", attrs: { "data-all-clear": "" } },
      { label: "1", attrs: { "data-number": "" } },
      { label: "2", attrs: { "data-number": "" } },
      { label: "3", attrs: { "data-number": "" } },
      { label: "−", attrs: { "data-operation": "" } },

      // Row 6
      { label: "DEL", attrs: { "data-delete": "" } },
      { label: "0", attrs: { "data-number": "" } },
      { label: ".", attrs: { "data-number": "" } },
      { label: "=", attrs: { "data-equals": ""} },
      { label: "+", attrs: { "data-operation": "" } },
    ],
  },

  graphing: {
    id: "graphing-calculator",
    type: "graphing",
    inputs: [
      {
        id: "equation-input",
        placeholder: "Enter equation (e.g., y = 2x + 3)",
        value: "y = x^2 + 3*x + 2",
      },
    ],
    canvas: {
      id: "graph-canvas",
    }
  },

  converter: {
    id: "converter-calculator",
    type: "converter",
    inputs: [
      {
        id: "converter-input",
        label: "Value to Convert",
        placeholder: "e.g., Convert 10 meters to feet",
      }
    ],
    resultBox: {
      id: "converter-result",
    }
  },

  financial: {
    id: "financial-calculator",
    type: "financial",
    tabs: [
      { id: "emi-calc", label: "EMI" },
      { id: "gst-calc", label: "GST" },
      { id: "tax-calc", label: "Income Tax" },
      { id: "sip-calc", label: "SIP" },
      { id: "currency-calc", label: "Currency" },
    ],

    contents: [
      // ---------------- EMI ----------------
      {
        id: "emi-calc",
        className: "financial-content active",
        title: "EMI Calculator",
        inputs: [
          {
            label: "Loan Amount (₹)",
            id: "principal",
            type: "number",
            placeholder: "e.g., 100000",
          },
          {
            label: "Annual Interest Rate (%)",
            id: "interest-rate",
            type: "number",
            placeholder: "e.g., 8.5",
          },
          {
            label: "Loan Tenure (Years)",
            id: "tenure",
            type: "number",
            placeholder: "e.g., 5",
          },
        ],
        button: {
          id: "calculate-emi",
          label: "Calculate",
          class: "calc-button",
        },
        resultBox: { id: "emi-result", class: "financial-result" },
      },

      // ---------------- GST ----------------
      {
        id: "gst-calc",
        className: "financial-content",
        title: "GST Calculator",
        inputs: [
          {
            label: "Amount",
            id: "gst-amount",
            type: "number",
            placeholder: "e.g., 1000",
          },
        ],
        radioGroups: [
          {
            label: "GST Rate (%)",
            name: "gst-rate",
            options: [5, 12, 18, 28],
            checked: 5,
          },
          {
            label: "Calculation Type",
            name: "gst-type",
            options: ["add", "subtract"],
            checked: "add",
          },
        ],
        button: {
          id: "calculate-gst",
          label: "Calculate",
          class: "calc-button",
        },
        resultBox: { id: "gst-result", class: "financial-result" },
      },

      // ---------------- TAX ----------------
      {
        id: "tax-calc",
        className: "financial-content",
        title: "Income Tax Calculator",
        inputs: [
          {
            label: "Your Annual Income (₹)",
            id: "annual-income",
            type: "number",
            placeholder: "e.g., 900000",
          },
        ],
        button: {
          id: "calculate-tax",
          label: "Calculate Tax",
          class: "calc-button",
        },
        resultBox: { id: "tax-result", class: "financial-result" },
      },

      // ---------------- SIP ----------------
      {
        id: "sip-calc",
        className: "financial-content",
        title: "SIP Calculator",
        inputs: [
          {
            label: "Monthly Investment (₹)",
            id: "monthly-investment",
            type: "number",
            placeholder: "e.g., 5000",
          },
          {
            label: "Expected Annual Return Rate (%)",
            id: "return-rate",
            type: "number",
            placeholder: "e.g., 12",
          },
          {
            label: "Time Period (Years)",
            id: "time-period",
            type: "number",
            placeholder: "e.g., 10",
          },
        ],
        button: {
          id: "calculate-sip",
          label: "Calculate",
          class: "calc-button",
        },
        resultBox: { id: "sip-result", class: "financial-result" },
      },

      // ---------------- Currency ----------------
      {
        id: "currency-calc",
        className: "financial-content",
        title: "Currency Converter",
        fields: [
          {
            type: "input",
            id: "currency-amount",
            label: "Amount",
            inputType: "number",
            placeholder: "e.g., 100",
          },

          {
            type: "group",
            className: "currency-group",
            children: [
              {
                type: "select",
                id: "from-currency",
                label: "From",
                options: [],
              },
              {
                type: "select",
                id: "to-currency",
                label: "To",
                options: [],
              },
            ],
          },
        ],
        button: {
          id: "convert-currency",
          label: "Convert",
          class: "calc-button",
        },
        resultBox: { id: "currency-result", class: "financial-result" },
      },
    ],
  },
}