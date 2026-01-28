import { el, createDisplay, createButtons } from "./helper.js";

export function renderCalculator(root, config, hidden = true) {
    const container = el("div", { class: `calculator ${ hidden ? 'hidden': '' }`, id: config.id });

    if (config.display) container.appendChild(createDisplay())

    if(config.buttons) container.appendChild(createButtons(config.buttons))


    return root.appendChild(container)
}