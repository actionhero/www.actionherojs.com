import React from "react";
import DocsPageWithNav from "../pageClasses/docsPageWithSideNav";
import { Row, Col } from "react-bootstrap";
import Link from "next/link";
import DocsPage from "../components/layouts/docsPage";
import Theme from "./../components/theme";

const imageStyle = {
  maxWidth: 150,
  maxHeight: 150,
  padding: 10,
};

export default class WhyPage extends DocsPageWithNav {
  constructor(props) {
    super(props);

    this.state = {
      titleSection: {
        title: "Tutorials",
        icon: "/static/images/jetpack-lady.svg",
      },
      sections: {
        intro: "Introduction",
        "key-concepts": "Key Concepts",
        core: "Actionhero Core",
        servers: "Actionhero Servers",
        configuration: "Configuration and Development",
        advanced: "Advanced Topics",
      },
    };
  }

  render() {
    return (
      <DocsPage
        showSolutions={false}
        sideNav={this.state.sections}
        titleSection={this.state.titleSection}
        currentSection={this.state.currentSection}
      >
        <Row>
          <Col md={12}>
            {this.section(
              "intro",
              <div>
                <p>
                  Welcome to Actionhero! These tutorials are here to provide a
                  more story-driven guide to how things work. These tutorials
                  are meant to partner with the{" "}
                  <a href="https://docs.actionherojs.com">
                    Actionhero Documentation
                  </a>{" "}
                  to provide a full guide un using the framework.
                </p>
              </div>
            )}

            {this.section(
              "key-concepts",
              <div>
                <p>
                  If you are new to Actionhero, we suggest visiting the{" "}
                  <a href="/key-concepts">key concepts page</a> first, which
                  will put these tutorials into context.
                </p>
              </div>
            )}

            {this.section(
              "core",
              <div>
                <Row>
                  <Col md={3} style={{ textAlign: "center" }}>
                    <img
                      style={imageStyle}
                      src={`/static/images/${Theme.icons.actions}`}
                    />
                  </Col>
                  <Col md={9}>
                    <h3>
                      <Link href="/tutorials/actions">
                        <a>Actions</a>
                      </Link>
                    </h3>
                    <p>
                      Actions are the core of Actionhero, and the main way you
                      respond to your user's requests.
                    </p>
                  </Col>
                </Row>

                <Row>
                  <Col md={3} style={{ textAlign: "center" }}>
                    <img
                      style={imageStyle}
                      src={`/static/images/${Theme.icons.tasks}`}
                    />
                  </Col>
                  <Col md={9}>
                    <h3>
                      <Link href="/tutorials/tasks">
                        <a>Tasks</a>
                      </Link>
                    </h3>
                    <p>
                      Tasks are how your execute background jobs, like sending
                      emails or contacting a third-party API. In Actionhero, you
                      can trigger tasks manually or run them on a schedule.
                    </p>
                  </Col>
                </Row>

                <Row>
                  <Col md={3} style={{ textAlign: "center" }}>
                    <img
                      style={imageStyle}
                      src={`/static/images/${Theme.icons.initializers}`}
                    />
                  </Col>
                  <Col md={9}>
                    <h3>
                      <Link href="/tutorials/initializers">
                        <a>Initializers</a>
                      </Link>
                    </h3>
                    <p>
                      Initializers are for connecting to databases, loading
                      data, and generally preparing your API to process
                      requests. Initializers are the place to define any common
                      methods you plan to use in your Actions and Tasks.
                    </p>
                  </Col>
                </Row>

                <Row>
                  <Col md={3} style={{ textAlign: "center" }}>
                    <img
                      style={imageStyle}
                      src={`/static/images/${Theme.icons.middleware}`}
                    />
                  </Col>
                  <Col md={9}>
                    <h3>
                      <Link href="/tutorials/middleware">
                        <a>Middleware</a>
                      </Link>
                    </h3>
                    <p>
                      Actionhero's Middleware system makes it easy to add
                      authentication, logging, and other custom behavior to your
                      Actions and Tasks
                    </p>
                  </Col>
                </Row>

                <Row>
                  <Col md={3} style={{ textAlign: "center" }}>
                    <img
                      style={imageStyle}
                      src={`/static/images/${Theme.icons.testing}`}
                    />
                  </Col>
                  <Col md={9}>
                    <h3>
                      <Link href="/tutorials/testing">
                        <a>Testing</a>
                      </Link>
                    </h3>
                    <p>
                      Actionhero includes a robust testing framework that works
                      with Jest for testing JS and TS projects. You can easily
                      test your Actions and Tasks with either real connections
                      or mocks.
                    </p>
                  </Col>
                </Row>

                <Row>
                  <Col md={3} style={{ textAlign: "center" }}>
                    <img
                      style={imageStyle}
                      src={`/static/images/${Theme.icons.cache}`}
                    />
                  </Col>
                  <Col md={9}>
                    <h3>
                      <Link href="/tutorials/cache">
                        <a>Cache</a>
                      </Link>
                    </h3>
                    <p>
                      Actionhero includes a powerful cache system based on
                      Redis. It can be used to store and retrieve data, but also
                      to create more complex data structures based on queues and
                      expiring object.
                    </p>
                  </Col>
                </Row>

                <Row>
                  <Col md={3} style={{ textAlign: "center" }}>
                    <img
                      style={imageStyle}
                      src={`/static/images/${Theme.icons.chat}`}
                    />
                  </Col>
                  <Col md={9}>
                    <h3>
                      <Link href="/tutorials/chat">
                        <a>Chat</a>
                      </Link>
                    </h3>
                    <p>
                      Actionhero's chat system is for more than just
                      peer-to-peer communications. It is a robust way to share
                      data between clients and your servers. Game coordination,
                      messaging, and sharing state are all possible via
                      Actionhero's chat system.
                    </p>
                  </Col>
                </Row>

                <Row>
                  <Col md={3} style={{ textAlign: "center" }}>
                    <img
                      style={imageStyle}
                      src={`/static/images/${Theme.icons.cli}`}
                    />
                  </Col>
                  <Col md={9}>
                    <h3>
                      <Link href="/tutorials/cli">
                        <a>CLI</a>
                      </Link>
                    </h3>
                    <p>
                      Actionhero includes tools to build CLI scripts that
                      integrate with your application. Need to migrate a
                      database or seed data in a repeatable way? Check out
                      Actionhero's CLI tooling.
                    </p>
                  </Col>
                </Row>
              </div>
            )}

            {this.section(
              "servers",
              <div>
                <Row>
                  <Col md={3} style={{ textAlign: "center" }}>
                    <img
                      style={imageStyle}
                      src={`/static/images/${Theme.icons.servers}`}
                    />
                  </Col>
                  <Col md={9}>
                    <h3>
                      <Link href="/tutorials/servers">
                        <a>Servers</a>
                      </Link>
                    </h3>
                    <p>
                      Actionhero is unique in that it allows you to build or add
                      many types of servers into one application. Not only can
                      you support HTTP and Web Socket, but you can add custom
                      protocols like Quick and Protobuf to your application and
                      easily reuse your Actions!
                    </p>
                  </Col>
                </Row>

                <Row>
                  <Col md={3} style={{ textAlign: "center" }}>
                    <img
                      style={imageStyle}
                      src={`/static/images/${Theme.icons["web-server"]}`}
                    />
                  </Col>
                  <Col md={9}>
                    <h3>
                      <Link href="/tutorials/web-server">
                        <a>Web Server</a>
                      </Link>
                    </h3>
                    <p>
                      Actionhero ships with a robust web server to handle
                      RESTful APIs. Routing, versioning, and more are included.
                    </p>
                  </Col>
                </Row>

                <Row>
                  <Col md={3} style={{ textAlign: "center" }}>
                    <img
                      style={imageStyle}
                      src={`/static/images/${Theme.icons["websocket-server"]}`}
                    />
                  </Col>
                  <Col md={9}>
                    <h3>
                      <Link href="/tutorials/websocket-server">
                        <a>Websocket Server</a>
                      </Link>
                    </h3>
                    <p>
                      Building on the included web server, Actionhero's Web
                      Socket Server includes everything you need for a realtime
                      application on the web or in your mobile applications.
                    </p>
                  </Col>
                </Row>
              </div>
            )}

            {this.section(
              "configuration",
              <div>
                <Row>
                  <Col md={3} style={{ textAlign: "center" }}>
                    <img
                      style={imageStyle}
                      src={`/static/images/${Theme.icons["running-actionhero"]}`}
                    />
                  </Col>
                  <Col md={9}>
                    <h3>
                      <Link href="/tutorials/running-actionhero">
                        <a>Running Actionhero</a>
                      </Link>
                    </h3>
                    <p>
                      Actionhero is ready for your production deployments - with
                      support for hot reloading, clustered process management,
                      and multiple ways of logging.
                    </p>
                  </Col>
                </Row>

                <Row>
                  <Col md={3} style={{ textAlign: "center" }}>
                    <img
                      style={imageStyle}
                      src={`/static/images/${Theme.icons.config}`}
                    />
                  </Col>
                  <Col md={9}>
                    <h3>
                      <Link href="/tutorials/config">
                        <a>Configuration</a>
                      </Link>
                    </h3>
                    <p>
                      Actionhero is built following the ideals of the{" "}
                      <a href="https://www.12factor.net">
                        12-factor application
                      </a>
                      . That means you can easily configure and deploy your app
                      to a number of environments.
                    </p>
                  </Col>
                </Row>

                <Row>
                  <Col md={3} style={{ textAlign: "center" }}>
                    <img
                      style={imageStyle}
                      src={`/static/images/${Theme.icons["repl-and-debugging"]}`}
                    />
                  </Col>
                  <Col md={9}>
                    <h3>
                      <Link href="/tutorials/repl-and-debugging">
                        <a>REPL and Debugging</a>
                      </Link>
                    </h3>
                    <p>
                      Actionhero includes a REPL so you can interactively
                      explore your application can work with your data. You can
                      also use node.js' robust debugging ecosystem with your
                      Actionhero project.
                    </p>
                  </Col>
                </Row>

                <Row>
                  <Col md={3} style={{ textAlign: "center" }}>
                    <img
                      style={imageStyle}
                      src={`/static/images/${Theme.icons["file-server"]}`}
                    />
                  </Col>
                  <Col md={9}>
                    <h3>
                      <Link href="/tutorials/file-server">
                        <a>File Server</a>
                      </Link>
                    </h3>
                    <p>
                      Actionhero comes with a file server which makes it easy
                      for you to integrate assets with your API responses, and
                      serve up API playgrounds and documentation.
                    </p>
                  </Col>
                </Row>

                <Row>
                  <Col md={3} style={{ textAlign: "center" }}>
                    <img
                      style={imageStyle}
                      src={`/static/images/${Theme.icons.logging}`}
                    />
                  </Col>
                  <Col md={9}>
                    <h3>
                      <Link href="/tutorials/logging">
                        <a>Logging</a>
                      </Link>
                    </h3>
                    <p>
                      Actionhero uses Winston to create multi faceted logs for
                      your application.
                    </p>
                  </Col>
                </Row>
              </div>
            )}

            {this.section(
              "advanced",
              <div>
                <Row>
                  <Col md={3} style={{ textAlign: "center" }}>
                    <img
                      style={imageStyle}
                      src={`/static/images/${Theme.icons.plugins}`}
                    />
                  </Col>
                  <Col md={9}>
                    <h3>
                      <Link href="/tutorials/plugins">
                        <a>Plugins</a>
                      </Link>
                    </h3>
                    <p>
                      Actionhero is built to enable a robust ecosystem of
                      plugins to share functionality. You can add community
                      plugins or make your own to share functionality within
                      your company.
                    </p>
                  </Col>
                </Row>

                <Row>
                  <Col md={3} style={{ textAlign: "center" }}>
                    <img
                      style={imageStyle}
                      src={`/static/images/${Theme.icons.cluster}`}
                    />
                  </Col>
                  <Col md={9}>
                    <h3>
                      <Link href="/tutorials/cluster">
                        <a>Cluster</a>
                      </Link>
                    </h3>
                    <p>
                      Actionhero can be run either as a solitary server or as
                      part of a cluster. The goal of these cluster helpers is to
                      allow you to create a group of servers which will share
                      state and each be able to handle requests and run tasks.
                      You can add or remove nodes from the cluster without fear
                      of data loss or task duplication.
                    </p>
                  </Col>
                </Row>

                <Row>
                  <Col md={3} style={{ textAlign: "center" }}>
                    <img
                      style={imageStyle}
                      src={`/static/images/${Theme.icons["production-notes"]}`}
                    />
                  </Col>
                  <Col md={9}>
                    <h3>
                      <Link href="/tutorials/production-notes">
                        <a>Production Notes</a>
                      </Link>
                    </h3>
                    <p>
                      Actionhero has been used by many companies in both large
                      and small deployments. Let us share some best practices
                      with you to design your Actionhero deployment in the best
                      possible way.
                    </p>
                  </Col>
                </Row>

                <Row>
                  <Col md={3} style={{ textAlign: "center" }}>
                    <img
                      style={imageStyle}
                      src={`/static/images/${Theme.icons["upgrade-path"]}`}
                    />
                  </Col>
                  <Col md={9}>
                    <h3>
                      <Link href="/tutorials/upgrade-path">
                        <a>Upgrade Path</a>
                      </Link>
                    </h3>
                    <p>
                      Upgrading big Actionhero projects to a new major might
                      require some effort. Every Actionhero version has it's own
                      specific project files which you generate using
                      `Actionhero generate` command... but this guide helps you
                      move from one version to the next.
                    </p>
                  </Col>
                </Row>

                <Row>
                  <Col md={3} style={{ textAlign: "center" }}>
                    <img
                      style={imageStyle}
                      src={`/static/images/${Theme.icons.typescript}`}
                    />
                  </Col>
                  <Col md={9}>
                    <h3>
                      <Link href="/tutorials/typescript">
                        <a>Typescript</a>
                      </Link>
                    </h3>
                    <p>
                      Actionhero has moved from being a Javascript project to a
                      Typescript project in version 21. This guide explains how
                      to move your existing Javascript project to Typescript,
                      and how to enjoy all the enhancements of this new version.
                    </p>
                  </Col>
                </Row>
              </div>
            )}
          </Col>
        </Row>
      </DocsPage>
    );
  }
}
