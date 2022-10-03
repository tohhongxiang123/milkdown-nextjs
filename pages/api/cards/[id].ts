import { NextApiRequest, NextApiResponse } from "next";

export default function getCard(req: NextApiRequest, res: NextApiResponse) {
    const { id } = req.query

    const flashCard = {
        title: `Flashcard ${id}`,
        content: `The content available for flashcard number ${id}`
    }
    
    res.json({ flashCard })
}