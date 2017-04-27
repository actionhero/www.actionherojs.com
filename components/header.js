import React from 'react'
import Link from 'next/link'
import Router from 'next/router'
import FontAwesome from 'react-fontawesome'
import { Navbar, Nav, NavItem } from 'react-bootstrap'

export default class extends React.Component {
  isActive (path) {
    if (!process || process.browser) {
      if (Router.pathname === path) { return 'active' }
    } else {
      return null
    }
  }

  render () {
    return (
      <div>
        <br />

        <Navbar collapseOnSelect inverse>
          <Navbar.Header>
            <Navbar.Brand>
              <a href='/'>ActionHero</a>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>

          <Navbar.Collapse>
            <Nav pullRight />

            <Nav pullLeft>
              <Link href='/get-started'>
                <NavItem className={this.isActive('/get-started')}>Get Started</NavItem>
              </Link>

              <Link href='/docs'>
                <NavItem className={this.isActive('/docs')}>Documentation</NavItem>
              </Link>

              <Link href='/solutions'>
                <NavItem className={this.isActive('/solutions')}>Solutions</NavItem>
              </Link>

              <Link href='/community'>
                <NavItem className={this.isActive('/community')}>Community</NavItem>
              </Link>
            </Nav>

            <Nav pullRight>
              <NavItem className='_twitterLink' onClick={() => { window.location.href = 'https://twitter.com/actionherojs' }}>
                <FontAwesome name='twitter' />
              </NavItem>

              <Link href='/downloads'>
                <NavItem className={this.isActive('/downloads')}>Downloads</NavItem>
              </Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>

      </div>
    )
  }
}
