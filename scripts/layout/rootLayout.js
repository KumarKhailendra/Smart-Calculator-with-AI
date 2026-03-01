import { menuItemObj } from "../layout-data-file/sidebar-menu.js";
import { historyPanelLayout } from "./historyPanelLayout.js";
import { rootMainContentLayout } from "./rootMainContantLayout.js";
import { sidebarLayout } from "./sidebarLayout.js";

export function rootLayout() {
    const appContainer = document.createElement('div');
    appContainer.className = 'app-container';

    appContainer.appendChild(sidebarLayout(menuItemObj));
    appContainer.appendChild(rootMainContentLayout());
    appContainer.appendChild(historyPanelLayout());

    return appContainer
}