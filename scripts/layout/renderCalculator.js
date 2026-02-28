import { el, createDisplay, createButtons, inputField, createTabes, radioGroup } from "./helper.js";

export function renderCalculator(root, config, hidden = true) {
    const mainContainer = el("div", { class: `calculator ${ hidden ? 'hidden': '' }`, id: config.id });

    let container = mainContainer;

    if (config.wrapper) {
        container = el(config.wrapper.tag, { class: config.wrapper.class || '' }, []);
        mainContainer.appendChild(container);
    }

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

    if (config.tabs) container.appendChild(createTabes(config.tabs, config.tabClass))

    if (config.resultBox) container.appendChild(el("div", { class: config.resultBox.id, id: config.resultBox.id, text: config.resultBox.defaultText }))

    if (config.contents) config.contents.forEach(content => container.appendChild(renderSection(content)));

    return root.appendChild(mainContainer)
}

function renderSection(config) {
    const section = document.createElement('div');
    section.id = config.id;
    section.className = config.className || '';

    if (config.title) section.appendChild(el('h3', { text: config.title }));

    if (config.inputs) 
        config.inputs.forEach(input => section.appendChild(inputField(input.label, input)));

    if (config.radioGroups) config.radioGroups.forEach(group => section.appendChild(radioGroup(group.label, group.name, group.options, group.checked)));

    if (config.fields) {
        config.fields.forEach(field => {
            if (field.type === 'group') {
                const groupWrapper = el('div', { class: field.className }, 
                    field.children.map(child => 
                        el('div', { class: 'form-group' }, [
                            child.label ? el('label', { for: child.id, text: child.label }) : '',
                            child.type === 'select' ? el('select', { id: child.id, name: child.id }, 
                            (child.options || []).map(option => el('option', { value: option.value, text: option.label }))) : ''
                        ])
                    )
                );
                section.appendChild(groupWrapper);
                return;
            }

            const group = el('div', { class: 'form-group' }, [
                field.label ? el('label', { for: field.id, text: field.label }) : '',
                field.type === 'input' ? el('input', { ...field, type: field.inputType, id: field.id, placeholder: field.placeholder || '' }) : '',
                field.type === 'select' ? el('select', { ...field, id: field.id }, 
                    (field.options || []).map(option => el('option', { value: option.value, text: option.label }))) : '',
            ]);

            section.appendChild(group);
        });
    }

    if (config.button) 
        section.appendChild(el('button', config.button, [config.button.label]));

    if (config.resultBox)
        section.appendChild(el('div', config.resultBox, []));

    return section;
}