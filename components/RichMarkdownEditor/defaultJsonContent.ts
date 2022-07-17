const data = {
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
          "text": "Default content"
        }
      ]
    },
    {
      "type": "bullet_list",
      "content": [
        {
          "type": "list_item",
          "content": [
            {
              "type": "paragraph",
              "content": [
                {
                  "type": "text",
                  "text": "1"
                }
              ]
            }
          ]
        },
        {
          "type": "list_item",
          "content": [
            {
              "type": "paragraph",
              "content": [
                {
                  "type": "text",
                  "text": "2"
                }
              ]
            }
          ]
        },
        {
          "type": "list_item",
          "content": [
            {
              "type": "paragraph",
              "content": [
                {
                  "type": "text",
                  "text": "3"
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "type": "fence",
      "attrs": {
        "language": "typescript",
        "fold": true
      },
      "content": [
        {
          "type": "text",
          "text": "function foo() {\n    return \"bar\"\n}"
        }
      ]
    },
    {
      "type": "math_block",
      "attrs": {
        "value": ""
      },
      "content": [
        {
          "type": "text",
          "text": "\\sqrt{2} + \\sum_{i=1}^{\\infty} \\frac{1}{n^2} = \\iint \\Gamma(x) dx"
        }
      ]
    },
    {
      "type": "paragraph"
    }
  ]
}

export { data }