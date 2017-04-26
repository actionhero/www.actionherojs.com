import React from 'react'
import Link from 'next/link'
import { Row, Col, Button } from 'react-bootstrap'
import Page from './../components/layouts/page.js'

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

        <Row>
          <Col md={12} style={{textAlign: 'center'}}>
            <h1>Hello</h1>
            <p>
              <em>words</em>
            </p>
            <div style={{textAlign: 'center', width: '100%', padding: 50}}>
              <Link href='/get'>
                <a>
                  <Button style={{maxWidth: 400, margin: '0 auto'}} bsStyle='primary' bsSize='large' block>button</Button>
                </a>
              </Link>
            </div>
          </Col>
        </Row>
      </Page>
    )
  }
}
