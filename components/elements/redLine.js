import React from 'react'
import Theme from './../theme.js'

export default class extends React.Component {
  render () {
    return (
      <hr style={{
        color: Theme.colors.red,
        backgroundColor: Theme.colors.red,
        border: 0,
        height: 2
      }} />
    )
  }
}
