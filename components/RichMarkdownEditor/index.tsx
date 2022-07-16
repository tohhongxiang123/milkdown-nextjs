import React, { useEffect, useRef, useState } from 'react';
import { Editor, rootCtx } from '@milkdown/core';
import { nordLight } from '@milkdown/theme-nord';
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
import { tooltip } from '@milkdown/plugin-tooltip';
import { menu } from '@milkdown/plugin-menu';
import { cursor } from '@milkdown/plugin-cursor';
import { listener, listenerCtx } from '@milkdown/plugin-listener';

const RichMarkdownEditor = () => {
    const [output, setOutput] = useState('')
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
                ctx.set(rootCtx, root);
            })
            .config((ctx) => {
                ctx.get(listenerCtx).markdownUpdated((ctx, markdown, previousMarkdown) => {
                    setOutput(markdown)
                })
            })
            .use(listener)
            .use(nodes)
            .use(nordLight)
            .use(clipboard)
            .use(cursor)
            .use(math)
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
                }
            }
        }, 0) // wait for editor to mount before focusing
    }, [])

    return (
        <>
            <div ref={ref} className="flex flex-col justify-items-center w-full">
                <ReactEditor editor={editor} />
            </div>
        </>
    )
};

export default RichMarkdownEditor
