import React from 'react'
import { Row, Col } from 'react-bootstrap'
import Page from './../components/layouts/page.js'
import GithubReleasesList from '../components/github/releasesList.js'

export default class extends React.Component {
  render () {
    return (
      <Page>
        <Row>
          <Col md={12} style={{textAlign: 'center'}}>
            <h1>Team Up</h1>
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
              <a target='_blank' href='https://github.com/actionhero/actionhero'>Github</a>
            </h2>
          </Col>

          <Col md={12}><hr /></Col>

          <Col md={12}>
            <h3>Recent Releases</h3>
            <GithubReleasesList />
          </Col>
        </Row>
      </Page>
    )
  }
}
