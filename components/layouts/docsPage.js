import React from 'react'
import { Grid, Row, Col } from 'react-bootstrap'
import { AutoAffix } from 'react-overlays'
import Scrollspy from 'react-scrollspy'

import Page from './page.js'
import Theme from './../theme.js'

import SolutionsGrid from './../solutionsGrid.js'
import SiteSearch from './../elements/siteSearch.js'

export default class extends React.Component {
  render () {
    let contentColWidth = 12
    if (this.props.sideNav) { contentColWidth = 9 }

    let scrollSpyClasses = this.props.sideNav.map((e) => { return e.key.replace('#', '') })
    console.log('scrollSpyClasses', scrollSpyClasses)

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

                    <Scrollspy items={scrollSpyClasses} currentClassName='activeMenuItem' style={{
                      listStyleType: 'none',
                      paddingLeft: '0px',
                      marginLeft: '0px'
                    }}>
                      {
                        this.props.sideNav.map((e) => {
                          return (
                            <li key={e.key} style={{
                              fontWeight: 200,
                              fontSize: 18
                            }}>
                              <a href={e.key} className='text-info'>{e.label}</a>
                            </li>
                          )
                        })
                      }
                    </Scrollspy>

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
            <SolutionsGrid />
          </Col>
        </Row>
      </Page>
    )
  }
}
