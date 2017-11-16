import React from 'react'
import SyntaxHighlighter from 'react-syntax-highlighter'
// import { github } from 'react-syntax-highlighter/dist/styles'
import { prism } from 'react-syntax-highlighter/styles/prism'

export default class extends React.Component {
  render () {
    let language = this.props.language || 'javascript'
    let showLineNumbers = this.props.showLineNumbers || false

    return (
      <SyntaxHighlighter
        language={language}
        style={prism.ghcolors}
        showLineNumbers={showLineNumbers}
      >
        { this.props.children }
      </SyntaxHighlighter>
    )
  }
}
