export function placeCaretAtEnd(el: HTMLElement) {
    el.focus();
    if (typeof window.getSelection != "undefined"
            && typeof document.createRange != "undefined") {
        const range = document.createRange();
        range.selectNodeContents(el);
        range.collapse(false);
        const sel = window.getSelection();

        if (!sel) {
            return
        }

        sel.removeAllRanges();
        sel.addRange(range);
    } else if (typeof (document.body as any).createTextRange != "undefined") {
        const textRange = (document.body as any).createTextRange();
        textRange.moveToElementText(el);
        textRange.collapse(false);
        textRange.select();
    }
}