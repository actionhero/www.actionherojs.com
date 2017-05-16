import DocsPageWithNav from './../pageClasses/docsPageWithSideNav.js'
import { Row, Col } from 'react-bootstrap'
import DocsPage from './../components/layouts/docsPage.js'

// import Theme from './../components/theme.js'
import Code from './../components/code.js'

const ExampleBootCode = `> npm start

> actionhero@12.2.2 start /app/actionhero
> node ./bin/actionhero

info: actionhero >> start
2015-11-14 16:01:27 - notice: *** starting actionhero ***
2015-11-14 16:01:27 - info: actionhero member 10.0.1.15 has joined the cluster
2015-11-14 16:01:27 - notice: pid: 36087
2015-11-14 16:01:27 - notice: server ID: 10.0.1.15
2015-11-14 16:01:27 - info: ensuring the existence of the chatRoom: defaultRoom
2015-11-14 16:01:27 - info: ensuring the existence of the chatRoom: anotherRoom
2015-11-14 16:01:27 - notice: starting server: web
2015-11-14 16:01:27 - notice: starting server: websocket
2015-11-14 16:01:28 - notice: environment: development
2015-11-14 16:01:28 - notice: *** Server Started @ 2015-11-14 16:01:28 ***
`

const InstallInstructions = `# On OSX With Homebrew:

brew install node
brew install redis

# On Ubuntu:

(sudo) apt-get install node
(sudo) apt-get install redis-server

# On Windows:

[download nodeJS](https://nodejs.org/en/download)
[download redis](https://github.com/MSOpenTech/redis)
`

const Quickstart = `mkdir ~/project && cd ~/project
npm install actionhero
./node_modules/.bin/actionhero generate
npm install
npm start`

const Folders = `# ActionHero Project Layout

|- config
| -- api.js
| -- errors.js
| -- i18n.js
| -- logger.js
| -- redis.js
| -- routes.js
| -- tasks.js
| -- servers
| ---- web.js
| ---- websocket.js
| ---- socket.js
|-- (project settings)
|
|- actions
|-- (your actions)
|
|- initializers
|-- (any additional initializers you want)
|
|- log
|-- (default location for logs)
|
|- node_modules
|-- (your modules, ActionHero should be npm installed in here)
|
|- pids
|-- (pidfiles for your running servers)
|
|- public
|-- (your static assets to be served by /file)
|
|- servers
|-- (custom servers you may make)
|
|- tasks
|-- (your tasks)
|
|- locales
|-- (translation files)
|
|- tests
|-- (tests for your API)
|
readme.md
package.json (be sure to include 'actionhero':'x')`

export default class extends DocsPageWithNav {
  constructor (props) {
    super(props)

    this.state = {
      titleSection: {
        title: "Let's get Started",
        icon: '/static/images/get-started.svg'
      },
      sections: {
        'who': 'Who is the ActionHero?',
        'contributing': 'Contributing',
        'notes': 'Documentation Notes',
        'getting-started': 'Getting Started',
        'quickstart': 'Install and Quickstart',
        'structure': 'Application Structure',
        'tutorial': 'Tutorial'
      }
    }
  }

  render () {
    return (
      <DocsPage sideNav={this.state.sections} titleSection={this.state.titleSection} currentSection={this.state.currentSection}>
        <Row>
          <Col md={12}>
            { this.section('who',
              <div>
                <p>ActionHero is a <a href='http://nodejs.org'>node.js</a> <strong>API framework</strong> for both <strong>tcp sockets</strong>, <strong>web sockets</strong>, and <strong>http clients</strong>.  The goal of ActionHero is to create an easy-to-use toolkit for making <strong>reusable</strong> & <strong>scalable</strong> APIs.  Clients connected to an ActionHero server can <strong>consume the API</strong>, <strong>consume static content</strong>, and <strong>communicate with each other</strong>.</p>
                <p>ActionHero servers can process both requests and tasks (delayed actions like `send e-mail` or other background jobs).  ActionHero servers can also run in a cluster (on the same or multiple machines) to work in concert to handle your load.</p>
                <p>The ActionHero API defines a single access point and accepts GET, POST, PUT and DELETE input along with persistent connection via TCP or web sockets. You define <strong>Actions</strong> which handle input and response, such as `userAdd` or `geoLocate`. HTTP, HTTPS, and TCP clients can all use these actions.  The ActionHero API is not inherently 'RESTful' (which is meaningless for persistent socket connections) but can be extended to be so if you wish.</p>
                <p>ActionHero will also serve static files for you, but ActionHero is not a 'rendering' server (like express or rails).</p>

                <Code language='bash'>{ExampleBootCode}</Code>
              </div>
            )}

            { this.section('contributing',
              <div>
                <p>The actionherojs.com website and documentation is hosted on <a href='http://pages.github.com'>GitHub Pages</a>.  You can submit pull requests to the <a href='https://github.com/actionhero/actionhero/tree/master/docs'>master branch's `docs` folder</a> within the ActionHero project.</p>
              </div>
            )}

            { this.section('notes',
              <div>
                <p>This documentation will always reflect the master branch of ActionHero, and therefore may be slightly ahead of the latest release on NPM.</p>
              </div>
            )}

            { this.section('getting-started',
              <div>
                <h3 id='requirements'>Requirements</h3>

                <ul>
                  <li>node.js ( >= v4.0.0)</li>
                  <li>npm</li>
                  <li>redis (for cluster support, cache, stats, and tasks); but not required.</li>
                </ul>

                <Code language='bash'>{InstallInstructions}</Code>
              </div>
            )}

            { this.section('quickstart',
              <div>
                <p>Get started now:</p>
                <Code language='bash'>{Quickstart}</Code>

                <ul>
                  <li>Create a new directory <code>mkdir ~/project && cd ~/project</code></li>
                  <li>Checkout the ActionHero source <code>npm install actionhero</code></li>
                  <li>Use the generator to create a template project <code>./node_modules/.bin/actionhero generate</code></li>
                  <li><code>npm install</code> to install dependencies</li>
                  <li>You can now start up the server: <code>npm start</code></li>
                </ul>

                <p>Visit <code>http://127.0.0.1:8080</code> in your browser to see the ActionHero in action!</p>
                <p>You can also opt to install ActionHero globally <code>npm install actionhero -g</code> and then you can just call <code>actionhero start</code>.</p>
              </div>
            )}

            { this.section('structure',
              <div>
                <Code language='bash'>{Folders}</Code>
                <p>The map to the right describes ActionHero's default project layout.</p>
                <p>Actions in <code>/actions</code> will be loaded in automatically, along <code>/initializers</code> and <code>/tasks</code>.</p>
                <p><code>/public</code> will become your application's default static asset location.</p>
                <p>If you wish to customize your project's paths, you can do so within <code>config/api.js</code> in the <code>api.config.general.paths</code> section.</p>
              </div>
            )}

            { this.section('tutorial',
              <div>
                <p>Want to see an example application using ActionHero?  You can check out the code and follow the detailed guide <a href='https://github.com/actionhero/actionhero-tutorial'>here (https://github.com/actionhero/actionhero-tutorial)</a>.  This project demonstrates many of the core features of ActionHero in a simple project.</p>
              </div>
            )}
          </Col>
        </Row>
      </DocsPage>
    )
  }
}
