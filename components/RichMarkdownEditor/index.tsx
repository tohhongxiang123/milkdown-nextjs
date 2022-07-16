import React from 'react';
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
import Head from 'next/head';

const RichMarkdownEditor = () => {
    const { editor, getDom } = useEditor((root, renderReact) => {
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

    return (
        <div className="prose flex flex-col justify-items-center w-full">
            <ReactEditor editor={editor} />
            <button onClick={() => console.log(editor.dom)}>Get DOM</button>
        </div>
    )
};

export default RichMarkdownEditor
