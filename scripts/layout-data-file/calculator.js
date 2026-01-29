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
  }
}