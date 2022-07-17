import { useNodeCtx } from "@milkdown/react"

const CodeFence = ({ children, ...props }: any) => {
    const { node } = useNodeCtx()

    return (
        <pre>
            <code className={`language-${node.attrs.language}`}>{children}</code>
        </pre>
    )
}

export default CodeFence