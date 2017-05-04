import React from 'react'
import Link from 'next/link'
import { Row, Col, Button } from 'react-bootstrap'
import Page from './../components/layouts/page.js'

import SolutionsGrid from './../components/solutionsGrid.js'

let bigButtonStyle = {maxWidth: 200, margin: '0 auto'}

export default class extends React.Component {
  render () {
    return (
      <Page>
        <Row style={{margin: '0 auto', width: '100%'}}>
          <Col md={4} />
          <Col md={4} style={{textAlign: 'center'}}>
            <img alt='logo' style={{
              width: '100%',
              padding: 30
            }} src='/static/images/logo.png' />
          </Col>
          <Col md={4} />
        </Row>

        <Row style={{padding: '40px'}}>
          <Col md={12} style={{textAlign: 'center'}}>
            <h1>ActionHero</h1>
            <p><em>v17.0.0</em></p>
            <h2>The Reusable, Scalable, and Quick node.js API Server for stateless and stateful applications</h2>
          </Col>
        </Row>

        <Row style={{padding: '40px'}}>
          <Col md={2} />

          <Col md={4}>
            <Link href='/downloads'>
              <a>
                <Button style={bigButtonStyle} bsStyle='primary' bsSize='large' block>Download</Button>
              </a>
            </Link>
          </Col>

          <Col md={4}>
            <Link href='/get-started'>
              <a>
                <Button style={bigButtonStyle} bsStyle='info' bsSize='large' block>Get Started</Button>
              </a>
            </Link>
          </Col>

          <Col md={2} />
        </Row>

        <SolutionsGrid />
      </Page>
    )
  }
}
