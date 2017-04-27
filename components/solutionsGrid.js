import React from 'react'
import Link from 'next/link'
import { Row, Col, Panel, Button } from 'react-bootstrap'

export default class extends React.Component {
  render () {
    return (
      <Row>
        <Col md={12}>
          <hr />
        </Col>

        <Col md={4}>
          <Panel header='Open Source' bsStyle='info'>
            <ul>
              <li>The ActionHero server is open source, under the Apache-2 license</li>
              <li>ActionHero runs on Linux, OS X, and Windows</li>
              <li>You always have access to the ActionHero team via <Link href='/community'><a>Slack and Github</a></Link></li>
            </ul>

            <Link href='/downloads'>
              <a>
                <Button style={{maxWidth: 400, margin: '0 auto'}} bsStyle='info' bsSize='large' block>Download</Button>
              </a>
            </Link>
          </Panel>
        </Col>

        <Col md={4}>
          <Panel header='Premium Training & Review' bsStyle='primary'>
            <ul>
              <li>We provide support for corperate & nonprofit customers starting at a flat rate of $150/hr.</li>
              <li>Our services include:</li>
              <ul>
                <li>Remote training for your team</li>
                <li>Code Reviews</li>
                <li>Best Practices Audits</li>
                <li>Custom plugin & Feature Development</li>
              </ul>
              <li>We have packages appropriate for all company sizes.  Contact us to learn more.</li>
            </ul>

            <Button style={{maxWidth: 400, margin: '0 auto'}} bsStyle='primary' bsSize='large' block>Contact Us</Button>
          </Panel>
        </Col>

        <Col md={4}>
          <Panel header='Enterprise' bsStyle='success'>
            <ul>
              <li>For larger customers in need of a support contract, we offer an enterprise plan including everything in the Premium plan plus</li>
              <li>24/7 access to core members of the ActionHero Team</li>
              <li>Emergency response packages</li>
              <li>Deployment support</li>
              <li>...and custom development against Actionhero’s core as needed.</li>
            </ul>

            <Button style={{maxWidth: 400, margin: '0 auto'}} bsStyle='success' bsSize='large' block>Contact Us</Button>
          </Panel>
        </Col>
      </Row>
    )
  }
}
