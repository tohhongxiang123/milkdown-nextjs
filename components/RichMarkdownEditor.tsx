import React from 'react';
import { Editor, rootCtx, themeFactory } from '@milkdown/core';
import { nord, nordLight } from '@milkdown/theme-nord';
import { ReactEditor, useEditor, useNodeCtx } from '@milkdown/react';
import { gfm, codeFence, listItem, SupportedKeys, codeInline } from '@milkdown/preset-gfm';
import { prism } from '@milkdown/plugin-prism';
import { math } from '@milkdown/plugin-math';
import { indent, indentPlugin } from '@milkdown/plugin-indent';
import { clipboard } from '@milkdown/plugin-clipboard';
import { trailing } from '@milkdown/plugin-trailing';
import { history } from '@milkdown/plugin-history';
import { diagram } from '@milkdown/plugin-diagram';
import Head from 'next/head';

const CustomCodeFence = ({ children }: { children: React.ReactNode | React.ReactNode[] }) => {
    const { node } = useNodeCtx()
    return (
        <pre className={`language-${node.attrs.language}`}>
            <code>
                {children}
            </code>
        </pre>
    )
}

const RichMarkdownEditor = () => {
    const { editor } = useEditor((root, renderReact) => {
        const nodes = gfm
            .configure(codeFence, { 
                className: (attrs) => {
                    console.log(attrs)
                    return "language-typescript"
                }
             })
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
            .use(math)
            .use(prism)
            .use(diagram)
            .use(history)
            .use(trailing)
            .use(
                indent.configure(indentPlugin, {
                    type: 'space', // available values: 'tab', 'space',
                    size: 4,
                }),
            )
    });

    return (
        <div className="prose flex flex-col justify-items-center w-full">
            <Head>
                <link
                    rel="stylesheet"
                    href="https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500;700;900&display=swap"
                />

                <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
                <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons+Outlined" />
            </Head>
            <ReactEditor editor={editor} />
        </div>
    )
};

export default RichMarkdownEditor
