import React from 'react'
import { Row, Col } from 'react-bootstrap'
import Page from './../components/layouts/page.js'

import SolutionsGrid from './../components/solutionsGrid.js'

export default class extends React.Component {
  render () {
    return (
      <Page>
        <Row>
          <Col md={12} style={{textAlign: 'center'}}>
            <h1>Get Started with ActionHero</h1>
          </Col>
        </Row>

        <SolutionsGrid />
      </Page>
    )
  }
}
