import { NextApiRequest, NextApiResponse } from "next";

export default function getNote(req: NextApiRequest, res: NextApiResponse) {
    const notes = [...Array(100)].map((_, index) => ({
        id: index,
        title: "Title for note" + index.toString(),
        content: {
            "type": "doc",
            "content": [
                {
                    "type": "heading",
                    "attrs": {
                        "id": "default-content",
                        "level": 1
                    },
                    "content": [
                        {
                            "type": "text",
                            "text": "Default content for note:" + index.toString()
                        }
                    ]
                }
            ]

        }
    }))

    res.json(notes)
}