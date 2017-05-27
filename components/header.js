import React from 'react'
import Link from 'next/link'
import Router from 'next/router'
import { Grid, Navbar, Nav, NavItem, Button } from 'react-bootstrap'

import Theme from './theme.js'

export default class extends React.Component {
  constructor () {
    super()
    this.state = { activeKey: null }
  }

  componentDidMount () {
    if (!process || process.browser) {
      this.setState({activeKey: Router.pathname})
    }
  }

  linkStyle (matchKey) {
    let decoration = null
    if (this.state.activeKey && this.state.activeKey.match(matchKey)) {
      decoration = '3px solid currentColor'
    }

    return {
      lineHeight: 3,
      color: Theme.colors.white,
      paddingBottom: 10,
      fontWeight: 300,
      borderBottom: decoration
    }
  }

  render () {
    return (
      <header style={{
        backgroundColor: Theme.colors.blue
      }}>
        <Grid>
          <Navbar fixedTop style={{
            backgroundColor: Theme.colors.blue,
            paddingTop: 5,
            marginBottom: 10,
            border: 0
          }}>
            <Navbar.Header>
              <Navbar.Brand>
                <Link href='/'>
                  <a><img src='/static/images/actionhero-logo-header-wordmark.svg' style={{paddingTop: 14, paddingBottom: 20}} /></a>
                </Link>
              </Navbar.Brand>
              <Navbar.Toggle />
            </Navbar.Header>

            <Navbar.Collapse>
              <Nav pullRight />

              <Nav pullLeft className='hidden-md hidden-sm hidden-xs'>
                <Link><NavItem>&nbsp;</NavItem></Link>
                <Link><NavItem>&nbsp;</NavItem></Link>
                <Link><NavItem>&nbsp;</NavItem></Link>
                <Link><NavItem>&nbsp;</NavItem></Link>
              </Nav>

              <Nav pullLeft>
                <Link href='/get-started'>
                  <NavItem><span style={this.linkStyle('/get-started')}>Get Started</span></NavItem>
                </Link>

                <Link href='/docs'>
                  <NavItem><span style={this.linkStyle('/docs')}>Documentation</span></NavItem>
                </Link>

                <Link href='/solutions'>
                  <NavItem><span style={this.linkStyle('/solutions')}>Solutions</span></NavItem>
                </Link>

                <Link href='/community'>
                  <NavItem><span style={this.linkStyle('/community')}>Community</span></NavItem>
                </Link>
              </Nav>

              <Nav pullRight>
                <Link href='/downloads'>
                  <Button style={Theme.buttons.header(Theme.colors.blueGray, Theme.colors.white)} block>Download</Button>
                </Link>
              </Nav>
            </Navbar.Collapse>
          </Navbar>

        </Grid>
      </header>
    )
  }
}
