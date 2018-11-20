import React from 'react'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { docco } from 'react-syntax-highlighter/styles/hljs'

export default class extends React.Component {
  render () {
    let language = this.props.language || 'javascript'
    let showLineNumbers = this.props.showLineNumbers || false

    return (
      <SyntaxHighlighter
        language={language}
        style={docco}
        showLineNumbers={showLineNumbers}
      >
        { this.props.children }
      </SyntaxHighlighter>
    )
  }
}
