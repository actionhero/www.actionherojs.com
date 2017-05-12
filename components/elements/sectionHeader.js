import React from 'react'

import RedLine from './redLine.js'

export default class extends React.Component {
  render () {
    return (
      <div>
        <h2 id={this.props.id} style={{fontWeight: 200}}>{this.props.children}</h2>
        <RedLine />
      </div>
    )
  }
}
