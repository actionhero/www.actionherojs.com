import React from 'react'
import Link from 'next/link'
import { Row, Col, Panel, Button } from 'react-bootstrap'
import Page from './../components/layouts/page.js'

import SolutionsGrid from './../components/solutionsGrid.js'

export default class extends React.Component {
  render () {
    return (
      <Page>
        <Row>
          <Col md={12} style={{textAlign: 'center'}}>
            <h1>ActionHero Docs</h1>
            <p>The ActionHero documentation is divided into three parts</p>
          </Col>
        </Row>

        <Row>
          <Col md={4}>
            <Panel header='Core'>
              <p>The core methods of ActionHero.  This section is for application developers who are implanting an API for thier application.</p>
              <Link href='/docs/core/actions'>
                <a><Button bsStyle='info' bsSize='large' block>Core</Button></a>
              </Link>
            </Panel>
          </Col>

          <Col md={4}>
            <Panel header='Servers'>
              <p>The in-depth details of the 3 types of servers which come with ActionHero: Web, WebSocket, and Socket (TCP).  The specifics of each type of connection and the limitations of each can be found here.</p>
              <Link href='/docs/servers'>
                <a><Button bsStyle='info' bsSize='large' block>Servers</Button></a>
              </Link>
            </Panel>
          </Col>

          <Col md={4}>
            <Panel header='Deployment & Testing'>
              <p>Operational and Test considerations for ActionHero.  Best practices and upgrade paths can be found here.</p>
              <Link href='/docs/operations'>
                <a><Button bsStyle='info' bsSize='large' block>Operations</Button></a>
              </Link>
            </Panel>
          </Col>
        </Row>

        <SolutionsGrid />
      </Page>
    )
  }
}
