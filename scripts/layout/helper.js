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

const inputField = (label, config, className) =>
    el('div', { class: className??"form-group" }, [
        el('label', { for: config.id, text: label }),
        el('input', { ...config })
    ]);

const createTabes = (tabs, tabClass) => 
    el('nav', { class: tabClass??"financial-tabs" }, 
        tabs.map((tab, i) => 
            el("button", { class: "tab-link" + (i === 0 ? " active" : ""), "data-tab-target": tab.id }, [tab.label])
    )
    );

const radioGroup = (label, name, options, checked) => 
    el('div', { class: "form-group" }, [
        el('label', { text: label }),
        el('div', { class: 'radio-group' },
            options.map(option => el('label', {}, [
                el('input', { type: 'radio', name, value: option, checked: option == checked }),
                ` ${option}`
            ]))
        )
    ])

export { el, createDisplay, createButtons, inputField, createTabes, radioGroup };