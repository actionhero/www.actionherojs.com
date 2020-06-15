import { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Page from "./../components/layouts/page";
import Theme from "./../components/theme";
import BigButton from "./../components/buttons/bigButton";
import SolutionsGrid from "./../components/solutionsGrid";
import FeatureBox from "./../components/elements/homepageFeatureBox";
import Code from "./../components/code";

const CodeSamples = {
  getStarted: `# Generate a new Project
npx actionhero generate
npm install
npm run build # <--- new! I compile the TS to JS
npm run dev # <--- new! I use \`ts-node\` to let you develop on your ts files without compiling

# Use the actionhero CLI
(npx) actionhero generate action --name my_action
(npx) actionhero generate task --name my_task --queue default --frequency 0

# Test
npm test
# I'll run \`prettier\` and \`build\` for you first
# I handle .ts files now!

# To deploy your app
npm run build # <--- new! I compile the TS to JS
npm run start`,
  eastToUseActions: `import { Action } from 'Actionhero'

export class RandomNumber extends Action {
  constructor () {
    super()
    this.name = 'randomNumber'
    this.description = 'I am an API method which will generate a random number'
    this.outputExample = { randomNumber: 0.123 }
  }

  async run ({ response }) {
    response.randomNumber = Math.random()
  }
}`,
  backgroundTasks: `
import { task, Task} from 'actionhero'

  await task.enqueue(
    "sendWelcomeEmail",
    {to: 'evan@evantahler.com'},
    'default');

export class RunAction extends Task {
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
  clusterReady:
    "docker run -t -i --rm --publish 8080:8080 actionhero/actionhero",
  localization: `let number = Math.random()
let response = connection.localize(['Your random number is {{number}}', {number: number}])
response.stringRandomNumber = response`,
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
await chatRoom.broadcast(null, 'myRoom', 'Hello!')

//client
client.on('message', (message) => alert(message))
`,
};

const smallIconStyle = {
  padding: 30,
};

const badgeStyle = {
  padding: 10,
};

export default class indexPage extends Component {
  render() {
    return (
      <Page>
        <div
          style={{
            backgroundColor: Theme.colors.blue,
            color: Theme.colors.white,
          }}
        >
          <Container style={{ paddingTop: 50 }}>
            <Row>
              <Col md={2} />
              <Col md={8} style={{ textAlign: "center" }}>
                {" "}
                <img src="/static/images/logo-and-wordmark.svg" />
                <br />
                <h2
                  style={{
                    fontFamily: "Roboto",
                    fontWeight: 200,
                    paddingTop: 5,
                    paddingBottom: 40,
                  }}
                >
                  <br />
                  The reusable, scalable, and quick node.js API server for
                  stateless and stateful applications{" "}
                </h2>
              </Col>
              <Col md={2} />
            </Row>

            <Row>
              <Col md={1} />
              <Col md={1}>
                <img
                  src="/static/images/cloud.svg"
                  className="animated-clouds-left"
                />
              </Col>
              <Col md={2} />
              <Col md={2}>
                <BigButton
                  href="/downloads"
                  backgroundColor={Theme.colors.red}
                  textColor={Theme.colors.white}
                >
                  {" "}
                  Download{" "}
                </BigButton>
              </Col>
              <Col md={2}>
                <BigButton
                  href="/get-started"
                  backgroundColor={Theme.colors.blueGray}
                  textColor={Theme.colors.white}
                >
                  {" "}
                  Get Started{" "}
                </BigButton>
              </Col>
              <Col md={1} />
              <Col md={1}>
                <img
                  style={{ marginTop: 30 }}
                  src="/static/images/cloud.svg"
                  className="animated-clouds-right"
                />
              </Col>
              <Col md={1}>
                <img
                  style={{ marginTop: -30 }}
                  src="/static/images/cloud.svg"
                />
              </Col>
              <Col md={1} />
            </Row>
            <Row style={{ paddingTop: 40, paddingBottom: 20 }}>
              <Col
                style={{
                  textAlign: "center",
                }}
              >
                <p>
                  <a href="http://github.com/actionhero/actionhero?style=for-the-badge">
                    <img
                      style={badgeStyle}
                      alt="npm"
                      src="https://img.shields.io/npm/v/actionhero?style=for-the-badge"
                    />

                    <img
                      style={badgeStyle}
                      alt="npm"
                      src="https://img.shields.io/npm/dm/actionhero?style=for-the-badge"
                    />

                    <img
                      style={badgeStyle}
                      alt="NPM"
                      src="https://img.shields.io/npm/l/actionhero?style=for-the-badge"
                    />

                    <img
                      style={badgeStyle}
                      alt="GitHub stars"
                      src="https://img.shields.io/github/stars/actionhero/actionhero?style=for-the-badge"
                    />
                  </a>
                </p>
              </Col>
            </Row>
          </Container>
        </div>

        <div
          style={{
            height: 183,
            background: `url("/static/images/clouds.svg") no-repeat center ${Theme.colors.blue}`,
          }}
        />

        <div
          style={{
            backgroundColor: Theme.colors.yellow,
            color: Theme.colors.blue,
          }}
        >
          <Container style={Theme.padding.section}>
            <Row>
              <Col md={1} />
              <Col md={1} style={{ textAlign: "center" }}>
                <img
                  src="/static/images/jetpack-lady.svg"
                  className="animated-hover-jetpack"
                />
              </Col>
              <Col md={1} />
              <Col md={6} style={{ textAlign: "center" }}>
                <h1 style={Theme.typography.h1}> To the Rescue </h1>
                <h2 style={Theme.typography.h2}>
                  No matter what you are building, <br /> Actionhero is here to
                  save the day.
                </h2>
              </Col>
              <Col md={3} />
            </Row>
            <Row>
              <FeatureBox
                colSpan={3}
                title="APIs"
                image="/static/images/documentation.svg"
                body="The actionhero framework is one of the fastest ways to get started with a REST API - Routes, Versions, Testing and Translation tool are all included."
              />

              <FeatureBox
                colSpan={3}
                title="Internet of Things"
                image="/static/images/internet-of-things.svg"
                body="Actionhero's small footprint and stateful server options make it ideal for IOT applications where as much logic as possible is offloaded to the server."
              />

              <FeatureBox
                colSpan={3}
                title="Real Time Chat"
                image="/static/images/real-time-chat.svg"
                body="Actionhero includes all the modern tools you need for a highly-available realtime applications.  Actionhero can work in a cluster to handle all the clients you can throw at it."
              />

              <FeatureBox
                colSpan={3}
                title="Games & Apps"
                image="/static/images/video-game-servers.svg"
                body="Actionhero was built to serve the same APIs across multiple protocols.  Do your games speak both HTTP and Websockets?  Actionhero has got you covered."
              />
            </Row>
            <Row>
              <Col md={12} style={{ textAlign: "center" }}>
                <h2
                  style={{
                    fontFamily: "Roboto, sans-serif",
                    fontWeight: 400,
                    fontSize: 20,
                    lineHeight: "1.5em",
                    color: "#3B5D72",
                  }}
                >
                  ...and a whole lot more!
                </h2>
              </Col>
            </Row>
          </Container>
        </div>

        <div
          style={{
            backgroundColor: Theme.colors.blueGray,
            color: "white",
          }}
        >
          <Container style={Theme.padding.section}>
            <Row>
              <Col md={12} style={{ textAlign: "center" }}>
                <h1 style={Theme.typography.h1}>Get started in seconds</h1>
                <div style={{ textAlign: "left" }}>
                  <Code language="bash">{CodeSamples.getStarted}</Code>
                </div>
              </Col>
            </Row>
          </Container>
        </div>

        <div
          style={{
            backgroundColor: Theme.colors.white,
            color: Theme.colors.blue,
          }}
        >
          <Container style={Theme.padding.section}>
            <Row>
              <Col md={12} style={{ textAlign: "center" }}>
                <h1 style={Theme.typography.h1}> Plays Well With Others </h1>
                <h2 style={Theme.typography.h2}>
                  Use Actionhero around <em> your </em> workflow and preferred
                  tools.
                </h2>
              </Col>
            </Row>

            <Row className="d-none d-lg-block">
              <Col md={12} style={{ textAlign: "center" }}>
                <img
                  style={smallIconStyle}
                  src="/static/images/plays-well-with-others/electron.svg"
                />
                <img
                  style={smallIconStyle}
                  src="/static/images/plays-well-with-others/angular.svg"
                />
                <img
                  style={smallIconStyle}
                  src="/static/images/plays-well-with-others/swift.svg"
                />
                <img
                  style={smallIconStyle}
                  src="/static/images/plays-well-with-others/elasticsearch.svg"
                />
                <img
                  style={smallIconStyle}
                  src="/static/images/plays-well-with-others/redis.svg"
                />
                <img
                  style={smallIconStyle}
                  src="/static/images/plays-well-with-others/npm.svg"
                />
                <img
                  style={smallIconStyle}
                  src="/static/images/plays-well-with-others/ember.svg"
                />
              </Col>
            </Row>

            <Row className="d-lg-none">
              <Col md={2} />
              <Col md={1} style={{ textAlign: "center" }}>
                <img
                  style={smallIconStyle}
                  src="/static/images/plays-well-with-others/electron.svg"
                />
              </Col>
              <Col md={1} style={{ textAlign: "center" }}>
                <img
                  style={smallIconStyle}
                  src="/static/images/plays-well-with-others/angular.svg"
                />
              </Col>
              <Col md={1} style={{ textAlign: "center" }}>
                <img
                  style={smallIconStyle}
                  src="/static/images/plays-well-with-others/swift.svg"
                />
              </Col>
              <Col md={1} style={{ textAlign: "center" }}>
                <img
                  style={smallIconStyle}
                  src="/static/images/plays-well-with-others/elasticsearch.svg"
                />
              </Col>
              <Col md={1} style={{ textAlign: "center" }}>
                <img
                  style={smallIconStyle}
                  src="/static/images/plays-well-with-others/redis.svg"
                />
              </Col>
              <Col md={1} style={{ textAlign: "center" }}>
                <img
                  style={smallIconStyle}
                  src="/static/images/plays-well-with-others/npm.svg"
                />
              </Col>
              <Col md={2} style={{ textAlign: "center" }}>
                <img
                  style={smallIconStyle}
                  src="/static/images/plays-well-with-others/ember.svg"
                />
              </Col>
              <Col md={2} />
            </Row>

            <Row>
              <Col md={12} style={{ textAlign: "center" }}>
                <img
                  style={smallIconStyle}
                  src="/static/images/flying-man.svg"
                />
              </Col>
            </Row>
          </Container>
        </div>

        <div
          style={{
            backgroundColor: Theme.colors.yellow,
            color: Theme.colors.blue,
          }}
        >
          <Container style={Theme.padding.section}>
            <Row>
              <Col md={3} />
              <Col md={6} style={{ textAlign: "center" }}>
                <h1 style={Theme.typography.h1}> You've Got the Power</h1>
                <h2 style={Theme.typography.h2}>
                  Actionhero was built from the ground up to include all the
                  features you expect from a modern API framework. Written in
                  Typescript, Actionhero makes it easy to build a modern API
                  server with ES6 features like Async/Await... and it also knows
                  when to get out of the way so you can customize your stack to
                  fit your needs.
                </h2>
              </Col>
              <Col md={3} />
            </Row>
            <Row>
              <FeatureBox
                title="Easy-to-Use Actions"
                image="/static/images/easy-to-use-actions.svg"
                body="With Actionhero, you create Actions which can respond to any type of connection. They process incoming parameters and offer a response to the client. Actionhero takes care of routing and responding to each connection type for you."
                code={CodeSamples.eastToUseActions}
              />

              <FeatureBox
                title="Built-in Tasks"
                image="/static/images/built-in-tasks.svg"
                body="Background tasks are first-class in Actionhero. You can enqueue a task from anywhere in the application. Tasks can be recurring or single-run. The Actionhero task system is powered by Resque, so it is compatible with a number of other applications and frameworks."
                code={CodeSamples.backgroundTasks}
              />

              <FeatureBox
                title="Cluster-Ready"
                image="/static/images/cluster-ready.svg"
                body="Actionhero uses Redis to store and share data. With first-class cache functions, decentralized communications, and distributed workers, you can be sure that your application is able to scale from 1 worker on one server, to as big of a cluster as you need."
                code={CodeSamples.clusterReady}
              />
            </Row>

            <Row>
              <FeatureBox
                title="Localization"
                image="/static/images/localization.svg"
                body="The Actionhero API makes is simple to create a traditional HTTP(S) API, but it also lets you easily extend your API to TCP and websocket clients (all included). Actionhero also easily lets you write your own servers to handle custom transports."
                code={CodeSamples.localization}
              />

              <FeatureBox
                title="Routing"
                image="/static/images/routing.svg"
                body="Actionhero ships with a robust router to make mapping HTTP requests to your actions a breeze."
                code={CodeSamples.routing}
              />

              <FeatureBox
                title="API-First Development"
                image="/static/images/api-first-development.svg"
                body="Actionhero makes API-First development easy by enforcing a strict separation of views and application logic and removing barriers to API creation. Versioning your actions is simple and integrates well with Agile or XP team workflows."
              />
            </Row>

            <Row>
              <FeatureBox
                title="Chat"
                image="/static/images/chat.svg"
                body="The Actionhero API makes it simple to create a Actionhero (optionally) facilitates real-time communication not only from server-to-client, but also client-to-client! Actionhero's chat sub-system allows for streaming of both public and private messages between clients. Complete with middleware and extensions, you can create chat services, multi-player games, and more!"
                code={CodeSamples.chat}
              />

              <FeatureBox
                title="Operations Tools"
                image="/static/images/ops-tools.svg"
                body="It is simple to deploy Actionhero with our included CLI tools. You can launch your server as a single instance or as part of a larger deployment cluster. Tools for 0-downtime deployments and robust monitoring and logging hooks make Actionhero a dream platform for your operations team."
              />

              <FeatureBox
                title="File Server"
                image="/static/images/file-server.svg"
                body="Every server needs to serve files to its clients (even those that don't speak HTTP), and Actionhero is no exception. Configured to asynchronously stream file contents, Actionhero provides an robust file server which can live in parallel with your API, allowing for a fully featured server."
              />
            </Row>
          </Container>
        </div>

        <div
          style={{
            backgroundColor: Theme.colors.white,
            color: Theme.colors.blue,
          }}
        >
          <Container style={Theme.padding.section}>
            <Row>
              <Col md={12} style={{ textAlign: "center" }}>
                <h1 style={Theme.typography.h1}>
                  {" "}
                  Trusted by Top Companies and Organizations{" "}
                </h1>
                <br />
              </Col>
            </Row>

            <Row className="d-none d-lg-block">
              <Col md={12} style={{ textAlign: "center" }}>
                <img
                  style={smallIconStyle}
                  src="/static/images/companies/riot-games.svg"
                />
                <img
                  style={smallIconStyle}
                  src="/static/images/companies/samsung.svg"
                />
                <img
                  style={smallIconStyle}
                  src="/static/images/companies/va.svg"
                />
                <img
                  style={smallIconStyle}
                  src="/static/images/companies/madglory.svg"
                />
                <img
                  style={smallIconStyle}
                  src="/static/images/companies/taskrabbit.svg"
                />
              </Col>
            </Row>

            <Row className="d-lg-none">
              <Col md={1} />
              <Col md={2} style={{ textAlign: "center" }}>
                <img
                  style={smallIconStyle}
                  src="/static/images/companies/riot-games.svg"
                />
              </Col>
              <Col md={2} style={{ textAlign: "center" }}>
                <img
                  style={smallIconStyle}
                  src="/static/images/companies/samsung.svg"
                />
              </Col>
              <Col md={1} style={{ textAlign: "center" }}>
                <img
                  style={smallIconStyle}
                  src="/static/images/companies/va.svg"
                />
              </Col>
              <Col md={2} style={{ textAlign: "center" }}>
                <img
                  style={smallIconStyle}
                  src="/static/images/companies/madglory.svg"
                />
              </Col>
              <Col md={3} style={{ textAlign: "center" }}>
                <img
                  style={smallIconStyle}
                  src="/static/images/companies/taskrabbit.svg"
                />
              </Col>
              <Col md={1} />
            </Row>
          </Container>
        </div>

        <SolutionsGrid />

        <div
          style={{
            backgroundColor: Theme.colors.yellow,
            color: Theme.colors.blue,
            backgroundImage: 'url("/static/images/starburst.png")',
            backgroundSize: "100% 100%",
          }}
        >
          <Container style={Theme.padding.section}>
            <Row>
              <Col md={12} style={{ textAlign: "center" }}>
                <h1 style={Theme.typography.h1}>
                  {" "}
                  Ready to become the hero your project needs?{" "}
                </h1>
              </Col>
            </Row>

            <Row>
              <Col md={12} style={{ textAlign: "center" }}>
                <BigButton
                  href="/get-started"
                  backgroundColor={Theme.colors.red}
                  textColor={Theme.colors.white}
                >
                  {" "}
                  Get Started{" "}
                </BigButton>
              </Col>
            </Row>
          </Container>
        </div>
      </Page>
    );
  }
}
