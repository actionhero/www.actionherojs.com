import React from 'react'
import { Col, Popover, OverlayTrigger } from 'react-bootstrap'
import Code from './../code.js'

export default class FeatureBox extends React.Component {
  render () {
    return (
      <Col md={4} style={{textAlign: 'center'}}>
        <img style={{padding: 40}} src={this.props.image} />
        <h2 style={{fontWeight: 200}}>{this.props.title}</h2>
        <br />
        <p>{this.props.body}</p>
        <br />
        {
          this.props.code
          ? <OverlayTrigger trigger={['hover', 'focus', 'click']} placement='top' overlay={
            <Popover title='Code Sample' style={{maxWidth: 500}}>
              <Code language='javascript'>{this.props.code}</Code>
            </Popover>
          }>
            <p><strong>View Sample</strong></p>
          </OverlayTrigger>
          : null
        }
      </Col>
    )
  }
}
