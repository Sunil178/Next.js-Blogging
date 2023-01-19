import { useEffect, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter'
import rangeParser from 'parse-numeric-range'
import { oneDark } from 'react-syntax-highlighter/dist/cjs/styles/prism'

export default function PrismHigLighter({ markdownContent }) {
  const syntaxTheme = oneDark
  const MarkdownComponents = {
    code({ node, inline, className, ...props }) {

      const match = /language-(\w+)/.exec(className || '')
      const hasMeta = node?.data?.meta

      const applyHighlights = (applyHighlights) => {
        if (hasMeta) {
          const RE = /{([\d,-]+)}/
          const metadata = node.data.meta?.replace(/\s/g, '')
          const strlineNumbers = RE?.test(metadata)
            ? RE?.exec(metadata)[1]
            : '0'
          const highlightLines = rangeParser(strlineNumbers)
          const highlight = highlightLines
          const data = highlight.includes(applyHighlights)
            ? 'highlight'
            : null
          return { data }
        } else {
          return {}
        }
      }

      return match ? (
        <SyntaxHighlighter
          style={syntaxTheme}
          language={match[1]}
          PreTag="div"
          className="codeStyle"
          showLineNumbers={true}
          wrapLines={hasMeta ? true : false}
          useInlineStyles={true}
          lineProps={applyHighlights}
          {...props}
        />
      ) : (
        <code className={className} {...props} />
      )
    },
  }

  const [markdownContentState, setmarkdownContentState] = useState('')
  useEffect(() => setmarkdownContentState(markdownContent), [])
  return (
    <div className="container">
      <ReactMarkdown components={MarkdownComponents}>{markdownContentState}</ReactMarkdown>
    </div>
  )
}
