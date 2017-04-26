import React from 'react'
import { Row, Col } from 'react-bootstrap'
import Page from './../components/layouts/page.js'

export default class extends React.Component {
  render () {
    return (
      <Page>
        <Row>
          <Col md={12} style={{textAlign: 'center'}}>
            <h1>ActionHero Docs</h1>
          </Col>
        </Row>
      </Page>
    )
  }
}
