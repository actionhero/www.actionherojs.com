import React from 'react'
import Link from 'next/link'
import Router from 'next/router'
import { Grid, Navbar, Nav, NavItem, Button } from 'react-bootstrap'

import StarAndLogo from './elements/starAndLogo.js'
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
    let color = Theme.colors.white
    if (this.state.activeKey && this.state.activeKey.match(matchKey)) {
      color = Theme.colors.red
    }

    return {
      fontWeight: 500,
      lineHeight: 3,
      color: color
    }
  }

  render () {
    return (
      <header style={{
        backgroundColor: Theme.colors.blue
      }}>
        <Grid>

          <Navbar style={{
            backgroundColor: Theme.colors.blue,
            paddingTop: 5,
            border: 0
          }}>
            <Navbar.Header>
              <Navbar.Brand>
                <Link href='/'>
                  <a><StarAndLogo /></a>
                </Link>
              </Navbar.Brand>
              <Navbar.Toggle />
            </Navbar.Header>

            <Navbar.Collapse>
              <Nav pullRight />

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
                  <Button style={Theme.buttons.header(Theme.colors.red, Theme.colors.yellow)} block>Downloads</Button>
                </Link>
              </Nav>
            </Navbar.Collapse>
          </Navbar>

        </Grid>
      </header>
    )
  }
}
