import React from 'react'
import Link from 'next/link'
import { Grid, Row, Col, Button, Modal, FormGroup, ControlLabel, FormControl } from 'react-bootstrap'

import Theme from './theme.js'
import SuccessAlert from './alerts/success.js'
import RedLine from './elements/redLine.js'
import DocSection from './elements/docSection.js'

function FieldGroup ({ id, label, ...props }) {
  return (
    <FormGroup controlId={id}>
      <ControlLabel>{label}</ControlLabel>
      <FormControl {...props} />
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

  render () {
    return (
      <div style={{
        backgroundColor: Theme.colors.blueGray,
        color: Theme.colors.lightGray,
        fontWeight: 200,
        paddingTop: 50,
        paddingBottom: 50
      }}>
        <Grid>
          <Row>
            <Col md={12} style={{
              textAlign: 'center',
              color: Theme.colors.yellow,
              paddingBottom: 100
            }}>
              <SuccessAlert message={this.state.successMessage} />
              <h1>Solutions</h1>
              <br />
              <p>ActionHero was built from the ground up to include all the features you expect from a modern API framework.</p>
            </Col>

            <Col md={4}>
              <div style={{
                width: '100%',
                padding: 20,
                backgroundColor: Theme.colors.yellow,
                boxShadow: '3px 3px 5px #222222'
              }}>
                <div style={{textAlign: 'center'}}><h2>Open Source</h2></div>
                <RedLine />
                <p>The ActionHero server is open source, under the Apache-2 license</p>
                <RedLine />
                <p>ActionHero runs on Linux, OS X, and Windows</p>
                <RedLine />
                <p>You always have access to the ActionHero team via <Link href='/community'><a>Slack and Github</a></Link></p>
                <br />
                <br />
                <br />
                <br />
                <Link href='/downloads'>
                  <a>
                    <Button style={Theme.buttons.big(Theme.colors.red, Theme.colors.yellow)} bsSize='large' block>Download</Button>
                  </a>
                </Link>
              </div>
            </Col>

            <Col md={4} className='hidden-md hidden-lg hidden-xl'>
              <div style={{
                width: '100%',
                padding: 20,
                backgroundColor: Theme.colors.blue,
                color: Theme.colors.yellow,
                boxShadow: '3px 3px 5px #222222'
              }}>
                <div style={{textAlign: 'center'}}>
                  <img src='/static/images/dog.svg' />
                  <h2>Premium Training & Review</h2>
                </div>
                <RedLine />
                <p>We provide support for corperate & nonprofit customers starting at a flat rate of $150/hr.  Our services include:</p>
                <RedLine />
                <ul>
                  <li><strong>Remote training for your team</strong></li>
                  <li><strong>Code Reviews</strong></li>
                  <li><strong>Best Practices Audits</strong></li>
                  <li><strong>Custom plugin & Feature Development</strong></li>
                </ul>
                <RedLine />
                <p>We have packages appropriate for all company sizes.  Contact us to learn more.</p>
                <br />
                <br />
                <br />
                <br />
                <Button onClick={this.showModal.bind(this)} style={Theme.buttons.big(Theme.colors.red, Theme.colors.yellow)} bsSize='large' block>Contact Us</Button>
              </div>
            </Col>

            <Col md={4} className='hidden-xs hidden-sm'>
              <div style={{
                width: '125%',
                padding: 20,
                backgroundColor: Theme.colors.blue,
                color: Theme.colors.yellow,
                position: 'relative',
                top: -50,
                boxShadow: '3px 3px 5px #222222',
                marginLeft: '-13%',
                marginRight: '-5%',
                zIndex: 10
              }}>
                <div style={{textAlign: 'center'}}>
                  <img src='/static/images/dog.svg' />
                  <h2>Premium Training & Review</h2>
                </div>
                <RedLine />
                <p>We provide support for corperate & nonprofit customers starting at a flat rate of $150/hr.  Our services include:</p>
                <RedLine />
                <ul>
                  <li><strong>Remote training for your team</strong></li>
                  <li><strong>Code Reviews</strong></li>
                  <li><strong>Best Practices Audits</strong></li>
                  <li><strong>Custom plugin & Feature Development</strong></li>
                </ul>
                <RedLine />
                <p>We have packages appropriate for all company sizes.  Contact us to learn more.</p>
                <br />
                <br />
                <br />
                <br />
                <Button onClick={this.showModal.bind(this)} style={Theme.buttons.big(Theme.colors.red, Theme.colors.yellow)} bsSize='large' block>Contact Us</Button>
              </div>
            </Col>

            <Col md={4}>
              <div style={{
                width: '100%',
                padding: 20,
                backgroundColor: Theme.colors.yellow,
                boxShadow: '3px 3px 5px #222222'
              }}>
                <div style={{textAlign: 'center'}}><h2>Enterprise</h2></div>
                <RedLine />
                <p>For larger customers in need of a support contract, we offer an enterprise plan including everything in the Premium plan plus:</p>
                <RedLine />
                <ul>
                  <li><strong>24/7 access to core members of the ActionHero Team</strong></li>
                  <li><strong>Emergency response packages</strong></li>
                  <li><strong>Deployment support</strong></li>
                  <li><strong>...and custom development against Actionhero’s core as needed.</strong></li>
                </ul>
                <br />
                <br />
                <br />
                <Button onClick={this.showModal.bind(this)} style={Theme.buttons.big(Theme.colors.red, Theme.colors.yellow)} bsSize='large' block>Contact Us</Button>
              </div>
            </Col>

            <Modal show={this.state.showModal} onHide={this.hideModal.bind(this)}>
              <form action='//delicioushat.us15.list-manage.com/subscribe/post?u=bbdc9a683c995f14392f649f4&amp;id=b2867a5444' method='post' id='mc-embedded-subscribe-form' name='mc-embedded-subscribe-form' className='validate' target='_blank' noValidate>
                <Modal.Body style={{
                  padding: 20,
                  backgroundColor: Theme.colors.yellow,
                  color: Theme.colors.lightGray,
                  fontWeight: 200
                }}>
                  <DocSection id='_solutionsModal' title='ActionHero Professional Services' />

                  <div style={{textAlign: 'center'}}>
                    <img style={{
                      padding: 20
                    }} src='/static/images/flying-man.svg' />
                  </div>

                  <FieldGroup name='NAME' id='mce-NAME' type='text' label='Name' placeholder='Enter your name' />
                  <FieldGroup name='COMPANY' id='mce-COMPANY' type='text' label='Company' placeholder='Your company' />
                  <FieldGroup name='EMAIL' id='mce-EMAIL' type='email' label='Email address' placeholder='Enter email' />
                  <FieldGroup name='PHONE' id='mce-PHONE' type='text' label='Phone Number' placeholder='xxx.xxx.xxxx' />

                  <p>The ActionHero team is looking forward to working with you.  We will respond to your inquiry within 2 busniess days.</p>

                  <div style={{
                    textAlign: 'center',
                    padding: 20
                  }}>
                    <Button type='submit' style={Theme.buttons.big(Theme.colors.red, Theme.colors.yellow)} bsSize='large' block>Submit</Button>
                    <a onClick={this.hideModal.bind(this)}>Cancel</a>
                  </div>
                </Modal.Body>
              </form>
            </Modal>
          </Row>
        </Grid>
      </div>
    )
  }
}
