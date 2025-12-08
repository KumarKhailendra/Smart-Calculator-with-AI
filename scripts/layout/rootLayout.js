import { menuItemObj } from "../layout-data-file/sidebar-menu.js";
import { sidebarLayout } from "./sidebarLayout.js";

export function rootLayout() {
    const appContainer = document.createElement('div');
    appContainer.className = 'app-container';

    appContainer.appendChild(sidebarLayout(menuItemObj))

    return appContainer
}