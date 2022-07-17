interface HighlightedTextProps {
    children: React.ReactNode | React.ReactNode[],
    color: string
}

export default function HighlightedText({ children, color } : HighlightedTextProps) {
    return (
        <span style={{ backgroundColor: color }}>
            {children}
        </span>
    )
}