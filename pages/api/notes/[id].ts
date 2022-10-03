import { NextApiRequest, NextApiResponse } from "next";

export default function getNote(req: NextApiRequest, res: NextApiResponse) {
    const { id } = req.query

    res.json({
        id: id,
        title: `This is title for ${id}`,
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
                            "text": "Default content for note:" + id
                        }
                    ]
                }
            ]
        }
    })
}