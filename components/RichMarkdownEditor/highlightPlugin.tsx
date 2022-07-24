import { createCmd, createCmdKey } from "@milkdown/core";
import { TextSelection } from "@milkdown/prose/state";
import { createMark, createShortcut } from "@milkdown/utils"
import { Node as ProseNode } from '@milkdown/prose/model';

const id = "highlighted-text"
const markName = "highlighted-text"

export const ToggleHighlightedText = "ToggleHighlightedText"
const ToggleHighlightedTextCommandKey = createCmdKey<string>(ToggleHighlightedText)

export const createHighlightPlugin = createMark((utils) => {
    return {
        id,
        schema: () => ({
            inclusive: false,
            attrs: {
                color: { default: 'green' }
            },
            parseDOM: [{ tag: 'span' }],
            toDOM: (mark) => ['span', { class: utils.getClassName(mark.attrs, 'highlighted-text'), style: `background-color:${mark.attrs.color}` }],
            parseMarkdown: {
                match: (node) => node.type === markName,
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
        commands: (markType) => [
            createCmd(ToggleHighlightedTextCommandKey, (color) => (state, dispatch) => {
                if (!dispatch) return true

                const { tr } = state
                const { marks } = state.schema
                const highlightedTextMark = marks[markName]?.create({ color })

                let node: ProseNode | undefined;
                let pos = -1;
                const { selection } = state;
                const { from, to } = selection;
                state.doc.nodesBetween(from, from === to ? to + 1 : to, (n, p) => {
                    if (marks[markName]?.isInSet(n.marks)) {
                        node = n;
                        pos = p;
                        return false;
                    }
                    return;
                });
                const mark = node?.marks.find(({ type }) => type === markType);

                if (!mark) {
                    dispatch(tr
                        .addMark(state.selection.from, state.selection.to, highlightedTextMark)
                        .setSelection(new TextSelection(tr.selection.$anchor, tr.selection.$head))
                    )

                    return true
                }

                // if highlight exists, and color is the same
                // or highlight exists, and no color is provided
                if (mark.attrs.color === color || !color) { 
                    dispatch(tr.removeMark(state.selection.from, state.selection.to, markType))
                } else { // if highlight exists, but different color
                    dispatch(tr
                        .removeMark(state.selection.from, state.selection.to, markType)
                        .addMark(state.selection.from, state.selection.to, highlightedTextMark)
                        .setSelection(new TextSelection(tr.selection.$anchor, tr.selection.$head))
                    )
                }

                return true
            }),
        ],
        shortcuts: {
            [ToggleHighlightedText]: createShortcut(ToggleHighlightedTextCommandKey, 'Mod-h'),
        },
    };
});

const highlightPlugin = createHighlightPlugin()
export default highlightPlugin