import { useEffect } from "react"
import ReactMarkdown from 'react-markdown'
import Prism from 'prismjs';

export default function PrismHigLighter({ markdownContent }) {
  useEffect(() => {
    Prism.highlightAll()
  }, [])

  return (
    <div className="container">
      <ReactMarkdown >{markdownContent}</ReactMarkdown>
    </div>
  )
}
