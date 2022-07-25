import { Editor, rootCtx, defaultValueCtx, schemaCtx, JSONRecord } from "@milkdown/core";
import { clipboard } from "@milkdown/plugin-clipboard";
import { cursor } from "@milkdown/plugin-cursor";
import { diagram } from "@milkdown/plugin-diagram";
import { indent, indentPlugin } from "@milkdown/plugin-indent";
import { listenerCtx, listener } from "@milkdown/plugin-listener";
import { math } from "@milkdown/plugin-math";
import { menu, menuPlugin, defaultConfig } from "@milkdown/plugin-menu";
import { prism } from "@milkdown/plugin-prism";
import { slash } from "@milkdown/plugin-slash";
import { tooltip, tooltipPlugin, defaultButtons, createToggleIcon } from "@milkdown/plugin-tooltip";
import { trailing } from "@milkdown/plugin-trailing";
import { listItem } from "@milkdown/preset-commonmark";
import { gfm, SupportedKeys } from "@milkdown/preset-gfm";
import { useEditor } from "@milkdown/react";
import { useState } from "react";
import customTheme from "./customTheme";
import { data as defaultJsonContent } from './defaultJsonContent'
import highlightPlugin, { ToggleHighlightedText } from "./highlightPlugin";
import { history } from '@milkdown/plugin-history';

export default function useRichMarkdownEditor() {
    const [markdownOutput, setMarkdownOutput] = useState('')
    const [jsonOutput, setJsonOutput] = useState<JSONRecord>({})

    const { editor } = useEditor((root, renderReact) => {
        const nodes = gfm
            .configure(listItem, {
                keymap: {
                    [SupportedKeys.SinkListItem]: 'Tab',
                    [SupportedKeys.LiftListItem]: 'Shift-Tab'
                }
            })

        return Editor.make()
            .config((ctx) => {
                ctx.set(rootCtx, root)
                ctx.set(defaultValueCtx, { type: "json", value: defaultJsonContent as any }) // make sure editor mounted before setting content
            })
            .config((ctx) => {
                ctx.get(listenerCtx)
                    .markdownUpdated((ctx, markdown, previousMarkdown) => {
                        setMarkdownOutput(markdown)
                    })
                    .updated((ctx, doc, prevDoc) => {
                        const jsonContent = doc.toJSON()
                        setJsonOutput(jsonContent)
                    })
            })
            .use(listener)
            .use(nodes)
            .use(customTheme)
            .use(highlightPlugin)
            .use(math)
            .use(clipboard)
            .use(cursor)
            .use(menu.configure(menuPlugin, {
                config: [
                    ...defaultConfig,
                    [
                        {
                            type: 'button',
                            icon: 'highlight' as any,
                            key: ToggleHighlightedText,
                        },
                        {
                            type: 'select',
                            text: 'Color',
                            options: [
                                { id: 'green', text: 'Green' },
                                { id: 'red', text: 'Red' },
                                { id: 'blue', text: 'Blue' },
                                { id: 'yellow', text: 'Yellow' },
                                { id: 'remove-color', text: 'Remove Highlight' }
                            ],
                            onSelect: color => {
                                if (color === 'remove-color') {
                                    return [ToggleHighlightedText, null]
                                }

                                return color ? [ToggleHighlightedText, color] : [ToggleHighlightedText, null]
                            }
                        }
                    ]
                ]
            }))
            .use(prism)
            .use(slash)
            .use(diagram)
            .use(history)
            .use(trailing)
            .use(tooltip.configure(tooltipPlugin, {
                items: (ctx) => {
                    const marks = ctx.get(schemaCtx).marks

                    return [
                        ...defaultButtons(ctx),
                        createToggleIcon('highlight' as any, ToggleHighlightedText, marks['highlighted-text'], marks['code_inline']),
                    ]
                }
            }))
            .use(
                indent.configure(indentPlugin, {
                    type: 'space',
                    size: 4,
                }),
            )
    });

    return { jsonOutput, markdownOutput, editor }
}