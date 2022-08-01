import React, { useCallback, useEffect, useRef } from 'react';
import { ReactEditor } from '@milkdown/react';
import { placeCaretAtEnd } from './placeCaretAtEnd';
import useRichMarkdownEditor from './useRichMarkdownEditor';
import { data as defaultJsonContent } from './defaultJsonContent'

const RichMarkdownEditor = () => {
    const { editor } = useRichMarkdownEditor()

    const ref = useRef<HTMLDivElement | null>(null)
    useEffect(() => {
        setTimeout(() => {
            if (!ref.current) return

            const editor = ref.current.querySelector(".editor") as HTMLElement | null
            if (!editor) return

            editor.focus()
            placeCaretAtEnd(editor)
        }, 0) // wait for editor to mount before focusing
    }, [])

    return (
        <>
            <div ref={ref} className="prose flex flex-col justify-items-center w-full max-w-full max-h-72">
                <ReactEditor editor={editor} />
            </div>
        </>
    )
};

export default RichMarkdownEditor