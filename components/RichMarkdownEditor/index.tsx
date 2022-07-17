import React, { useEffect, useRef, useState } from 'react';
import { defaultValueCtx, Editor, rootCtx } from '@milkdown/core';
import { nordLight } from '@milkdown/theme-nord';
import { ReactEditor, useEditor, useNodeCtx } from '@milkdown/react';
import { codeFence, gfm, listItem, SupportedKeys, TurnIntoHeading, TurnIntoText } from '@milkdown/preset-gfm';
import { prism } from '@milkdown/plugin-prism';
import { math } from '@milkdown/plugin-math';
import { indent, indentPlugin } from '@milkdown/plugin-indent';
import { clipboard } from '@milkdown/plugin-clipboard';
import { trailing } from '@milkdown/plugin-trailing';
import { history } from '@milkdown/plugin-history';
import { diagram } from '@milkdown/plugin-diagram';
import { slash } from '@milkdown/plugin-slash';
import { tooltip } from '@milkdown/plugin-tooltip';
import { menu, menuPlugin } from '@milkdown/plugin-menu';
import { cursor } from '@milkdown/plugin-cursor';
import { listener, listenerCtx } from '@milkdown/plugin-listener';
import { data as defaultJsonContent } from './defaultJsonContent'
import { placeCaretAtEnd } from './placeCaretAtEnd';

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
            .use(math)
            .use(nordLight)
            .use(clipboard)
            .use(cursor)
            .use(menu)
            .use(prism)
            .use(slash)
            .use(diagram)
            .use(history)
            .use(trailing)
            .use(tooltip)
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

