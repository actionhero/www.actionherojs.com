import React from 'react'
import Link from 'next/link'
import { Row, Col, Panel, Button, Modal, FormGroup, ControlLabel, FormControl, HelpBlock } from 'react-bootstrap'
import SuccessAlert from './alerts/success.js'

function FieldGroup ({ id, label, help, ...props }) {
  return (
    <FormGroup controlId={id}>
      <ControlLabel>{label}</ControlLabel>
      <FormControl {...props} />
      {help && <HelpBlock>{help}</HelpBlock>}
    </FormGroup>
  )
}

export default class extends React.Component {
  constructor () {
    super()
    this.state = {
      showModal: false,
      successMessage: null
    }
  }

  showModal () {
    this.setState({showModal: true})
  }

  hideModal () {
    this.setState({showModal: false})
  }

  // handleChange (event) {
  //   let change = {}
  //   change[event.target.id] = event.target.value
  //   this.setState(change)
  // }

  // submitForm () {
  //   fetch(this.state.url, {
  //     method: 'POST',
  //     body: new FormData(this.state)
  //   }).then((response) => {
  //     console.log(response)
  //     this.setState({
  //       showModal: false,
  //       successMessage: 'Thank You.  We will be in touch soon!'
  //     })
  //   })
  // }

  render () {
    return (
      <Row>
        <Col md={12}>
          <hr />
          <SuccessAlert message={this.state.successMessage} />
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

            <Button onClick={this.showModal.bind(this)} style={{maxWidth: 400, margin: '0 auto'}} bsStyle='primary' bsSize='large' block>Contact Us</Button>
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

            <Button onClick={this.showModal.bind(this)} style={{maxWidth: 400, margin: '0 auto'}} bsStyle='success' bsSize='large' block>Contact Us</Button>
          </Panel>
        </Col>

        <Modal show={this.state.showModal} onHide={this.hideModal.bind(this)}>
          <form action='//delicioushat.us15.list-manage.com/subscribe/post?u=bbdc9a683c995f14392f649f4&amp;id=b2867a5444' method='post' id='mc-embedded-subscribe-form' name='mc-embedded-subscribe-form' className='validate' target='_blank' noValidate>
            <Modal.Header>
              <Modal.Title>ActionHero Professional Services</Modal.Title>
              <FieldGroup name='NAME' id='mce-NAME' type='text' label='Name' placeholder='Enter your name' />
              <FieldGroup name='COMPANY' id='mce-COMPANY' type='text' label='Company' placeholder='Your company' />
              <FieldGroup name='EMAIL' id='mce-EMAIL' type='email' label='Email address' placeholder='Enter email' />
              <FieldGroup name='PHONE' id='mce-PHONE' type='text' label='Phone Number' placeholder='xxx.xxx.xxxx' />
            </Modal.Header>

            <Modal.Body>
              <p>The ActionHero team is looking forward to working with you.  We will respond to your inquiry within 2 busniess days.</p>
            </Modal.Body>

            <Modal.Footer>
              <Button onClick={this.hideModal.bind(this)}>Close</Button>
              <Button type='submit' bsStyle='primary'>Submit</Button>
            </Modal.Footer>
          </form>
        </Modal>
      </Row>
    )
  }
}
