import { calculators } from "../layout-data-file/calculator.js";
import { el } from "./helper.js";
import { renderCalculator } from "./renderCalculator.js";

export function rootMainContentLayout() {
    const mainContantElement = el('div', { class: "main-content"});

    renderCalculator(mainContantElement, calculators.standard, false);
    renderCalculator(mainContantElement, calculators.scientific);
    renderCalculator(mainContantElement, calculators.graphing);

    return mainContantElement;
}