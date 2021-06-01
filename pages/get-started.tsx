import DocsPageWithNav from "../pageClasses/docsPageWithSideNav";
import { Row, Col } from "react-bootstrap";
import DocsPage from "../components/layouts/docsPage";
import Code from "../components/code";

const ExampleBootCode = `❯ npm run dev

> actionhero@21.0.6 dev /Users/evan/workspace/actionhero/actionhero
> ts-node-dev --transpile-only src/server.ts

Using ts-node version 8.5.2, typescript version 3.7.2
₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋
ACTIONHERO COMMAND >> start
⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻
192.168.7.33 @ 2019-11-27T23:29:24.255Z - notice: pid: 70962
192.168.7.33 @ 2019-11-27T23:29:24.256Z - notice: environment: development
192.168.7.33 @ 2019-11-27T23:29:24.256Z - info: *** Starting ActionHero ***
192.168.7.33 @ 2019-11-27T23:29:24.258Z - info: actionhero member 192.168.7.33 has joined the cluster
192.168.7.33 @ 2019-11-27T23:29:24.261Z - notice: Starting server: 'web' @ 0.0.0.0:8080
192.168.7.33 @ 2019-11-27T23:29:24.262Z - notice: Starting server: 'websocket'
192.168.7.33 @ 2019-11-27T23:29:24.776Z - notice: server ID: 192.168.7.33
192.168.7.33 @ 2019-11-27T23:29:24.776Z - notice: *** ActionHero Started ***`;

const InstallInstructions = `# On OSX With Homebrew:

brew install node
brew install redis
brew services start redis # this will keep redis running in the background forever

# On Ubuntu:

(sudo) apt-get install node
(sudo) apt-get install redis-server
redis-server --daemonize yes # this will keep redis running in the background for this session

# On Windows:

[download nodeJS](https://nodejs.org/en/download)
[download redis](https://github.com/MSOpenTech/redis)
run redis.exe in a background window
`;

const Quickstart = `mkdir ~/project && cd ~/project
npx actionhero generate
npm install
# ensure redis is running; see above
npm dev`;

const Folders = `|
|- src
|  - config
|    - (project settings)
|
|  - actions
|    -- (your actions)
|
|  - initializers
|    -- (any additional initializers you want)
|
|  - servers
|    -- (custom servers you may make)
|
|  - tasks
|    -- (your tasks)
|
|  - bin
|    -- (your custom CLI commands)
|
|- locales
|-- (translation files)
|
|- __tests__
|-- (tests for your API)
|
| - log
|-- (default location for logs)
|
|- node_modules
|-- (your modules, actionhero should be npm installed in here)
|
|- pids
|-- (pidfiles for your running servers)
|
|- public
|-- (your static assets to be served by /file)
|
readme.md
package.json

`;

export default class GetStartedPage extends DocsPageWithNav {
  constructor(props) {
    super(props);

    this.state = {
      titleSection: {
        title: "Let's get Started",
        icon: "/static/images/get-started.svg",
      },
      sections: {
        who: "Who is the Actionhero?",
        "getting-started": "Getting Started",
        quickstart: "Install and Quickstart",
        "key-concepts": "Key Concepts",
        structure: "Application Structure",
        tutorial: "Tutorial",
        contributing: "Contributing",
        notes: "Documentation Notes",
      },
      links: [
        {
          link: "/key-concepts",
          title: "» Key Concepts",
        },
      ],
    };
  }

