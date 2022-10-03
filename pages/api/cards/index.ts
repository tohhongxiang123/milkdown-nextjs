import { NextApiRequest, NextApiResponse } from "next";

export default function getCards(req: NextApiRequest, res: NextApiResponse) {
    const flashCards = [...Array(100)].map((_, id) => ({
        id: id,
        title: `Flashcard ${id}`,
        content: `The content available for flashcard number ${id}`
    }))

    res.json(flashCards)
}