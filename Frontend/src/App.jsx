import { useState, useEffect } from 'react'
import "prismjs/themes/prism-tomorrow.css"
import Editor from "react-simple-code-editor" //
import prism from "prismjs" // Import PrismJS for syntax highlighting
import Markdown from "react-markdown" // Import React Markdown for rendering markdown content
import rehypeHighlight from "rehype-highlight"; // Import rehype-highlight for syntax highlighting in markdown
import "highlight.js/styles/github-dark.css";
import axios from 'axios'  // Import axios for making HTTP requests and for connecting backend to frontend
import './App.css'

function App() {
  const [ count, setCount ] = useState(0)
  const [ code, setCode ] = useState(` function sum() {
  return 1 + 1
}`)  //

  const [ review, setReview ] = useState(``) // State to hold the review content

  useEffect(() => {
    prism.highlightAll()
  }, []) // Highlight all code blocks on initial render

  async function reviewCode() {
    const response = await axios.post('http://localhost:3000/ai/get-review', { code }) //
    setReview(response.data)
  }

  return (
    <>
      <main>
        <div className="left">
          <div className="code">
            <Editor
              value={code}
              onValueChange={code => setCode(code)}
              highlight={code => prism.highlight(code, prism.languages.javascript, "javascript")}
              padding={10}
              style={{
                fontFamily: '"Fira code", "Fira Mono", monospace',
                fontSize: 16,
                border: "1px solid #ddd",
                borderRadius: "5px",
                height: "100%",
                width: "100%"
              }}
            />
          </div>
          <div
            onClick={reviewCode}
            className="review">Review</div>
        </div>
        <div className="right">
          <Markdown

            rehypePlugins={[ rehypeHighlight ]}

          >{review}</Markdown>
        </div>
      </main>
    </>
  )
}



export default App