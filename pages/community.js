import React from 'react'
import { Row, Col, Table, Clearfix } from 'react-bootstrap'
import DocsPage from './../components/layouts/docsPage.js'
import DangerAlert from './../components/alerts/danger.js'
import SectionHeader from './../components/elements/sectionHeader.js'

import GitHub from 'github-api'

const github = new GitHub()
const repository = github.getRepo('actionhero', 'actionhero')

export default class extends React.Component {
  static async getInitialProps () {
    let error
    let releases = []

    try {
      let response = await repository.listReleases()
      releases = response.data
    } catch (e) {
      if (e.message) {
        error = `Cannot load recent releases: ${e.message}`
      } else {
        error = e.toString()
      }
    }

    return { releases, error }
  }

  render () {
    let communityIcon = {
      padding: 20,
      float: 'left'
    }

    let communityHeader = {
      fontWeight: 200
    }

    return (
      <DocsPage titleSection={{
        title: 'Team Up',
        icon: '/static/images/team-up.svg'
      }}>
        <Row>
          <Col md={8} style={{padding: 50}}>
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
              <h2 style={communityHeader}>View the source on Github</h2>
            </a>

            <Clearfix />

            <a href='https://www.github.com/actionhero/actionhero/issues'>
              <img style={communityIcon} src='/static/images/community/issues.svg' />
              <h2 style={communityHeader}>Report and Discuss Issues</h2>
            </a>
          </Col>

          <Col md={4}>
            <SectionHeader>Recent Releases</SectionHeader>
            {
              this.props.error
              ? <DangerAlert message={this.props.error} />
              : <Table striped bordered condensed hover>
                <thead>
                  <tr>
                    <th>Version</th>
                    <th>Release Date</th>
                    <th>Name</th>
                    <th />
                  </tr>
                </thead>
                <tbody>
                  {
                    this.props.releases.map((release) => {
                      let date = new Date(release.published_at)
                      let dateString = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`

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
      </DocsPage>
    )
  }
}
