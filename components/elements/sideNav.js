import React from 'react'
import { Col } from 'react-bootstrap'
import { AutoAffix } from 'react-overlays'
import Link from 'next/link'

import Theme from './../theme.js'
import SiteSearch from './siteSearch.js'

export default class extends React.Component {
  render () {
    let bottomLinkStyle = {
      fontWeight: 200,
      color: Theme.colors.red
    }

    return (
      <div>
        <Col md={3} className='hidden-xs hidden-sm'>
          <AutoAffix>
            <div style={{paddingTop: 75}}>
              <SiteSearch />

              <ul style={{
                listStyleType: 'none',
                paddingLeft: 0,
                marginLeft: 0
              }}>
                {
                  this.props.sideNav
                  ? Object.keys(this.props.sideNav).map((key) => {
                    let message = this.props.sideNav[key]

                    let aStyle = {
                      fontWeight: 200,
                      fontSize: 18
                    }

                    if (this.props.currentSection === key) {
                      aStyle.color = Theme.colors.red
                      aStyle.fontWeight = 400
                    }

                    return (
                      <li key={key}>
                        <a href={`#${key}`} className='text-info' style={aStyle}>{message}</a>
                      </li>
                    )
                  })
                  : null
                }
              </ul>

              <br />

              <ul style={{
                listStyleType: 'none',
                paddingLeft: 0,
                marginLeft: 0
              }}>
                {
                  this.props.links
                  ? <div>
                    {
                      this.props.links.map((k) => {
                        return (
                          <li key={`side-nav-link-${k.link}`}>
                            <Link href={k.link}>
                              <a style={bottomLinkStyle}>{k.title}</a>
                            </Link>
                          </li>
                        )
                      })
                    }
                  </div>
                  : null
                }
                <li>
                  <a href='#_top' style={bottomLinkStyle}>↑ Back to top</a>
                </li>
              </ul>
            </div>
          </AutoAffix>
        </Col>
      </div>
    )
  }
}
