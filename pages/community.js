import React from 'react'
import { Row, Col, Table } from 'react-bootstrap'
import Page from './../components/layouts/page.js'
import DangerAlert from './../components/alerts/danger.js'
import GitHub from 'github-api'

import SolutionsGrid from './../components/solutionsGrid.js'

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
      error = e
    }

    return { releases, error }
  }

  render () {
    return (
      <Page>
        <Row>
          <Col md={12} style={{textAlign: 'center'}}>
            <h1>Team Up</h1>
            <DangerAlert message={this.props.error} />
          </Col>

          <Col md={12}>
            <h2>
              <a target='_blank' href='https://slack.actionherojs.com'>Slack Chat</a>
            </h2>
          </Col>

          <Col md={12}>
            <h2>
              <a target='_blank' href='https://twitter.com/actionherojs'>Twitter</a>
            </h2>
          </Col>

          <Col md={12}>
            <h2>
              <a target='_blank' href='https://github.com/actionhero/actionhero/issues'>Report & Discuss Issues</a>
            </h2>
          </Col>

          <Col md={12}>
            <h2>
              <a target='_blank' href='https://github.com/actionhero/actionhero'>GitHub</a>
            </h2>
          </Col>

          <Col md={12}><hr /></Col>

          <Col md={12}>
            <h3>Recent Releases</h3>
            <Table striped bordered condensed hover>
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
          </Col>
        </Row>

        <SolutionsGrid />
      </Page>
    )
  }
}
