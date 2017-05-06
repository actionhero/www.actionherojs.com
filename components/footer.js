import React from 'react'
import Link from 'next/link'
import { Grid, Row, Col } from 'react-bootstrap'
import Theme from './theme.js'
import StarAndLogo from './elements/starAndLogo.js'

const footerLinkStyle = {
  color: Theme.colors.yellow
}

export default class extends React.Component {
  constructor () {
    super()
    this.state = { date: new Date() }
  }

  render () {
    return (
      <footer id='footer-container' style={{
        backgroundColor: '#2F5266',
        color: Theme.colors.yellow,
        fontFamily: Theme.fonts.main,
        fontWeight: 300,
        padding: 20
      }}>
        <Grid>
          <Row style={{paddingBottom: 40}}>
            <Col md={12}>
              <StarAndLogo />
            </Col>
          </Row>

          <Row>
            <Col md={4}>
              <p><Link href='/terms'><a style={footerLinkStyle}>Terms</a></Link></p>
              <p>Contact us at <a style={{color: Theme.colors.yellow, fontWeight: 500}} href='mailto:hello@actionherojs.com'>hello@actionherojs.com</a></p>
              <p><Link href='https://medium.com/tag/actionherojs'><a target='_new' style={footerLinkStyle}>Blogs</a></Link></p>
              <p>{ String.fromCharCode(169) + ' ' + this.state.date.getFullYear() } ActionHero</p>
            </Col>
            <Col md={4}>
              <p><Link href='/get-started'><a style={footerLinkStyle}>Get Started</a></Link></p>
              <p><Link href='/docs'><a style={footerLinkStyle}>Documenation</a></Link></p>
              <p><Link href='/solutions'><a style={footerLinkStyle}>Solutions</a></Link></p>
              <p><Link href='/community'><a style={footerLinkStyle}>Community</a></Link></p>
              <p><Link href='/downloads'><a style={footerLinkStyle}>Downloads</a></Link></p>
            </Col>
            <Col md={4}>
              <p><Link href='https://www.npmjs.com/package/actionhero'><a target='_new' style={footerLinkStyle}>NPM</a></Link></p>
              <p><Link href='https://twitter.com/actionherojs'><a target='_new' style={footerLinkStyle}>Twitter</a></Link></p>
              <p><Link href='https://slack.actionherojs.com/'><a target='_new' style={footerLinkStyle}>Slack</a></Link></p>
              <p><Link href='https://github.com/actionhero/actionhero'><a target='_new' style={footerLinkStyle}>Github</a></Link></p>
            </Col>
          </Row>
        </Grid>
      </footer>
    )
  }
}
