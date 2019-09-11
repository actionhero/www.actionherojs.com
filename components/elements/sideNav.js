import React from 'react'
import { AutoAffix } from 'react-overlays'
import Link from 'next/link'

import Theme from './../theme.js'

export default class extends React.Component {
  render () {
    const bottomLinkStyle = {
      fontWeight: 200,
      color: Theme.colors.red
    }

    if (!this.props.sideNav) { return null }

    return (
      <div style={{ height: this.props.contentHeight }}>
        <AutoAffix container={this}>
          <div style={{ paddingTop: 90 }}>

            <ul style={{
              listStyleType: 'none',
              paddingLeft: 0,
              marginLeft: 0
            }}
            >
              {
                Object.keys(this.props.sideNav).map((key) => {
                  const message = this.props.sideNav[key]

                  const aStyle = {
                    fontWeight: 300,
                    fontSize: 18,
                    lineHeight: '1.6em'
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
              }
            </ul>

            <br />

            <ul style={{
              listStyleType: 'none',
              paddingLeft: 0,
              marginLeft: 0
            }}
            >
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
                  </div> //eslint-disable-line
                  : null
              }
              <li>
                <a href='#_top' style={bottomLinkStyle}>↑ Back to top</a>
              </li>
            </ul>
          </div>
        </AutoAffix>
      </div>
    )
  }
}
