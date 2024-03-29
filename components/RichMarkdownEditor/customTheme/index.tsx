import { themeFactory, ThemeFont, ThemeIcon } from '@milkdown/core';
import { nordLight } from '@milkdown/theme-nord';
import { iconMapping } from './icons'

const customTheme = nordLight.override((emotion, manager) => {
    manager.set(ThemeFont, (key) => {
        if (key === "typography") return '"Roboto", "Lato", "Helvetica Neue", Helvetica, sans-serif'

        return '"Roboto Mono" monospace'
    })
    manager.set(ThemeIcon, (key) => {
        const target = iconMapping[key];
        if (!target) {
            return;
        }
        const { icon, label } = target;
        const span = document.createElement('span');
        span.className = 'icon material-icons material-icons-outlined';
        span.textContent = icon;

        return {
            dom: span,
            label,
        };
    })
})

export default customTheme
