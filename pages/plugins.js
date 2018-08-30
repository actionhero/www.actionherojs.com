import React from 'react'
import { Row, Col, Table } from 'react-bootstrap'
import DocsPageWithNav from './../pageClasses/docsPageWithSideNav.js'
import DocsPage from './../components/layouts/docsPage.js'
import Code from './../components/code.js'

const pluginSample = `// If you want to use plugins in your application, include them here:
return {
  'myPlugin': { path: __dirname + '/../node_modules/myPlugin' }
}

// You can also toggle on or off sections of a plugin to include (default true for all sections):
return {
  'myPlugin': {
    path: __dirname + '/../node_modules/myPlugin',
    actions: true,
    tasks: true,
    initializers: true,
    servers: true,
    cli: true,
    public: true
  }
}
`

class PluginTable extends React.Component {
  render () {
    return (
      <Table bordered condensed hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>AH Versions</th>
          </tr>
        </thead>
        <tbody>
          {this.props.plugins.map((plugin) => {
            return <PluginTableRow key={plugin.name} plugin={plugin} />
          })}
        </tbody>
      </Table>
    )
  }
}

class PluginTableRow extends React.Component {
  render () {
    return (
      <tr>
        <td style={{ minWidth: 200 }}>
          <a href={this.props.plugin.url} target={'_blank'}>
            <strong>{this.props.plugin.name}</strong>
          </a>
        </td>
        <td>{this.props.plugin.description}</td>
        <td>{this.props.plugin.versions}</td>
      </tr>
    )
  }
}

export default class extends DocsPageWithNav {
  constructor () {
    super()

    this.state = {
      titleSection: {
        title: "Let's get Started",
        icon: '/static/images/get-started.svg'
      },
      sections: {
        'intro': 'Introduction',
        'databases': 'Databases',
        'apis': 'API tools',
        'auth': 'Authentication and Auth',
        'integrations': 'Integrations'
      },
      links: [
        { link: 'https://docs.actionherojs.com', title: '» ActionHero Documentation' }
      ],
      plugins: {
        databases: [
          {
            name: 'ah-sequelize-plugin',
            url: 'https://github.com/actionhero/ah-sequelize-plugin',
            description: 'Sequelize.js plugin for ActionHero',
            versions: '14-19'
          },
          {
            name: 'ah-elasticsearch-orm',
            url: 'https://github.com/messagebot/ah-elasticsearch-orm',
            description: 'An Elasticsearch ORM for ActionHero Projects. Provides CRUD instance methods, finders, updates, and collection abstractions',
            versions: '14-16'
          },
          {
            name: 'ah-mongodb-plugin',
            url: 'https://github.com/eduardogch/ah-mongodb-plugin',
            description: 'Actionhero plugin to support MongoDB',
            versions: '14-16'
          },
          {
            name: 'ah-rethinkdb-plugin',
            url: 'https://github.com/eduardogch/ah-rethinkdb-plugin',
            description: 'Actionhero plugin to support RethinkDB',
            versions: '14'
          }
        ],

        apis: [
          {
            name: 'ah-swagger-plugin',
            url: 'https://github.com/walbertoibarra/ah-swagger-plugin',
            description: 'Generate Swagger-UI documentation from Actionhero ',
            versions: '14-19'
          },
          {
            name: 'ah-ratelimit-plugin',
            url: 'https://github.com/innerdvations/ah-ratelimit-plugin',
            description: 'Allows limits to be set on the number of time actions can be called in a time period, based on some identifier. Has been tested to work with both actionhero 8 and actionhero 9.',
            versions: '8-9'
          }
        ],

        auth: [
          {
            name: 'ah-jwtauth-plugin',
            url: 'https://github.com/ifavo/ah-jwtauth-plugin',
            description: 'Uses auth0 node-jsonwebtoken to allow token authentication of actions',
            versions: '14-17'
          },
          {
            name: 'ah-passport-plugin',
            url: 'https://github.com/neilstuartcraig/ah-passport-plugin',
            description: 'An ActionHero plugin for the passport authentication middleware',
            versions: '14-16'
          }
        ],

        integrations: [
          {
            name: 'ah-newrelic-plugin',
            url: 'https://github.com/actionhero/ah-newrelic-plugin',
            description: 'ActionHero plugin for New Relic',
            versions: '14-19'
          },
          {
            name: 'ah-airbrake-plugin',
            url: 'https://github.com/actionhero/ah-airbrake-plugin',
            description: 'ActionHero plugin for airbrake',
            versions: '14-17'
          },
          {
            name: 'ah-nodemailer-plugin',
            url: 'https://github.com/panjiesw/ah-nodemailer-plugin',
            description: 'ActionHero plugin for Node Mailer',
            versions: '14-16'
          }
        ]
      }
    }
  }

  render () {
    return (
      <DocsPage showSolutions sideNav={this.state.sections} titleSection={this.state.titleSection} currentSection={this.state.currentSection}>
        <Row>
          <Col md={12}>
            { this.section('intro',
              <div>
                <p>There is a robust ecosystem of ActionHero plugins which you can use to leverage the community's expertise in your applications.</p>
                <p>To use an ActionHero plugin you usually <code>npm install name-of-plugin</code> and then refrence is in your <code>./config/plugins.js</code> file to load it into your application.</p>
                <Code language='javascript'>{pluginSample}</Code>
                <p>You can learn more about plugins in the <a href='https://docs.actionherojs.com/tutorial-plugins.html'>ActionHero documentation</a>.</p>
              </div>
            )}
          </Col>
        </Row>

        <Row>
          <Col md={12}>
            { this.section('databases', <PluginTable plugins={this.state.plugins.databases} />) }
          </Col>
        </Row>

        <Row>
          <Col md={12}>
            { this.section('apis', <PluginTable plugins={this.state.plugins.apis} />) }
          </Col>
        </Row>

        <Row>
          <Col md={12}>
            { this.section('auth', <PluginTable plugins={this.state.plugins.auth} />) }
          </Col>
        </Row>

        <Row>
          <Col md={12}>
            { this.section('integrations', <PluginTable plugins={this.state.plugins.integrations} />) }
          </Col>
        </Row>
      </DocsPage>
    )
  }
}
