import React from 'react'
import { Grid, Row, Col } from 'react-bootstrap'
import Page from './../components/layouts/page.js'

import Theme from './../components/theme.js'
import BigButton from './../components/buttons/bigButton.js'
import SolutionsGrid from './../components/solutionsGrid.js'
import FeatureBox from './../components/elements/homepageFeatureBox.js'
import GithubLatestVersion from './../components/githubLatestVersion.js'

const CodeSamples = {
  eastToUseActions: `const {Action} = require('actionhero')

module.exports = class RandomNumber extends Action {
  constructor () {
    super()
    this.name = 'randomNumber'
    this.description = 'I am an API method which will generate a random number'
    this.outputExample = { randomNumber: 0.123 }
  }

  async run ({connection, response}) {
    response.randomNumber = Math.random()
  }
}`,
  backgroundTasks: `await api.tasks.enqueue(
    "sendWelcomeEmail",
    {to: 'evan@evantahler.com'},
    'default');

module.exports = class RunAction extends ActionHero.Task {
  constructor () {
    super()
    this.name = 'sendWelcomeEmail'
    this.description = 'I send an email'
    this.frequency = 0
    this.queue = 'default'
  }

  async run (params) {
    await api.sendEmail(params)
  }
}`,
  clusterReady: `npx actionhero start cluster --workers 10`,
  localization: `let number = Math.random()
let response = data.connection.localize(['Your random number is {{number}}', {number: number}])
data.response.stringRandomNumber = response`,
  routing: `{
  get: [
    { path: '/users', action: 'usersList' },
    { path: '/search/:term/limit/:limit/offset/:offset', action: 'search' },
  ],

  post: [
    { path: '/login/:userID(^\\d{3}$)', action: 'login' }
  ],

  all: [
    { path: '/user/:userID', action: 'user', matchTrailingPathParts: true }
  ]
}`,
  chat: `//server
await api.chatRoom.broadcast(null, 'myRoom', 'Hello!')

//client
client.on('message', (message) => alert(message))
`
}

let smallIconStyle = {
  padding: 30
}

