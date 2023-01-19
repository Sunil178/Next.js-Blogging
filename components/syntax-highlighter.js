import { useEffect, useState } from "react"
import ReactMarkdown from 'react-markdown'
import { Pre, Line, LineNo, LineContent } from "./styles";
import Highlight, { defaultProps } from "prism-react-renderer";
import theme from "prism-react-renderer/themes/nightOwl";

export default function PrismHigLighter({ markdownContent }) {

  /* const MarkdownComponents = {
    code({ node, inline, className, ...props }) {
      return (
        <pre>
          <code className={className} {...props} />
        </pre>
      )
    }
  }

  const [markdownContentState, setmarkdownContentState] = useState('')
  useEffect(() => {
    setmarkdownContentState(markdownContent)
    hljs.initHighlighting();
  }, []) */

  return (
    /*<div className="container">
      <ReactMarkdown components={MarkdownComponents}>{markdownContentState}</ReactMarkdown>
    </div>*/

    <Highlight {...defaultProps} theme={theme} code={markdownContent} language="jsx">
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <Pre className={className} style={style}>
          {tokens.map((line, i) => (
            <Line key={i} {...getLineProps({ line, key: i })}>
              <LineNo>{i + 1}</LineNo>
              <LineContent>
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token, key })} />
                ))}
              </LineContent>
            </Line>
          ))}
        </Pre>
      )}
    </Highlight>
  )
}
