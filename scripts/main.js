import { setMetaData } from "./layout/headMetaData.js";
import { rootLayout } from "./layout/rootLayout.js";

const metaData = {
    title: "Smart Calculator with AI",
    description: "A calculator that leverages AI to provide advanced calculations and insights.",
    keywords: ["calculator", "AI", "smart calculator", "advanced calculations"],
    icon32: "https://img.freepik.com/premium-vector/cute-dark-gray-calculator-with-blue-screen-round-buttons-flat-cartoon-style_653461-4845.jpg?semt=ais_hybrid&w=740&q=80",
    icon16: "https://img.freepik.com/premium-vector/cute-dark-gray-calculator-with-blue-screen-round-buttons-flat-cartoon-style_653461-4845.jpg?semt=ais_hybrid&w=740&q=80",
    stylessheets: [
        "../css/style.css"
    ],
    scripts: [
        "https://cdn.jsdelivr.net/npm/chart.js",
        "https://cdnjs.cloudflare.com/ajax/libs/mathjs/11.8.0/math.js",
        "https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js",
        "https://cdnjs.cloudflare.com/ajax/libs/jspdf-autotable/3.5.23/jspdf.plugin.autotable.min.js"
    ],
    bodyScripts: [

    ]
}

window.addEventListener('DOMContentLoaded', () => {
    setMetaData(metaData)
})

// ------------------------------------ Start Root Layout ----------------------------------------
const rootElement = document.getElementById('root');
rootElement.appendChild(rootLayout())
// ------------------------------------ End Root Layout ------------------------------------------