export default class extends React.Component {
  render () {
    return (
      <Page>
        <div style={{
          backgroundColor: Theme.colors.blue,
          color: Theme.colors.white
        }}>
          <Grid style={{ paddingTop: 50 }}>
            <Row>
              <Col md={2} />
              <Col md={8} style={{ textAlign: 'center' }}>
                <a href='https://github.com/actionhero/actionhero'><img src='/static/images/logo-and-wordmark.svg' /></a>
                <p id='latestRelease' style={{ paddingTop: 20 }}><GithubLatestVersion /></p>
                <h2 style={{ fontFamily: 'Roboto', fontWeight: 200, paddingTop: 5, paddingBottom: 40 }}>The reusable, scalable, and quick node.js API server for stateless and stateful applications</h2>
              </Col>
              <Col md={2} />
            </Row>

            <Row>
              <Col md={2} />
              <Col md={1}>
                <img src='/static/images/cloud.svg' className='animated-clouds-left' />
              </Col>
              <Col md={2} />
              <Col md={2}>
                <BigButton href='/downloads' backgroundColor={Theme.colors.red} textColor={Theme.colors.white}>Download</BigButton>
              </Col>
              <Col md={2}>
                <BigButton href='/get-started' backgroundColor={Theme.colors.blueGray} textColor={Theme.colors.white}>Get Started</BigButton>
              </Col>
              <Col md={1} />
              <Col md={1}>
                <img style={{ marginTop: 30 }} src='/static/images/cloud.svg' className='animated-clouds-right' />
              </Col>
              <Col md={1}>
                <img style={{ marginTop: -30 }} src='/static/images/cloud.svg' />
              </Col>
              <Col md={1} />
            </Row>
          </Grid>
        </div>

        <div style={{
          height: 183,
          background: `url("/static/images/clouds.svg") no-repeat center ${Theme.colors.blue}`
        }} />

        <div style={{
          backgroundColor: Theme.colors.yellow,
          color: Theme.colors.blue
        }}>
          <Grid style={Theme.padding.section}>
            <Row>
              <Col md={1} />
              <Col md={1} style={{ textAlign: 'center' }}>
                <img src='/static/images/jetpack-lady.svg' className='animated-hover-jetpack' />
              </Col>
              <Col md={1} />
              <Col md={6} style={{ textAlign: 'center' }}>
                <h1 style={Theme.typeography.h1}>To the Rescue</h1>
                <h2 style={Theme.typeography.h2}>No matter what you are building,<br /> ActionHero is here to save the day.</h2>
              </Col>
              <Col md={3} />
            </Row>
            <Row>
              <FeatureBox
                title='Internet of Things'
                image='/static/images/internet-of-things.svg'
                body="ActionHero's small footprint and stateful server options make it ideal for IOT applications where as much logic as possible is offloaded to the server."
              />

              <FeatureBox
                title='Real Time Chat'
                image='/static/images/real-time-chat.svg'
                body='ActionHero works with both stateless and statefull clients, making it ideal for chat applications.  ActionHero can work in a cluster to handle all the clients you can throw at it.'
              />

              <FeatureBox
                title='Video Games & Apps'
                image='/static/images/video-game-servers.svg'
                body='ActionHero was built to serve the same APIs across multiple protocols.  Do your games speak both HTTP and Socket?  ActionHero has got you covered.'
              />
            </Row>
            <Row>
              <Col md={12} style={{ textAlign: 'center' }}>
                <h2 style={{
                  fontFamily: 'Roboto, sans-serif',
                  fontWeight: 400,
                  fontSize: 20,
                  lineHeight: '1.5em',
                  color: '#3B5D72'
                }}>... and a whole lot more!</h2>
              </Col>
            </Row>
          </Grid>
        </div>

        <div style={{
          backgroundColor: Theme.colors.white,
          color: Theme.colors.blue
        }}>
          <Grid style={Theme.padding.section}>
            <Row>
              <Col md={12} style={{ textAlign: 'center' }}>
                <h1 style={Theme.typeography.h1}>Plays Well With Others</h1>
                <h2 style={Theme.typeography.h2}>Use ActionHero around <em>your</em> workflow and preferred tools.</h2>
              </Col>
            </Row>

            <Row className='hidden-xs hidden-sm'>
              <Col md={12} style={{ textAlign: 'center' }}>
                <img style={smallIconStyle} src='/static/images/plays-well-with-others/electron.svg' />
                <img style={smallIconStyle} src='/static/images/plays-well-with-others/angular.svg' />
                <img style={smallIconStyle} src='/static/images/plays-well-with-others/swift.svg' />
                <img style={smallIconStyle} src='/static/images/plays-well-with-others/elasticsearch.svg' />
                <img style={smallIconStyle} src='/static/images/plays-well-with-others/redis.svg' />
                <img style={smallIconStyle} src='/static/images/plays-well-with-others/npm.svg' />
                <img style={smallIconStyle} src='/static/images/plays-well-with-others/ember.svg' />
              </Col>
            </Row>

            <Row className='hidden-md hidden-lg hidden-xl'>
              <Col md={2} />
              <Col md={1} style={{ textAlign: 'center' }}>
                <img style={smallIconStyle} src='/static/images/plays-well-with-others/electron.svg' />
              </Col>
              <Col md={1} style={{ textAlign: 'center' }}>
                <img style={smallIconStyle} src='/static/images/plays-well-with-others/angular.svg' />
              </Col>
              <Col md={1} style={{ textAlign: 'center' }}>
                <img style={smallIconStyle} src='/static/images/plays-well-with-others/swift.svg' />
              </Col>
              <Col md={1} style={{ textAlign: 'center' }}>
                <img style={smallIconStyle} src='/static/images/plays-well-with-others/elasticsearch.svg' />
              </Col>
              <Col md={1} style={{ textAlign: 'center' }}>
                <img style={smallIconStyle} src='/static/images/plays-well-with-others/redis.svg' />
              </Col>
              <Col md={1} style={{ textAlign: 'center' }}>
                <img style={smallIconStyle} src='/static/images/plays-well-with-others/npm.svg' />
              </Col>
              <Col md={2} style={{ textAlign: 'center' }}>
                <img style={smallIconStyle} src='/static/images/plays-well-with-others/ember.svg' />
              </Col>
              <Col md={2} />
            </Row>

            <Row>
              <Col md={12} style={{ textAlign: 'center' }}>
                <img style={smallIconStyle} src='/static/images/flying-man.svg' />
              </Col>
            </Row>

          </Grid>
        </div>

        <div style={{
          backgroundColor: Theme.colors.yellow,
          color: Theme.colors.blue
        }}>
          <Grid style={Theme.padding.section}>
            <Row>
              <Col md={3} />
              <Col md={6} style={{ textAlign: 'center' }}>
                <h1 style={Theme.typeography.h1}>You've Got the Power</h1>
                <h2 style={Theme.typeography.h2}>ActionHero was built from the ground up to include all the features you expect from a modern API framework. It also knows when to get out of the way so you can customize your stack to fit your needs.</h2>
              </Col>
              <Col md={3} />
            </Row>
            <Row>
              <FeatureBox
                title='Easy-to-Use Actions'
                image='/static/images/easy-to-use-actions.svg'
                body='With ActionHero, you create Actions which can respond to any type of connection. They process incoming parameters and offer a response to the client. ActionHero takes care of routing and responding to each connection type for you.'
                code={CodeSamples.eastToUseActions}
              />

              <FeatureBox
                title='Built-in Tasks'
                image='/static/images/built-in-tasks.svg'
                body='Background tasks are first-class in ActionHero. You can enqueue a task from anywhere in the application. Tasks can be recurring or single-run. The ActionHero task system is powered by Resque, so it is compatible with a number of other applications and frameworks.'
                code={CodeSamples.backgroundTasks}
              />

              <FeatureBox
                title='Cluster-Ready'
                image='/static/images/cluster-ready.svg'
                body='ActionHero uses Redis to store and share data. With first-class cache functions, decentralized communications, and distributed workers, you can be sure that your application is able to scale from 1 worker on one server, to as big of a cluster as you need.'
                code={CodeSamples.clusterReady}
              />
            </Row>

            <Row>
              <FeatureBox
                title='Localization'
                image='/static/images/localization.svg'
                body='The ActionHero API makes is simple to create a traditional HTTP(S) API, but it also lets you easily extend your API to TCP and websocket clients (all included). ActionHero also easily lets you write your own servers to handle custom transports.'
                code={CodeSamples.localization}
              />

              <FeatureBox
                title='Routing'
                image='/static/images/routing.svg'
                body='ActionHero ships with a robust router to make mapping HTTP requests to your actions a breeze.'
                code={CodeSamples.routing}
              />

              <FeatureBox
                title='API-First Development'
                image='/static/images/api-first-development.svg'
                body='ActionHero makes API-First development easy by enforcing a strict separation of views and application logic and removing barriers to API creation. Versioning your actions is simple and integrates well with Agile or XP team workflows.'
              />
            </Row>

            <Row>
              <FeatureBox
                title='Chat'
                image='/static/images/chat.svg'
                body="The ActionHero API makes it simple to create a ActionHero (optionally) facilitates real-time communication not only from server-to-client, but also client-to-client! ActionHero's chat sub-system allows for streaming of both public and private messages between clients. Complete with middleware and extensions, you can create chat services, multi-player games, and more!"
                code={CodeSamples.chat}
              />

              <FeatureBox
                title='Operations Tools'
                image='/static/images/ops-tools.svg'
                body='It is simple to deploy ActionHero with our included CLI tools. You can launch your server as a single instance or as part of a larger deployment cluster. Tools for 0-downtime deployments and robust monitoring and logging hooks make ActionHero a dream platform for your operations team.'
              />

              <FeatureBox
                title='File Server'
                image='/static/images/file-server.svg'
                body="Every server needs to serve files to its clients (even those that don't speak HTTP), and ActionHero is no exception. Configured to asynchronously stream file contents, ActionHero provides an robust file server which can live in parallel with your API, allowing for a fully featured server."
              />
            </Row>
          </Grid>
        </div>

        <div style={{
          backgroundColor: Theme.colors.white,
          color: Theme.colors.blue
        }}>
          <Grid style={Theme.padding.section}>
            <Row>
              <Col md={12} style={{ textAlign: 'center' }}>
                <h1 style={Theme.typeography.h1}>Trusted by Top Companies and Organizations</h1>
                <br />
              </Col>
            </Row>

            <Row className='hidden-xs hidden-sm'>
              <Col md={12} style={{ textAlign: 'center' }}>
                <img style={smallIconStyle} src='/static/images/companies/riot-games.svg' />
                <img style={smallIconStyle} src='/static/images/companies/samsung.svg' />
                <img style={smallIconStyle} src='/static/images/companies/va.svg' />
                <img style={smallIconStyle} src='/static/images/companies/madglory.svg' />
                <img style={smallIconStyle} src='/static/images/companies/taskrabbit.svg' />
              </Col>
            </Row>

            <Row className='hidden-md hidden-lg hidden-xl'>
              <Col md={1} />
              <Col md={2} style={{ textAlign: 'center' }}>
                <img style={smallIconStyle} src='/static/images/companies/riot-games.svg' />
              </Col>
              <Col md={2} style={{ textAlign: 'center' }}>
                <img style={smallIconStyle} src='/static/images/companies/samsung.svg' />
              </Col>
              <Col md={1} style={{ textAlign: 'center' }}>
                <img style={smallIconStyle} src='/static/images/companies/va.svg' />
              </Col>
              <Col md={2} style={{ textAlign: 'center' }}>
                <img style={smallIconStyle} src='/static/images/companies/madglory.svg' />
              </Col>
              <Col md={3} style={{ textAlign: 'center' }}>
                <img style={smallIconStyle} src='/static/images/companies/taskrabbit.svg' />
              </Col>
              <Col md={1} />
            </Row>

          </Grid>
        </div>

        <SolutionsGrid />

        <div style={{
          backgroundColor: Theme.colors.yellow,
          color: Theme.colors.blue,
          backgroundImage: 'url("/static/images/starburst.png")',
          backgroundSize: '100% 100%'
        }}>
          <Grid style={Theme.padding.section}>
            <Row>
              <Col md={12} style={{ textAlign: 'center' }}>
                <h1 style={Theme.typeography.h1}>Ready to take your development to the next level?</h1>
              </Col>
            </Row>

            <Row>
              <Col md={12} style={{ textAlign: 'center' }}>
                <BigButton href='/get-started' backgroundColor={Theme.colors.red} textColor={Theme.colors.white}>Get Started</BigButton>
              </Col>
            </Row>
          </Grid>
        </div>

      </Page>
    )
  }
}
