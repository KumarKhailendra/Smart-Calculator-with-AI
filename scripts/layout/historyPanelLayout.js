import { el } from "./helper.js";

export function historyPanelLayout() {
    return el("aside", { class: 'history-panel hidden' }, [
        el("div", { class: "history-header" }, [
            el("h3", { text: "Calculation History" }),
            el("input", { type: "text", id: "history-search", placeholder: "Search history..." }),
            el("div", { class: "history-export" }, [
                el("button", { id: "export-csv", text: "CSV" }),
                el("button", { id: "export-pdf", text: "PDF" })
            ])
        ]),
        el("ul", { class: "history-list", id: "history-list"})
    ]);
}