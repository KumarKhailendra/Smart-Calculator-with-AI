import { el } from "./helper.js";

export function sidebarLayout(menuItemObj) {
    return el('nav', { class: 'sidebar' }, [
        el('h1', { class: "logo", text: 'Smart Calc' }),
        el('ul', {}, [
            ...menuItemObj.map(item => el('li', { 
                class: item.class || '', 
                "data-nav-target": item.target,
                "data-action": item.action,
            }, [
                el('a', { href: `#`, text: item.text })
            ]))
        ]),
        el('div', { class: 'theme-switcher-container' }, [
            el('span', { text: "Dark Mode" }),
            el('label', { class: "switch" }, [
                el('input', { type: "checkbox", id: "theme-switcher" }),
                el('span', { class: "slider round" })
            ])
        ])
    ])
}