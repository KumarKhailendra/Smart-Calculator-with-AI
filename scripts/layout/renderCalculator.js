import { el, createDisplay, createButtons, inputField } from "./helper.js";

export function renderCalculator(root, config, hidden = true) {
    const container = el("div", { class: `calculator ${ hidden ? 'hidden': '' }`, id: config.id });

    if (config.display) container.appendChild(createDisplay())

    if(config.buttons) container.appendChild(createButtons(config.buttons))

    if (config.inputs && !config.canvas) 
        config.inputs.forEach(input => container.appendChild(inputField(input.label, input)));

    if (config.inputs && config.canvas) {
        const graphContainer = el('div', { class: 'graph-container'}, [
            ...config.inputs.map(i => inputField(i.label, i)),
            el("canvas", config.canvas)
        ]);
        container.appendChild(graphContainer)
    }

    if (config.resultBox) container.appendChild(el("div", { class: config.resultBox.id, id: config.resultBox.id, text: config.resultBox.defaultText }))

    return root.appendChild(container)
}