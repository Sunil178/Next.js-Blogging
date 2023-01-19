import { useEffect, useState } from "react"
import ReactMarkdown from 'react-markdown'
import { Pre, Line, LineNo, LineContent } from "./styles";
import Highlight, { defaultProps } from "prism-react-renderer";
import theme from "prism-react-renderer/themes/nightOwl";

export default function PrismHigLighter({ codeblock, language }) {

  const [codeBlockState, setcodeBlockState] = useState('')
  useEffect(() => setcodeBlockState(codeblock), [])

  return (
    <Highlight {...defaultProps} theme={theme} code={codeBlockState} language={language}>
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
