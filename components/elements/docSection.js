import React from 'react'
import RedLine from './redLine.js'

// import * as Waypoint from 'react-waypoint'
const Waypoint = require('react-waypoint')

export default class extends React.Component {
  render () {
    const { children, waypointEnter, waypointExit, id, title, parent } = this.props

    let waypointEnterCallback = () => {}
    if (waypointEnter) { waypointEnterCallback = (data) => { waypointEnter.call(parent, id, data) } }

    let waypointExitCallback = () => {}
    if (waypointExit) { waypointExitCallback = (data) => { waypointExit.call(parent, id, data) } }

    let headerStyle = {
      fontWeight: 200
    }

    return (
      <Waypoint onEnter={waypointEnterCallback} onLeave={waypointExitCallback}>
        <div>
          <h2 id={id} style={headerStyle}>{title}</h2>
          <RedLine />
          {children}
        </div>
      </Waypoint>
    )
  }
}
