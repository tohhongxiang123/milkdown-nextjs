import React, { useEffect, useRef, useState } from 'react';
import { defaultValueCtx, Editor, editorCtx, rootCtx, schemaCtx } from '@milkdown/core';
import { ReactEditor, useEditor } from '@milkdown/react';
import { gfm, listItem, SupportedKeys } from '@milkdown/preset-gfm';
import { prism } from '@milkdown/plugin-prism';
import { math } from '@milkdown/plugin-math';
import { indent, indentPlugin } from '@milkdown/plugin-indent';
import { clipboard } from '@milkdown/plugin-clipboard';
import { trailing } from '@milkdown/plugin-trailing';
import { history } from '@milkdown/plugin-history';
import { diagram } from '@milkdown/plugin-diagram';
import { slash } from '@milkdown/plugin-slash';
import { createToggleIcon, defaultButtons, tooltip, tooltipPlugin } from '@milkdown/plugin-tooltip';
import { menu, menuPlugin } from '@milkdown/plugin-menu';
import { cursor } from '@milkdown/plugin-cursor';
import { listener, listenerCtx } from '@milkdown/plugin-listener';
import { data as defaultJsonContent } from './defaultJsonContent'
import { placeCaretAtEnd } from './placeCaretAtEnd';
import highlightPlugin, { ToggleHighlightedText } from './highlightPlugin';
import { defaultConfig } from '@milkdown/plugin-menu'
import customTheme from './customTheme';

const RichMarkdownEditor = () => {
    const [markdownOutput, setMarkdownOutput] = useState('')
    const [jsonOutput, setJsonOutput] = useState({})

    const { editor } = useEditor((root, renderReact) => {
        const nodes = gfm
            .configure(listItem, {
                keymap: {
                    [SupportedKeys.SinkListItem]: 'Tab',
                    [SupportedKeys.LiftListItem]: 'Shift-Tab'
                }
            });

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

    const ref = useRef<HTMLDivElement | null>(null)
    useEffect(() => {
        setTimeout(() => {
            if (ref.current) {
                const editor = ref.current.querySelector(".editor") as HTMLElement | null

                if (editor) {
                    editor.focus()
                    placeCaretAtEnd(editor)
                }
            }
        }, 0) // wait for editor to mount before focusing
    }, [])

    return (
        <>
            <div ref={ref} className="prose flex flex-col justify-items-center w-full max-w-full">
                <ReactEditor editor={editor} />
            </div>
        </>
    )
};

export default RichMarkdownEditor

