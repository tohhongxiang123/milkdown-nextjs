import React from 'react';
import { Editor, rootCtx } from '@milkdown/core';
import { nord } from '@milkdown/theme-nord';
import { ReactEditor, useEditor, useNodeCtx } from '@milkdown/react';
import { gfm, codeFence } from '@milkdown/preset-gfm';
import { prism } from '@milkdown/plugin-prism';
import { math } from '@milkdown/plugin-math';
import { indent, indentPlugin } from '@milkdown/plugin-indent';
import { clipboard } from '@milkdown/plugin-clipboard';
import { trailing } from '@milkdown/plugin-trailing';
import { history } from '@milkdown/plugin-history';
import { diagram } from '@milkdown/plugin-diagram';

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
        const nodes = gfm.configure(codeFence, { view: renderReact(CustomCodeFence) })

        return Editor.make()
            .config((ctx) => {
                ctx.set(rootCtx, root);
            })
            .use(nodes)
            .use(nord)
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
        <>
            <ReactEditor editor={editor} />
        </>
    )
};

export default RichMarkdownEditor
