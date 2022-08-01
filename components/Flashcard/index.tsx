export interface FlashCardProps {
    title: string,
    content: string
}

export default function FlashCard({ title, content } : FlashCardProps) {
    return (
        <div className="px-4 py-8 rounded shadow-sm hover:shadow-md h-full">
            <p className="text-xl mb-4"><strong>{title}</strong></p>
            <p className="opacity-70 line-clamp-4">{content}</p>
        </div>
    )
}