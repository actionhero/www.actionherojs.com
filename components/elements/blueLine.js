import React from 'react'
import Theme from './../theme.js'

export default class extends React.Component {
  render () {
    return (
      <hr style={{
        color: Theme.colors.blue,
        backgroundColor: Theme.colors.blue,
        border: 0,
        height: 2
      }} />
    )
  }
}
