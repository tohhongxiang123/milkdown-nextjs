import React from 'react';
import { Editor, rootCtx } from '@milkdown/core';
import { nord } from '@milkdown/theme-nord';
import { ReactEditor, useEditor } from '@milkdown/react';
import { gfm } from '@milkdown/preset-gfm';
import { prism } from '@milkdown/plugin-prism';
import { math } from '@milkdown/plugin-math';

const RichMarkdownEditor = () => {
    const editor = useEditor((root) =>
        Editor.make()
            .config((ctx) => {
                ctx.set(rootCtx, root);
            })
            .use(nord)
            .use(gfm)
            .use(math)
            .use(prism)
    );

    return (
        <>
            <ReactEditor editor={editor as any} />
        </>
    )
};

export default RichMarkdownEditor
