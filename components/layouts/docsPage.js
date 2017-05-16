import React from 'react'
import { Grid, Row, Col } from 'react-bootstrap'
import { AutoAffix } from 'react-overlays'

import Page from './page.js'
import Theme from './../theme.js'

import SolutionsGrid from './../solutionsGrid.js'
import SiteSearch from './../elements/siteSearch.js'

export default class extends React.Component {
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
                <AutoAffix container={this}>
                  <div style={{paddingTop: 75}}>
                    <SiteSearch />

                    <ul style={{
                      listStyleType: 'none',
                      paddingLeft: 0,
                      marginLeft: 0
                    }}>
                      {
                        Object.keys(this.props.sideNav).map((key) => {
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
                      }
                    </ul>

                    <br />
                    <a href='#_top' style={{fontWeight: 200, color: Theme.colors.red}}>Back to top</a>
                  </div>
                </AutoAffix>
              </Col>
              : null
            }
          </Row>
        </Grid>

        <Row>
          <Col md={12}>
            <br />
            <br />
            <br />
            <SolutionsGrid />
          </Col>
        </Row>
      </Page>
    )
  }
}
