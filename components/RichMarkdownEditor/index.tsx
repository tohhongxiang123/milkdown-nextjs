import React, { useEffect, useRef } from 'react';
import { ReactEditor } from '@milkdown/react';
import { placeCaretAtEnd } from './placeCaretAtEnd';
import useRichMarkdownEditor from './useRichMarkdownEditor';
import { data } from './defaultJsonContent';

const RichMarkdownEditor = () => {
    const { editor } = useRichMarkdownEditor({ initialContentJSON: data })

    const ref = useRef<HTMLDivElement | null>(null)
    useEffect(() => {
        setTimeout(() => {
            if (!ref.current) return

            const editor = ref.current.querySelector(".editor") as HTMLElement | null
            if (!editor) return

            editor.focus()
            placeCaretAtEnd(editor)

            // used to make sure editor can scroll, while keeping menu sticky on top
            const editorWrapperDiv = ref.current.children[0] as HTMLElement | null
            if (!editorWrapperDiv) return
            editorWrapperDiv.style.height = "100%"
            editorWrapperDiv.style.display = "flex"
            editorWrapperDiv.style.height = "inherit"
            editorWrapperDiv.style.width = "inherit"
        }, 0) // wait for editor to mount before focusing
    }, [])

    return (
        <div ref={ref} className="prose flex flex-col justify-items-center w-full max-w-full h-full overflow-y-hidden relative">
            <ReactEditor editor={editor} />
        </div>
    )
};

export default RichMarkdownEditor