import React from 'react'
import { Grid, Row, Col } from 'react-bootstrap'

export default class extends React.Component {
  constructor () {
    super()
    this.state = { date: new Date() }
  }

  render () {
    return (
      <footer id='footer-container' style={{
        backgroundColor: 'rgb(62, 83, 101)',
        color: '#EEEEEE',
        padding: 20
      }}>
        <Grid>
          <Row style={{paddingBottom: 40}}>
            <Col md={12}>
              <h1>ActionHero</h1>
            </Col>
          </Row>

          <Row>
            <Col md={4}>
              <p>Terms</p>
              <p>Contact us at <a href='mailto:hello@actionherojs.com'>hello@actionherojs.com</a></p>
              <p>Blog</p>
              <p>{ String.fromCharCode(169) + ' ' + this.state.date.getFullYear() } ActionHero</p>
            </Col>
            <Col md={4}>
              <p>Get Started</p>
              <p>Documenation</p>
              <p>Solutions</p>
              <p>Community</p>
              <p>download</p>
            </Col>
            <Col md={4}>
              <p>NPM</p>
              <p>Twitter</p>
              <p>Slack</p>
              <p>Github</p>
            </Col>
          </Row>
        </Grid>
      </footer>
    )
  }
}
