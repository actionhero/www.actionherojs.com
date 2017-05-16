import React from 'react'
import DocsPageWithNav from './../../../pageClasses/docsPageWithSideNav.js'
import { Row, Col } from 'react-bootstrap'
import DocsPage from './../../../components/layouts/docsPage.js'

import Code from './../../../components/code.js'

const CLI =
`// A CLI Command

module.exports = {
  name: 'redis keys',
  description: 'I list all the keys in redis',
  example: 'actionhero keys --prefix actionhero',

  inputs: {
    prefix: {
      requried: true,
      default: 'actionhero',
      note: 'the redis prefix for searching keys'
    }
  },

  run: function (api, data, next) {
    api.redis.clients.client.keys(data.params.prefix, (error, keys) => {
      if (error) { throw error }

      api.log('Found ' + keys.length + 'keys:')
      keys.forEach((k) => { api.log(k) })

      return next(null, true)
    })
  }
}
`

const Help =
`* redis keys
  description: I list all the keys in redis
  example: actionhero keys --prefix actionhero
  inputs:
    [prefix] (optional)
      note: the redis prefix for searching keys
      default: actionhero`

export default class extends DocsPageWithNav {
  constructor (props) {
    super(props)

    this.state = {
      titleSection: {
        title: 'Core: CLI',
        icon: '/static/images/ops-tools.svg'
      },
      sections: {
        'overview': 'Overview',
        'syntax': 'Syntax'
      },
      links: [
        {link: '/docs/core/action-cluster', title: '» Core: Action Cluster'},
        {link: '/docs/core/initializers', title: '« Core: Initializers'}
      ]
    }
  }

  render () {
    return (
      <DocsPage sideNav={this.state.sections} titleSection={this.state.titleSection} links={this.state.links} currentSection={this.state.currentSection}>
        <Row>
          <Col md={12}>
            { this.section('overview',
              <div>
                <p>Allow actionhero developers to create new files in <code>./bin</code> which can be run via the CLI.  These commands will have access to a the ActionHero <code>api</code> and CLI arguments object within a <code>run</code> method.</p>
                <p>You can create namespaces for commands by using folders.  For example, a file in <code>./bin/redis/keys</code> would be run via <code>./node_modules/.bin/actionhero redis keys --prefix actionhero</code></p>
                <Code>{CLI}</Code>
              </div>
            )}

            { this.section('syntax',
              <div>
                <p>ActionHero CLI commands have:</p>
                <ul>
                  <li>name</li>
                  <li>description</li>
                  <li>example</li>
                </ul>

                <p>Inputs for CLI commands have:</p>
                <ul>
                  <li>required (true/false)</li>
                  <li>default (string only)</li>
                  <li>note</li>
                </ul>

                <p>These are sourced by `actionhero help`, and the example above would return:</p>
                <Code language='bash'>{Help}</Code>
              </div>
            )}
          </Col>
        </Row>
      </DocsPage>
    )
  }
}
