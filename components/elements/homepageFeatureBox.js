import React from 'react'
import { Col, Popover, OverlayTrigger } from 'react-bootstrap'
import Code from './../code.js'
import Theme from './../theme.js'

export default class FeatureBox extends React.Component {
  render () {
    return (
      <Col md={4} style={{textAlign: 'center'}}>
        <div style={{paddingLeft: 20, paddingRight: 20, paddingBottom: 30}}>
          <img style={{padding: 30}} src={this.props.image} />
          <h2 style={Theme.typeography.h2Alt}>{this.props.title}</h2>
          <p style={{lineHeight: 2}}>{this.props.body}</p>
          <br />
          {
            this.props.code
              ? <OverlayTrigger trigger={['hover', 'focus', 'click']} placement='top' overlay={
                <Popover id={`popover-${this.props.title}`} style={{maxWidth: 600}}>
                  <div style={{paddingTop: 15, paddingLeft: 10, paddingRight: 10, paddingBottom: 6}}>
                    <Code language='javascript'>{this.props.code}</Code>
                  </div>
                </Popover>
              }>
                <p><strong>View Sample</strong></p>
              </OverlayTrigger>
              : null
          }
        </div>
      </Col>
    )
  }
}
