import { useEffect, useState } from "react"
import ReactMarkdown from 'react-markdown'
import Prism from 'prismjs'
import 'plugin/prism-line-numbers.min.js'

export default function PrismHigLighter({ markdownContent }) {

  console.log(markdownContent);

  const MarkdownComponents = {
    code({ node, inline, className, ...props }) {
      return (
        <pre>
          <code className={className} {...props} />
        </pre>
      )
    }
  }

  useEffect(() => {
    const list = document.querySelectorAll('pre')
    for (let i = 0; i < list.length; i++) {
      console.log(list[i]);
      list[i].classList.add('line-numbers')
    }
    Prism.highlightAll()
  }, [markdownContent])


  return (
    <div className="container">
      <ReactMarkdown components={MarkdownComponents}>{markdownContent}</ReactMarkdown>
    </div>
  )
}
