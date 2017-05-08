import React from 'react'
import Theme from './../theme.js'

export default class extends React.Component {
  render () {
    return (
      <div>
        <img src='/static/images/actionhero-logo-footer.svg' style={{float: 'left', marginTop: 10}} />
        <h3 style={{
          color: Theme.colors.yellow,
          float: 'left',
          paddingLeft: 20,
          fontWeight: 500,
          fontFamily: Theme.fonts.main,
          letterSpacing: '0.3em'
        }}>ACTIONHERO</h3>
      </div>
    )
  }
}
