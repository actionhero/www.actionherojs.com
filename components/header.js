import React from 'react'
import Link from 'next/link'
import Router from 'next/router'
import FontAwesome from 'react-fontawesome'
import { Navbar, Nav, NavItem } from 'react-bootstrap'

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

  render () {
    return (
      <div>
        <br />

        <Navbar collapseOnSelect>
          <Navbar.Header>
            <Navbar.Brand>
              <a href='#' onClick={() => Router.push('/')}><strong>ActionHero</strong></a>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>

          <Navbar.Collapse>
            <Nav pullRight />

            <Nav pullLeft>
              <Link href='/get-started'>
                <NavItem className={this.state.activeKey === '/get-started' ? 'active' : null}>Get Started</NavItem>
              </Link>

              <Link href='/docs'>
                <NavItem className={this.state.activeKey === '/docs' ? 'active' : null}>Documentation</NavItem>
              </Link>

              <Link href='/solutions'>
                <NavItem className={this.state.activeKey === '/solutions' ? 'active' : null}>Solutions</NavItem>
              </Link>

              <Link href='/community'>
                <NavItem className={this.state.activeKey === '/community' ? 'active' : null}>Community</NavItem>
              </Link>
            </Nav>

            <Nav pullRight>
              <NavItem className='_twitterLink' onClick={() => { window.location.href = 'https://twitter.com/actionherojs' }}>
                <FontAwesome name='twitter' />
              </NavItem>

              <Link href='/downloads'>
                <NavItem className={this.state.activeKey === '/downloads' ? 'active' : null}>Downloads</NavItem>
              </Link>

              <NavItem />
            </Nav>
          </Navbar.Collapse>
        </Navbar>

      </div>
    )
  }
}
