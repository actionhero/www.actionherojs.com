import React from 'react'
import Link from 'next/link'
import { Grid, Row, Col, Button } from 'react-bootstrap'
import Page from './../components/layouts/page.js'

import Theme from './../components/theme.js'
import SolutionsGrid from './../components/solutionsGrid.js'
import FeatureBox from './../components/elements/homepageFeatureBox.js'

const CodeSamples = {
  eastToUseActions: `exports.action = {
  name: 'randomNumber',
  description: 'I generate a random number',
  action.inputs: {
    'required' : [],
    'optional' : []
  },
  outputExample: {randomNumber: 123}
  run: function(api, data, next){
    data.response.randomNumber = Math.random();
    next();
  }
}`,
  backgroundTasks: `api.tasks.enqueue(
    "sendWelcomeEmail",
    {to: 'evan@evantahler.com'},
    'default',
function(error, toRun){
  // done!
});

var task = {
  name:          "sendWelcomeEmail",
  description:   "I will send a new user a welcome email",
  queue:         "default",
  frequency:     0,
  run: function(api, params, next){
    api.sendEmail(params.email, function(error){
      if(error){ api.log(error, 'error'); }
      next();
    })
  }
};`,
  clusterReady: `./node_modules/.bin/actionhero start cluster --workers 10`,
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
api.chatRoom.broadcast(null, 'myRoom', 'Hello!')

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
          <Grid>
            <Row style={{paddingTop: 100}}>
              <Col md={12} style={{textAlign: 'center'}}>
                <img alt='logo' src='/static/images/actionhero-logo-big.svg' />
              </Col>
            </Row>

            <Row style={{paddingTop: 10}}>
              <Col md={2} />
              <Col md={8} style={{textAlign: 'center'}}>
                <h1 style={{letterSpacing: '0.3em', color: Theme.colors.yellow}}>ACTIONHERO</h1>
                <p><em>v17.0.0</em></p>
                <h2 style={{fontWeight: 200, paddingTop: 30}}>The Reusable, Scalable, and Quick node.js API Server for stateless and stateful applications</h2>
              </Col>
              <Col md={2} />
            </Row>

            <Row style={{paddingTop: 60, paddingBottom: 80}}>
              <Col md={1} />
              <Col md={1}>
                <img src='/static/images/cloud.svg' className='animated-clouds-left' />
              </Col>
              <Col md={1} />

              <Col md={3}>
                <Link href='/downloads'>
                  <a>
                    <Button style={Theme.buttons.big(Theme.colors.red, Theme.colors.yellow)} bsSize='large' block>Download</Button>
                  </a>
                </Link>
              </Col>

              <Col md={3}>
                <Link href='/get-started'>
                  <a>
                    <Button style={Theme.buttons.big(Theme.colors.blueGray, Theme.colors.yellow)} bsStyle='primary' bsSize='large' block>Get Started</Button>
                  </a>
                </Link>
              </Col>

              <Col md={1}>
                <img style={{marginTop: 30}} src='/static/images/cloud.svg' className='animated-clouds-right' />
              </Col>
              <Col md={1}>
                <img style={{marginTop: -30}} src='/static/images/cloud.svg' />
              </Col>
              <Col md={1} />
            </Row>
          </Grid>
        </div>

        <Row>
          <Col md={12}>
            <div style={{
              height: 229,
              backgroundColor: Theme.colors.blue,
              backgroundImage: 'url("/static/images/clouds.svg")'
            }} />
          </Col>
        </Row>

        <div style={{
          backgroundColor: Theme.colors.yellow,
          color: Theme.colors.lightGray,
          fontWeight: 200
        }}>
          <Grid>
            <Row>
              <Col md={1} />
              <Col md={1} style={{textAlign: 'center'}}>
                <img src='/static/images/jetpack-lady.svg' className='animated-hover-jetpack' />
              </Col>
              <Col md={1} />
              <Col md={6} style={{textAlign: 'center'}}>
                <h1>To the Rescue</h1>
                <h2 style={{paddingTop: 30, fontWeight: 200}}>No matter what you are building,<br /> ActionHero is here to save the day.</h2>
              </Col>
              <Col md={3} />
            </Row>
            <Row>
              <FeatureBox
                title='Internet of Things'
                image='/static/images/internet-of-things.svg'
                body="ActionHero\'s small footprint and stateful server options make it ideal for IOT applications where as much logic as possible is offloaded to the server."
              />

              <FeatureBox
                title='Internet of Things'
                image='/static/images/real-time-chat.svg'
                body='ActionHero works with both stateless and statefull clients, making it ideal for chat applications.  ActionHero can work in a cluster to handle all the clients you can throw at it.'
              />

              <FeatureBox
                title='Video Games & Apps'
                image='/static/images/video-game-servers.svg'
                body='ActionHero was build to serve the same APIs across multiple proticols.  Do your games speak both HTTP and Socket?  ActionHero has got you covered.'
              />
            </Row>
            <Row>
              <Col md={12} style={{textAlign: 'center'}}>
                <div style={{padding: 50}}>
                  <h2 style={{fontWeight: 200}}>... and a whole lot more!</h2>
                </div>
              </Col>
            </Row>
          </Grid>
        </div>

        <div style={{
          backgroundColor: Theme.colors.white,
          color: Theme.colors.lightGray
        }}>
          <Grid>
            <Row style={{paddingTop: 100}}>
              <Col md={3} />
              <Col md={6} style={{textAlign: 'center'}}>
                <h1>Plays Well With Others</h1>
                <h3 style={{fontWeight: 200}}>Use ActionHero around <em>your</em> workflow and preferred tools.</h3>
              </Col>
              <Col md={1} />
              <Col md={1} style={{textAlign: 'center'}}>
                <img style={smallIconStyle} src='/static/images/flying-man.svg' />
              </Col>
              <Col md={1} />
            </Row>
            <Row style={{paddingTop: 20, paddingBottom: 60}}>
              <Col md={3} />
              <Col md={1} style={{textAlign: 'center'}}>
                <img style={smallIconStyle} src='/static/images/plays-well-with-others/electron.svg' />
              </Col>
              <Col md={1} style={{textAlign: 'center'}}>
                <img style={smallIconStyle} src='/static/images/plays-well-with-others/angular.svg' />
              </Col>
              <Col md={1} style={{textAlign: 'center'}}>
                <img style={smallIconStyle} src='/static/images/plays-well-with-others/swift.svg' />
              </Col>
              <Col md={1} style={{textAlign: 'center'}}>
                <img style={smallIconStyle} src='/static/images/plays-well-with-others/elasticsearch.svg' />
              </Col>
              <Col md={1} style={{textAlign: 'center'}}>
                <img style={smallIconStyle} src='/static/images/plays-well-with-others/redis.svg' />
              </Col>
              <Col md={1} style={{textAlign: 'center'}}>
                <img style={smallIconStyle} src='/static/images/plays-well-with-others/npm.svg' />
              </Col>
              <Col md={3} />
            </Row>
          </Grid>
        </div>

        <div style={{
          backgroundColor: Theme.colors.yellow,
          color: Theme.colors.lightGray,
          fontWeight: 200,
          paddingBottom: 50
        }}>
          <Grid>
            <Row style={{paddingTop: 50}}>
              <Col md={2} />
              <Col md={8} style={{textAlign: 'center'}}>
                <h1>You've Got the Power</h1>
                <br />
                <p>ActionHero was built from the ground up to include all the features you expect from a modern API framework. It also knows when to get out of the way so you can customize your stack to fit your needs.</p>
              </Col>
              <Col md={2} />
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
          color: Theme.colors.lightGray
        }}>
          <Grid>
            <Row style={{paddingTop: 100}}>
              <Col md={3} />
              <Col md={6} style={{textAlign: 'center'}}>
                <h1>Trusted by Top Compaines and Orginizations</h1>
              </Col>
              <Col md={3} />
            </Row>
            <Row style={{paddingTop: 50, paddingBottom: 100}}>
              <Col md={1} />
              <Col md={3} style={{textAlign: 'center'}}>
                <img style={smallIconStyle} src='/static/images/companies/taskrabbit.svg' />
              </Col>
              <Col md={1} style={{textAlign: 'center'}}>
                <img style={smallIconStyle} src='/static/images/companies/riot-games.svg' />
              </Col>
              <Col md={2} style={{textAlign: 'center'}}>
                <img style={smallIconStyle} src='/static/images/companies/samsung.svg' />
              </Col>
              <Col md={1} style={{textAlign: 'center'}}>
                <img style={smallIconStyle} src='/static/images/companies/va.svg' />
              </Col>
              <Col md={2} style={{textAlign: 'center'}}>
                <img style={smallIconStyle} src='/static/images/companies/madglory.svg' />
              </Col>
              <Col md={1} />
            </Row>
          </Grid>
        </div>

        <SolutionsGrid />

        <div style={{
          backgroundColor: Theme.colors.yellow,
          color: Theme.colors.lightGray,
          fontWeight: 200,
          paddingBottom: 50,
          backgroundImage: 'url("/static/images/starburst.png")',
          backgroundSize: '100% 100%'
        }}>
          <Grid>
            <Row style={{paddingTop: 50}}>
              <Col md={2} />
              <Col md={8} style={{textAlign: 'center'}}>
                <h1>Ready to take your development to the next level?</h1>
                <br />
              </Col>
              <Col md={2} />
            </Row>

            <Row>
              <Col md={12} style={{textAlign: 'center'}}>
                <Link href='/get-started'>
                  <a>
                    <Button style={Theme.buttons.big(Theme.colors.red, Theme.colors.yellow)} bsStyle='primary' bsSize='large' block>Get Started</Button>
                  </a>
                </Link>
              </Col>
            </Row>
          </Grid>
        </div>

      </Page>
    )
  }
}
