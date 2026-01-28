const el = (tag, attrs = {}, children = []) => {
    const element = document.createElement(tag);

    Object.entries(attrs).forEach(([k, v]) => {
        if (k === "class" || k === "className") element.className = v;
        else if (k === "text") element.textContent = v;
        else element.setAttribute(k, v);
    });

    children.forEach(child => {
        if (typeof child === "string") element.appendChild(document.createTextNode(child));
        else element.appendChild(child);
    });

    return element;
}

const createDisplay = () => el('div', { class: "display" }, [
    el('div', { class: "previous-operand", "data-previous-operand": ""}),
    el('div', { class: "current-operand", "data-current-operand": "", text: "0"})
]);

const createButtons = (buttons) => el('div', { class: "buttons" }, 
    buttons.map(btn => el("button", btn.attrs, [btn.label]))
);


export { el, createDisplay, createButtons };