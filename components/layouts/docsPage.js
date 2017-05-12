import React from 'react'
import { Grid, Row, Col } from 'react-bootstrap'
import Waypoint from 'react-waypoint'

import Page from './page.js'
import Theme from './../theme.js'

import SolutionsGrid from './../solutionsGrid.js'
import SiteSearch from './../elements/siteSearch.js'

let ScrollSpy = ({ href, onBefore, onAfter }) => (
  <Waypoint
    onEnter={({ previousPosition }) => (
      previousPosition === Waypoint.above && onBefore(href)
    )}
    onLeave={({ currentPosition }) => (
      currentPosition === Waypoint.above && onAfter(href)
    )}
    topOffset={10}
    bottomOffset={-10}
  />
)

export default class extends React.Component {
  renderScrollSpy (href) {
    return (
      <ScrollSpy
        href={href}
        onBefore={this.onBefore}
        onAfter={this.onAfter}
      />
    )
  }

  onBefore (href) {
    this.afterSections[href] = false
    this.updateActiveHref()
  }

  onAfter (href) {
    this.afterSections[href] = true
    this.updateActiveHref()
  }

  updateActiveHref () {
    if (this.updateActiveHrefHandle != null) {
      return
    }

    this.updateActiveHrefHandle = setTimeout(() => {
      this.updateActiveHrefHandle = null
      this.setActiveNavItem()
    })
  }

  render () {
    let contentColWidth = 12
    if (this.props.sideNav) { contentColWidth = 9 }

    return (
      <Page>
        {
          this.props.titleSection
          ? <div style={{
            backgroundColor: Theme.colors.yellow,
            color: Theme.colors.lightGray,
            fontWeight: 200,
            padding: 50
          }}>
            <Grid>
              <Row>
                <Col md={3} style={{textAlign: 'center'}}>
                  { this.props.titleSection.icon ? <img src={this.props.titleSection.icon} /> : null }
                </Col>
                <Col md={6} style={{textAlign: 'center'}}>
                  <h1><br />{this.props.titleSection.title}</h1>
                  { this.props.titleSection.subTitle ? <p>{this.props.titleSection.subTitle}</p> : null }
                </Col>
                <Col md={3} />
              </Row>
            </Grid>
          </div>
          : null
        }
        <Grid>
          <Row>
            <div id='_top' />
            <Col md={contentColWidth}>
              { this.props.children }
            </Col>

            {
              this.props.sideNav
              ? <Col md={3} className='hidden-xs hidden-sm'>
                <div style={{position: 'fixed'}} >
                  <SiteSearch />

                  {
                    this.props.sideNav.map((e) => {
                      return (
                        <div key={e.key}>
                          <h4 style={{fontWeight: 200}}><a href={e.key} className='text-info'>{e.label}</a></h4>
                          {
                            e.children
                            ? <ul>
                              {
                                e.children.map((c) => {
                                  return (
                                    <li key={`${e.key}-${c.key}`}>
                                      <a href={c.key} className='text-warning'>{c.label}</a>
                                    </li>
                                  )
                                })
                              }
                            </ul>
                            : null
                          }
                        </div>
                      )
                    })
                  }

                  <br />
                  <a href='#_top' style={{fontWeight: 200, color: Theme.colors.red}}>Back to top</a>
                </div>
              </Col>
              : null
            }
          </Row>
        </Grid>

        <Row>
          <Col md={12}>
            <SolutionsGrid />
          </Col>
        </Row>
      </Page>
    )
  }
}
