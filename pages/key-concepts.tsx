import DocsPageWithNav from "../pageClasses/docsPageWithSideNav";
import { Row, Col, Alert, Button } from "react-bootstrap";
import DocsPage from "../components/layouts/docsPage";
import Code from "../components/code";

export default class GetStartedPage extends DocsPageWithNav {
  constructor(props) {
    super(props);

    this.state = {
      titleSection: {
        title: "Actionhero Key Concepts",
        icon: "/static/images/internet-of-things.svg",
      },
      sections: {
        intro: "Introduction",
        actions: "Actions",
        tasks: "Tasks",
        initializers: "Initializers",
        chat: "Chat",
        servers: "Servers",
        testing: "Testing",
      },
      links: [
        {
          link: "/tutorials",
          title: "» Tutorials",
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
              "intro",
              <div>
                <p>
                  Actionhero is an API server. The type of workload Actionhero
                  excels at involves producing and consuming APIs, storing and
                  retrieving data from databases, modifying files, and similar
                  jobs. Actionhero has 5 key concepts that make up each
                  application: <strong>Actions</strong>, <strong>Tasks</strong>,{" "}
                  <strong>Initializers</strong>, <strong>Chat</strong>, and{" "}
                  <strong> Servers</strong>. This page will contain a brief
                  overview of these key concepts, and provide a like to the
                  related <a href="/tutorials">tutorial</a> which contains more
                  in-depth information.
                </p>

                <img
                  style={{ margin: 10 }}
                  width="100%"
                  src="/static/images/key-concepts.png"
                />

                <p>
                  If you are coming from a framework like Rails that has a
                  strong focus on the{" "}
                  <a
                    href="https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller"
                    target="_new"
                  >
                    MVC (model - view - controller) pattern
                  </a>
                  , you might be surprised to see that those concepts are
                  missing from Actionhero. That is because Actionhero is a{" "}
                  <strong>
                    <em>backend-agnostic API framework</em>
                  </strong>
                  .
                </p>

                <p>
                  "Backend-agnostic" means that Actionhero can work with any
                  backend/storage engine you might want to use. Since "models"
                  are so closely tied to the storage engine around them,
                  Actionhero doesn't have any opinions on how they should work.
                  That said, there are many Actionhero plugins to help with
                  that! One of the most popular is{" "}
                  <a
                    href="https://github.com/actionhero/ah-sequelize-plugin"
                    target="_blank"
                  >
                    ah-sequelize-plugin
                  </a>{" "}
                  which is a great way to introduce traditional database-backed
                  models & migrations with MySQL or Postgres.
                </p>

                <p>
                  "API framework" means that by default, Actionhero only speaks
                  JSON over HTTP(S) or websockets. It doesn't render HTML or any
                  other type of "view" meant to be consumed by a human. Again,
                  there are plugins to introduce new protocols to Actionhero if
                  you want them, but they are optional. Actionhero is not a
                  font-end server, although it's easy to pair{" "}
                  <a
                    target="_blank"
                    href="https://github.com/actionhero/ah-next-plugin"
                  >
                    Actionhero with Next.JS
                  </a>
                  , for example, to also render a website from the same
                  application. Actionhero focuses on the parts of the stack at
                  the "controller" level - how to smoothly speak to clients over
                  multiple protocols, handle caching, background jobs, and
                  real-time communication.
                </p>
                <p>
                  Actionhero was built from the ground up to include all the
                  features you expect from a modern API framework. Written in
                  Typescript, Actionhero makes it easy to build a modern API
                  server with ES6 features like Async/Await... and it also knows
                  when to get out of the way so you can customize your stack to
                  fit your needs.
                </p>
              </div>
            )}

            {this.section(
              "actions",
              <div>
                <Code language="typescript">
                  {`import { Action } from "actionhero";

export class RandomNumber extends Action {
    constructor() {
    super();
    this.name = "randomNumber";
    this.description = "I am an API method which will generate a random number";
    this.outputExample = { randomNumber: 0.123 };
  }

  async run({connection, response}) {
    response.randomNumber = Math.random();
    response.stringRandomNumber = connection.localize([
      "Your random number is {{ randomNumber }}",
      response,
    ]);
  }
}`}
                </Code>
                <p>
                  Actions are the main way that you interact with your clients -
                  responding to their requests and performing actions for them.
                  An Action exists to read a connection's request information
                  (which we call <code>params</code>), preform some operation
                  (perhaps reading or writing to a database), and then finally
                  responding to that request with a response. When you think of
                  an API in the most general sense, Actions are probably what
                  you are thinking of. Actions are most like traditional
                  "controller" objects from an MVC framework... but they work
                  for all connection types like web, websocket, etc. Actions are
                  a uniform way to define what methods your API exposes to any
                  client that wants to access it.
                </p>

                <p>
                  Actions can have middleware to help with things like
                  authentication or logging. Actions are generally stateless,
                  and throw errors if something goes wrong (
                  <code>user not found</code> or{" "}
                  <code>you aren't signed in</code>). In general actions are
                  short, and don't have much business logic. They rely on other
                  objects for the business logic, perhaps in your models, or
                  service objects you've created in other parts of your
                  application.
                </p>
                <p>
                  Actions rely on servers to handle routing requests to them,
                  and to format responses.
                </p>

                <div style={{ textAlign: "center", margin: 30 }}>
                  <Button href="/tutorials/actions" variant="outline-info">
                    Learn more about Actions
                  </Button>
                </div>
              </div>
            )}

            {this.section(
              "tasks",
              <div>
                <Code language="typescript">
                  {`import { Task } from "actionhero";
import { sendWelcomeEmail } from "./../serviceObjects/email";

export class SendWelcomeMessage extends Task {
  constructor() {
    super();
    this.name = "SendWelcomeEmail";
    this.description = "I send the welcome email to new users";
    this.frequency = 0;
    this.queue = "high-priority";
  }

  async run(data) {
    await sendWelcomeEmail({ address: data.email });
    return true;
  }
}`}
                </Code>

                <p>
                  Tasks are background jobs. Tasks can be either enqueued by an
                  Action or another Task, or they can be recurring, and run
                  every few minutes, hours, or days. Actionhero is
                  "cluster-aware", which means that it knows how to distribute
                  tasks between many servers, ensure that only one is running at
                  a time, and how to retry them when something go wrong. Tasks
                  can be enqueued to run ASAP, or delayed until a specific time
                  in the future.
                </p>

                <Code language="typescript">{`import { task } from "actionhero";

// Enqueue the task now, and process it ASAP
await task.enqueue("sendWelcomeEmail", { to: "evan@evantahler.com" });

// Enqueue the task now, and process it once \`timestamp\` has ocurred
await task.enqueueAt(10000, "sendWelcomeEmail", { to: "evan@evantahler.com" })`}</Code>

                <p>
                  When working with a third-party API or doing a particularly
                  slow operation, it's probably a good idea to use a Task so
                  your users do not need to wait. Also, if some operation might
                  fail and you want to retry it, a Task again would be a good
                  choice.
                </p>

                <p>
                  A good task is short-lived and idempotent. Tasks that deal
                  with complex workflows can enqueue other Tasks, store state in
                  a database or elsewhere in your application, like Actionhero's
                  built-in <a href="/tutorials/cache">cache</a>.
                </p>

                <p>
                  Under the hood, Actionhero uses the{" "}
                  <a
                    href="https://github.com/actionhero/node-resque"
                    target="_blank"
                  >
                    node-resque
                  </a>{" "}
                  package to manage tasks. If you want a user-interface to
                  visually inspect your task queues, check out the{" "}
                  <a
                    href="https://github.com/actionhero/ah-resque-ui"
                    target="_blank"
                  >
                    ah-resque-ui
                  </a>{" "}
                  Actionhero plugin. just like Actions, middleware can be used
                  to help with Task retrying, error handling, unique-jobs, and
                  more.
                </p>

                <img
                  src="/static/images/ah-resque-ui.png"
                  style={{ margin: 10 }}
                  width="100%"
                />

                <div style={{ textAlign: "center", margin: 30 }}>
                  <Button href="/tutorials/tasks" variant="outline-info">
                    Learn more about Tasks
                  </Button>
                </div>
              </div>
            )}

            {this.section(
              "initializers",
              <div>
                <Code language="typescript">
                  {`import { Initializer, api, log } from "actionhero";
import { Database } from "../classes/database";

export class DatabaseInit extends Initializer {
  constructor() {
    super();
    this.name = "DatabaseInit";
  }

  async initialize() {
    await Database.connect();
  }

  async start() {
    await Database.migrate();
    await Database.check();
  }

  async stop() {
    await Database.disconnect();
  }
}`}
                </Code>

                <p>
                  Initializers are how your server connects to databases and
                  other APIs. Initializers hook into the Actionhero server's
                  lifecycle methods, (<code>initialize</code>,{" "}
                  <code>start</code>, and <code>stop</code>), and provide a
                  great place to run any code you need. This is also a great
                  place to do per-server chores, like clearing a disk cache or
                  compressing files. For example, the{" "}
                  <a
                    href="https://github.com/actionhero/ah-sequelize-plugin"
                    target="_blank"
                  >
                    ah-sequelize-plugin
                  </a>{" "}
                  connects to your Postgres or MySQL server in the{" "}
                  <code>initialize</code> phase, runs migrations in the{" "}
                  <code>start</code> phase, and disconnects at the{" "}
                  <code>stop</code> phase.
                </p>

                <div style={{ textAlign: "center", margin: 30 }}>
                  <Button href="/tutorials/initializers" variant="outline-info">
                    Learn more about Initializers
                  </Button>
                </div>
              </div>
            )}

            {this.section(
              "chat",
              <div>
                <Code language="typescript">{`// from a connected websocket client
client.roomAdd("public-chat-room");
client.say("public-chat-room", "Hello everyone")

client.on('message', (message) => {console.log(message)})`}</Code>

                <p>
                  Actionhero provides a robust cluster-ready chat system. "Chat"
                  doesn't just mean human-to-human communication, but rather any
                  client-to-client and client-to-server communication that you
                  want to happen in real time. This can be sharing live updates
                  to a web page, game data about other players or the state of
                  the world, and of course, human-to-human chat!
                </p>

                <p>
                  The chat system is available to use both by the server, and by
                  clients.
                </p>

                <Code language="typescript">{`// or, from the srver
chatRoom.broadcast({}, "public-chat-room", "welcome to the room");`}</Code>

                <p>
                  Just like Actions, middleware can be used to help with chat
                  room presence, authentication, and more. Try an example of the
                  chat{" "}
                  <a
                    href="https://demo.actionherojs.com/chat.html"
                    target="_blank"
                  >
                    here.
                  </a>
                </p>

                <div style={{ textAlign: "center", margin: 30 }}>
                  <Button href="/tutorials/chat" variant="outline-info">
                    Learn more about Chat
                  </Button>
                </div>
              </div>
            )}

            {this.section(
              "servers",
              <div>
                <p>
                  Actionhero is unique in that it allows you to build or add
                  many types of servers into one application. Not only can you
                  support HTTP and websockets, but you can add custom protocols
                  like Quick and Protobuf to your application and easily reuse
                  your Actions!
                </p>

                <p>
                  Servers handle incoming connections, and routing their
                  requests to actions or the chat system. There are a number of
                  unique use-cases where a server might be good way to interact
                  with other real-time APIs, like consuming the streaming
                  Twitter API or custom responses from IOT or embedded devices.
                </p>

                <div style={{ textAlign: "center", margin: 30 }}>
                  <Button href="/tutorials/servers" variant="outline-info">
                    Learn more about Servers
                  </Button>
                </div>
              </div>
            )}

            {this.section(
              "testing",
              <div>
                <Code language="typescript">{`import { Process, specHelper } from "actionhero";

const actionhero = new Process();

describe("Action", () => {
  describe("randomNumber", () => {
    beforeAll(async () => {
      await actionhero.start();
    });

    afterAll(async () => {
      await actionhero.stop();
    });

    let firstNumber = null;

    test("generates random numbers", async () => {
      const { randomNumber } = await specHelper.runAction("randomNumber");
      expect(randomNumber).toBeGreaterThan(0);
      expect(randomNumber).toBeLessThan(1);
      firstNumber = randomNumber;
    });

    test("is unique / random", async () => {
      const { randomNumber } = await specHelper.runAction("randomNumber");
      expect(randomNumber).toBeGreaterThan(0);
      expect(randomNumber).toBeLessThan(1);
      expect(randomNumber).not.toEqual(firstNumber);
    });
  });
});`}</Code>

                <p>
                  Actionhero would not be a complete framework unless it
                  included a convenient way to write tests for the above key
                  concepts. Actionhero comes with a <code>specHelper</code>{" "}
                  which includes ways to easily mock Actions and Tasks.
                </p>

                <p>
                  Actionhero will generate Jest tests for each new Action and
                  Task that you generate. Actionhero's configuration is
                  NODE_ENV-aware, and makes it simple to change your database
                  configurations between environments.
                </p>

                <div style={{ textAlign: "center", marginTop: 30 }}>
                  <Button href="/tutorials/testing" variant="outline-info">
                    Learn more about Testing
                  </Button>
                </div>
              </div>
            )}
          </Col>
        </Row>
      </DocsPage>
    );
  }
}
