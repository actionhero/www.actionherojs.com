import React from 'react'
import { Row, Col, Table, Clearfix } from 'react-bootstrap'
import DocsPage from './../components/layouts/docsPage.js'
import DangerAlert from './../components/alerts/danger.js'
import DocSection from './../components/elements/docSection.js'

import Theme from './../components/theme.js'

import GitHub from 'github-api'
const github = new GitHub()
const repository = github.getRepo('actionhero', 'actionhero')

const maxReleases = 10

export default class extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      error: props.error || null,
      releases: props.releases || []
    }
  }

  componentDidMount () {
    if (!this.state.props) { this.loadReleases() }
  }

  async loadReleases () {
    let error
    let releases = []

    try {
      const response = await repository.listReleases()
      releases = response.data
    } catch (e) {
      if (e.message) {
        error = `Cannot load recent releases: ${e.message}`
      } else {
        error = e.toString()
      }
    }

    this.setState({ error, releases })
  }

  render () {
    let releaseCounter = 0

    const communityIcon = {
      padding: 20,
      float: 'left'
    }

    const communityHeader = {
      fontWeight: 200
    }

    return (
      <DocsPage titleSection={{
        title: 'Team Up',
        icon: '/static/images/team-up.svg'
      }}>
        <Row>
          <Col md={5} style={{ paddingTop: 50, paddingBottom: 50 }}>
            <DocSection title='Join the Team' />

            <Clearfix />

            <a href='https://slack.actionherojs.com'>
              <img style={communityIcon} src='/static/images/community/slack.svg' />
              <h2 style={communityHeader}>Chat with us on Slack</h2>
            </a>

            <Clearfix />

            <a href='https://twitter.com/actionherojs'>
              <img style={communityIcon} src='/static/images/community/twitter.svg' />
              <h2 style={communityHeader}>Find us on Twitter</h2>
            </a>

            <Clearfix />

            <a href='https://www.github.com/actionhero/actionhero'>
              <img style={communityIcon} src='/static/images/community/github.svg' />
              <h2 style={communityHeader}>View the source on GitHub</h2>
            </a>

            <Clearfix />

            <a href='https://www.github.com/actionhero/actionhero/issues'>
              <img style={communityIcon} src='/static/images/community/issues.svg' />
              <h2 style={communityHeader}>Report and Discuss Issues</h2>
            </a>
          </Col>

          <Col md={7} style={{ paddingTop: 50, paddingBottom: 50 }}>
            <DocSection title='Recent Releases' />
            {
              this.state.error
                ? <DangerAlert message={this.state.error} />
                : <Table bordered condensed hover>
                  <tbody>
                    {
                      this.state.releases.map((release) => {
                        releaseCounter++
                        const date = new Date(release.published_at)
                        const dateString = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`

                        if (releaseCounter > maxReleases) return null

                        return (
                          <tr key={release.tag_name}>
                            <td><strong>{release.tag_name}</strong></td>
                            <td>{dateString}</td>
                            <td>{release.name}</td>
                            <td><a target='_blank' href={release.html_url}>Learn More</a></td>
                          </tr>
                        )
                      })
                    }
                  </tbody>
                </Table>
            }
          </Col>
        </Row>

        <Row>
          <Col md={12}>
            <DocSection title='Assets' />
          </Col>
        </Row>

        <Row>
          <Col md={4} style={{ textAlign: 'center' }}>
            <h2 style={Theme.typeography.h2}>Logo</h2>
            <br />
            <img src='/static/press-assets/logo.png' style={{ height: 50 }} />
            <p>
              <br />
              <a href='/static/press-assets/logo.png'>PNG</a> | <a href='/static/press-assets/logo.eps'>EPS</a> | <a href='/static/press-assets/logo.svg'>SVG</a> | <a href='/static/press-assets/logo.pdf'>PDF</a>
            </p>
          </Col>

          <Col md={4} style={{ textAlign: 'center' }}>
            <h2 style={Theme.typeography.h2}>Wordmark</h2>
            <br />
            <img src='/static/press-assets/wordmark.png' style={{ height: 50 }} />
            <p>
              <br />
              <a href='/static/press-assets/wordmark.png'>PNG</a> | <a href='/static/press-assets/wordmark.svg'>SVG</a>
            </p>
          </Col>

          <Col md={4} style={{ textAlign: 'center' }}>
            <h2 style={Theme.typeography.h2}>Brand Colors</h2>
            <br />
            <table>
              <tbody>
                {
                  Object.keys(Theme.colors).map((color) => {
                    const hex = Theme.colors[color]
                    return (
                      <tr key={color}>
                        <td width='50%'><div style={{ backgroundColor: hex, margin: 10, height: 30, width: 30, border: '1px solid black' }} /></td>
                        <td style={{ textAlign: 'left' }}>{color}: <code>{hex}</code></td>
                      </tr>
                    )
                  })
                }
              </tbody>
            </table>
          </Col>
        </Row>
      </DocsPage>
    )
  }
}
