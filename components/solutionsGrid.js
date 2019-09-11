import React from 'react'
import Link from 'next/link'
import { Grid, Row, Col, Modal, Button } from 'react-bootstrap'

import Theme from './theme.js'
import SuccessAlert from './alerts/success.js'
import RedLine from './elements/redLine.js'
import BigButton from './buttons/bigButton.js'

export default class extends React.Component {
  constructor () {
    super()
    this.state = {
      showModal: false,
      successMessage: null
    }
  }

  showModal () {
    this.setState({ showModal: true })
  }

  hideModal () {
    this.setState({ showModal: false })
  }

  render () {
    const boxShadow = '0px 2px 4px #003C51'

    return (
      <div style={{
        backgroundColor: Theme.colors.blueGray,
        color: Theme.colors.blue,
        fontWeight: 300,
        paddingTop: Theme.padding.section.paddingTop,
        paddingBottom: Theme.padding.section.paddingBottom
      }}
      >
        <Grid>
          <Row>
            <Col md={2} />
            <Col
              md={8} style={{
                textAlign: 'center',
                color: Theme.colors.yellow,
                paddingBottom: 100
              }}
            >
              <SuccessAlert message={this.state.successMessage} />
              <h1 style={Theme.typeography.h1}>Solutions</h1>
              <h2 style={Theme.typeography.h2}><span style={{ color: Theme.colors.yellow }}>ActionHero was built from the ground up to include all the features you expect from a modern API framework.</span></h2>
            </Col>
            <Col md={2} />
          </Row>

          <Row>
            <Col md={4}>
              <div style={{
                width: '100%',
                paddingTop: 40,
                paddingBottom: 40,
                paddingLeft: 40,
                paddingRight: 50,
                backgroundColor: Theme.colors.yellow,
                boxShadow: boxShadow
              }}
              >
                <div style={{ textAlign: 'center', paddingBottom: 10 }}><h1 style={Theme.typeography.h1}>Open Source</h1></div>
                <RedLine />
                <p>The ActionHero server is open source, under the Apache-2 license</p>
                <RedLine />
                <p>ActionHero runs on Linux, OS X, and Windows</p>
                <RedLine />
                <p>You always have access to the ActionHero team via <Link href='/community'><a>Slack and Github</a></Link></p>
                <br />
                <br />
                <BigButton href='/downloads' backgroundColor={Theme.colors.red} textColor={Theme.colors.white}>Download</BigButton>
              </div>
            </Col>

            <Col md={4} className='hidden-md hidden-lg hidden-xl'>
              <div style={{
                width: '100%',
                padding: 20,
                backgroundColor: Theme.colors.blue,
                color: Theme.colors.white,
                boxShadow: boxShadow
              }}
              >
                <div style={{ textAlign: 'center' }}>
                  <img src='/static/images/dog.svg' />
                  <h1 style={Theme.typeography.h1}><span style={{ color: Theme.colors.yellow }}>Premium Training & Review</span></h1>
                </div>
                <RedLine />
                <p>We provide support for corporate & nonprofit customers starting at a flat rate of $150/hr.  Our services include:</p>
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
                <BigButton onClick={this.showModal.bind(this)} backgroundColor={Theme.colors.red} textColor={Theme.colors.white}>Contact Us</BigButton>
              </div>
            </Col>

            <Col md={4} className='hidden-xs hidden-sm'>
              <div style={{
                width: '125%',
                padding: 40,
                backgroundColor: Theme.colors.blue,
                color: Theme.colors.white,
                position: 'relative',
                top: -60,
                boxShadow: boxShadow,
                marginLeft: '-13%',
                marginRight: '-5%',
                zIndex: 10
              }}
              >
                <div style={{ textAlign: 'center', paddingBottom: 10 }}>
                  <img src='/static/images/dog.svg' />
                  <h1 style={Theme.typeography.h1}>Premium Training & Review</h1>
                </div>
                <RedLine />
                <p>We provide support for corperate & nonprofit customers starting at a flat rate of $150/hr.  Our services include:</p>
                <RedLine />
                <ul>
                  <li><strong>Remote training for your team</strong></li>
                  <li><strong>Code Reviews</strong></li>
                  <li><strong>Best Practices Workshops</strong></li>
                  <li><strong>Custom plugin & Feature Development</strong></li>
                </ul>
                <RedLine />
                <p>We have packages appropriate for all company sizes.  Contact us to learn more.</p>
                <br />
                <BigButton onClick={this.showModal.bind(this)} backgroundColor={Theme.colors.red} textColor={Theme.colors.white}>Contact Us</BigButton>
              </div>
            </Col>

            <Col md={4}>
              <div style={{
                width: '100%',
                paddingTop: 40,
                paddingBottom: 40,
                paddingRight: 40,
                paddingLeft: 50,
                backgroundColor: Theme.colors.yellow,
                boxShadow: boxShadow
              }}
              >
                <div style={{ textAlign: 'center', paddingBottom: 10 }}><h1 style={Theme.typeography.h1}>Enterprise</h1></div>
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
                <BigButton onClick={this.showModal.bind(this)} backgroundColor={Theme.colors.red} textColor={Theme.colors.white}>Contact Us</BigButton>
              </div>
            </Col>

            <Modal show={this.state.showModal} onHide={this.hideModal.bind(this)}>
              <form action='//delicioushat.us15.list-manage.com/subscribe/post?u=bbdc9a683c995f14392f649f4&amp;id=b2867a5444' method='post' id='mc-embedded-subscribe-form' name='mc-embedded-subscribe-form' className='validate' target='_blank' noValidate>
                <Modal.Body style={{
                  backgroundColor: Theme.colors.yellow,
                  padding: Theme.padding.common,
                  color: Theme.colors.blue,
                  fontWeight: 200,
                  width: 750,
                  marginLeft: -75,
                  background: `url("/static/images/clouds-white.svg") no-repeat center bottom ${Theme.colors.yellow}`
                }}
                >
                  <Row>
                    <Col md={4}>
                      <h1 style={Theme.typeography.h1}>ActionHero Professional Services</h1>
                      <p>The ActionHero team is looking forward to working with you.</p>
                      <p>We will respond to your inquiry within 2 busniess days.</p>

                      <div className='hidden-sm hidden-xs' style={{ textAlign: 'center', paddingTop: 100 }}>
                        <img style={{ padding: 20 }} src='/static/images/flying-man.svg' />
                      </div>
                    </Col>
                    <Col md={8}>
                      <div style={{ paddingTop: 150 }} className='hidden-sm hidden-xs' />

                      <input style={Theme.form.input} name='NAME' id='mce-NAME' type='text' label='Name' placeholder='Your Name' /><br />
                      <input style={Theme.form.input} name='COMPANY' id='mce-COMPANY' type='text' label='Company' placeholder='Company Name' /><br />
                      <input style={Theme.form.input} name='EMAIL' id='mce-EMAIL' type='email' label='Email address' placeholder='Email Address' /><br />
                      <input style={Theme.form.input} name='PHONE' id='mce-PHONE' type='text' label='Phone Number' placeholder='Phone Number' />

                      <div style={{
                        textAlign: 'center',
                        padding: 20
                      }}
                      >
                        <Button type='submit' style={Theme.buttons.big(Theme.colors.red, Theme.colors.yellow)} bsSize='large' block>Submit</Button>
                        <a onClick={this.hideModal.bind(this)}>Cancel</a>
                      </div>
                    </Col>
                  </Row>
                </Modal.Body>
              </form>
            </Modal>
          </Row>
        </Grid>
      </div>
    )
  }
}
