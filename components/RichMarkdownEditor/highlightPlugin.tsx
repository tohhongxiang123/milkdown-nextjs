import { createCmd, createCmdKey } from "@milkdown/core";
import { toggleMark } from '@milkdown/prose/commands';
import { createMark, createShortcut } from "@milkdown/utils"

const id = "highlighted-text"
const nodeType = "highlighted-text"
export const ToggleHighlightedText = "ToggleHighlightedText"
const ToggleHighlightedTextCommandKey = createCmdKey(ToggleHighlightedText)

export const createHighlightPlugin = createMark((utils) => {
    return {
        id,
        schema: () => ({
            inclusive: false,
            parseDOM: [{ tag: 'span' }],
            toDOM: (mark) => ['span', { class: utils.getClassName(mark.attrs, 'highlighted-text'), style: "background-color:red" }],
            parseMarkdown: {
                match: (node) => node.type === nodeType,
                runner: (state, node, markType) => {
                    state.openMark(markType);
                    state.addText(node['value'] as string);
                    state.closeMark(markType);
                },
            },
            toMarkdown: {
                match: (mark) => mark.type.name === id,
                runner: (state, mark, node) => {
                    state.withMark(mark, 'text', node.text || '');
                },
            },
        }),
        commands: (markType) => [createCmd(ToggleHighlightedTextCommandKey, () => toggleMark(markType))],
        shortcuts: {
            [ToggleHighlightedText]: createShortcut(ToggleHighlightedTextCommandKey, 'Mod-h'),
        },
    };
});

const highlightPlugin = createHighlightPlugin()
export default highlightPlugin