import React from 'react'
import Link from 'next/link'
import { Button } from 'react-bootstrap'

import Theme from './../theme.js'

export default class extends React.Component {
  constructor () {
    super()
    this.state = { mouseDown: false }
  }

  onMouseDown () {
    this.setState({ mouseDown: true })
  }

  onMouseUp () {
    this.setState({ mouseDown: false })
  }

  render () {
    const style = Theme.buttons.header(this.props.backgroundColor, this.props.textColor)

    if (this.state.mouseDown === true) {
      style.filter = 'brightness(85%)'
    }

    return (
      <div onMouseDown={() => { this.onMouseDown() }} onMouseUp={() => { this.onMouseUp() }}>
        <Link href={this.props.href}>
          <a style={{ textDecoration: 'none' }}>
            <Button
              style={style}
              bsSize={(this.props.bsSize || 'large')}
              block
            >
              {this.props.children}
            </Button>
          </a>
        </Link>
      </div>
    )
  }
}
