import React from 'react'
import { Grid, Row, Col } from 'react-bootstrap'

import Page from './page.js'
import Theme from './../theme.js'

import SideNav from './../elements/sideNav.js'
import SolutionsGrid from './../solutionsGrid.js'
import SiteSearch from './../elements/siteSearch.js'

export default class extends React.Component {
  constructor (props) {
    super(props)
    this.state = {contentHeight: 0}
  }

  componentDidMount () {
    setTimeout(this.measureContentHeight.bind(this))
  }

  measureContentHeight () {
    let height = document.getElementById('docPageContent').offsetHeight
    this.setState({contentHeight: height})
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
                  <h1 style={Theme.typeography.h1}><br />{this.props.titleSection.title}</h1>
                  { this.props.titleSection.subTitle ? <p>{this.props.titleSection.subTitle}</p> : null }
                  { this.props.titleSection.search ? <div><br /><SiteSearch /></div> : null}
                </Col>
                <Col md={3} />
              </Row>
            </Grid>
          </div>
          : null
        }

        <div style={{
          height: 183,
          background: `url("/static/images/clouds-white.svg") no-repeat center ${Theme.colors.yellow}`
        }} />

        <Grid style={{paddingBottom: Theme.padding.section.paddingBottom}}>
          <Row>
            <div id='_top' />
            <Col md={contentColWidth} id='docPageContent'>
              { this.props.children }
            </Col>

            <Col md={3} className='hidden-xs hidden-sm'>
              <SideNav
                contentHeight={this.state.contentHeight}
                sideNav={this.props.sideNav}
                links={this.props.links}
                currentSection={this.props.currentSection}
              />
            </Col>
          </Row>
        </Grid>

        { this.props.showSolutions ? <SolutionsGrid /> : null }

      </Page>
    )
  }
}