  render() {
    return (
      <DocsPage
        sideNav={this.state.sections}
        titleSection={this.state.titleSection}
        links={this.state.links}
        currentSection={this.state.currentSection}
        showSolutions
      >
        <Row>
          <Col md={12}>
            {this.section(
              "who",
              <div>
                <p>
                  Actionhero is a <a href="http://nodejs.org">node.js</a>{" "}
                  <strong>API framework</strong> for both{" "}
                  <strong>tcp sockets</strong>, <strong>web sockets</strong>,
                  and <strong>http clients</strong>. The goal of Actionhero is
                  to create an easy-to-use toolkit for making{" "}
                  <strong>reusable</strong> & <strong>scalable</strong> APIs.
                  Clients connected to an Actionhero server can{" "}
                  <strong>consume the API</strong>,{" "}
                  <strong>consume static content</strong>, and{" "}
                  <strong>communicate with each other</strong>.
                </p>
                <p>
                  Actionhero servers can process both requests and tasks
                  (delayed actions like `send e-mail` or other background jobs).
                  Actionhero servers can also run in a cluster (on the same or
                  multiple machines) to work in concert to handle your load.
                </p>
                <p>
                  The Actionhero API defines a single access point and accepts
                  GET, POST, PUT and DELETE input along with persistent
                  connection via TCP or web sockets. You define{" "}
                  <strong>Actions</strong> which handle input and response, such
                  as `userAdd` or `geoLocate`. HTTP, HTTPS, and TCP clients can
                  all use these actions. The Actionhero API is not inherently
                  'RESTful' (which is meaningless for persistent socket
                  connections) but can be extended to be so if you wish.
                </p>
                <p>
                  Actionhero will also serve static files for you, but
                  Actionhero is not a 'rendering' server (like express or
                  rails).
                </p>

                <Code language="bash">{ExampleBootCode}</Code>
              </div>
            )}

            {this.section(
              "getting-started",
              <div>
                <h3 id="requirements">Requirements</h3>

                <ul>
                  <li>node.js ( {`>`}= v10.0.0)</li>
                  <li>npm</li>
                  <li>
                    redis (for cluster support, cache, chat, and tasks); but not
                    required.
                  </li>
                </ul>

                <Code language="bash">{InstallInstructions}</Code>
              </div>
            )}

            {this.section(
              "quickstart",
              <div>
                <p>Get started now:</p>
                <Code language="bash">{Quickstart}</Code>

                <ul>
                  <li>
                    Create a new directory{" "}
                    <code>mkdir ~/project && cd ~/project</code>
                  </li>
                  <li>
                    Checkout the Actionhero source{" "}
                    <code>npm install actionhero</code>
                  </li>
                  <li>
                    Use the generator to create a template project{" "}
                    <code>npx actionhero generate</code>
                  </li>
                  <li>
                    <code>npm install</code> to install dependencies
                  </li>
                  <li>
                    You can now start up the server: <code>npm dev</code>
                  </li>
                </ul>

                <p>
                  Visit <code>http://127.0.0.1:8080</code> in your browser to
                  see the Actionhero in action!
                </p>
                <p>
                  Do not install Actionhero globally with{" "}
                  <code>npm install -g</code>. Actionhero does not support
                  running from a global (system) location, and expects to be
                  installed locally per-project. You can learn more about why{" "}
                  <a href="https://github.com/actionhero/actionhero/issues/1141">
                    here
                  </a>
                </p>
              </div>
            )}

            {this.section(
              "key-concepts",
              <div>
                <p>
                  The next step is learning more about Actionhero's{" "}
                  <a href="/key-concepts">Key Concepts</a>,{" "}
                  <strong>Actions</strong>, <strong>Tasks</strong>,{" "}
                  <strong>Initializers</strong>, <strong>Chat</strong>, and{" "}
                  <strong> Servers</strong>, and how Actionhero differs from a
                  traditional MVC-style framework.
                </p>
              </div>
            )}

            {this.section(
              "structure",
              <div>
                <Code language="bash">{Folders}</Code>
                <p>
                  The map to the right describes Actionhero's default project
                  layout.
                </p>
                <p>
                  Actions in <code>/actions</code> will be loaded in
                  automatically, along <code>/initializers</code> and{" "}
                  <code>/tasks</code>.
                </p>
                <p>
                  <code>/public</code> will become your application's default
                  static asset location.
                </p>
                <p>
                  If you wish to customize your project's paths, you can do so
                  within <code>config/api.js</code> in the{" "}
                  <code>config.general.paths</code> section.
                </p>
              </div>
            )}

            {this.section(
              "tutorial",
              <div>
                <p>
                  Want to see an example application using Actionhero? You can
                  check out the code and follow the detailed guide{" "}
                  <a href="https://github.com/Actionhero/Actionhero-tutorial">
                    here (https://github.com/Actionhero/Actionhero-tutorial)
                  </a>
                  . This project demonstrates many of the core features of
                  Actionhero in a simple project.
                </p>
              </div>
            )}

            {this.section(
              "contributing",
              <div>
                <p>
                  The www.actionherojs.com website and documentation is hosted
                  on Heroku, and built from{" "}
                  <a href="https://github.com/Actionhero/www.actionherojs.com">
                    this codebase
                  </a>
                  . You can submit pull requests to the main branch with any
                  updates or changes.
                </p>
              </div>
            )}

            {this.section(
              "notes",
              <div>
                <p>
                  This documentation will always reflect the main branch of
                  Actionhero, and therefore may be slightly ahead of the latest
                  release on NPM.
                </p>
              </div>
            )}
          </Col>
        </Row>
      </DocsPage>
    );
  }
}
