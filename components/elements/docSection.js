import React from 'react'
import RedLine from './redLine.js'
import Theme from './../theme.js'
import { Waypoint } from 'react-waypoint'

export default class extends React.Component {
  render () {
    const { children, waypointEnter, waypointExit, id, title, parent } = this.props

    let waypointEnterCallback = () => {}
    if (waypointEnter) { waypointEnterCallback = (data) => { waypointEnter.call(parent, id, data) } }

    let waypointExitCallback = () => {}
    if (waypointExit) { waypointExitCallback = (data) => { waypointExit.call(parent, id, data) } }

    return (
      <Waypoint onEnter={waypointEnterCallback} onLeave={waypointExitCallback}>
        <div>
          <br />
          <h2 id={id} style={Theme.typeography.h2}><span style={{ fontWeight: 300, fontSize: 36 }}>{title}</span></h2>
          <RedLine />
          <div style={{
            fontFamily: Theme.fonts.docs
          }}
          >
            {children}
          </div>
        </div>
      </Waypoint>
    )
  }
}
