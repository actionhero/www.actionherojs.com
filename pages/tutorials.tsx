import React from "react";
import DocsPageWithNav from "../pageClasses/docsPageWithSideNav";
import { Row, Col } from "react-bootstrap";
import Link from "next/link";
import DocsPage from "../components/layouts/docsPage";

const imageStyle = {
  maxWidth: 150,
  maxHeight: 150,
  padding: 10
};

export default class WhyPage extends DocsPageWithNav {
  constructor(props) {
    super(props);

    this.state = {
      titleSection: {
        title: "Tutorials",
        icon: "/static/images/jetpack-lady.svg"
      },
      sections: {
        intro: "Introduction",
        core: "Actionhero Core",
        servers: "Actionhero Servers",
        configuration: "Configuration and Development",
        advanced: "Advanced Topics"
      }
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
                  are meant to parter with the{" "}
                  <a href="https://docs.actionherojs.com">
                    Actionhero Documentation
                  </a>{" "}
                  to provide a full guide un using the framework.
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
                      src="/static/images/easy-to-use-actions.svg"
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
                      respond to your user's requets.
                    </p>
                  </Col>
                </Row>

                <Row>
                  <Col md={3} style={{ textAlign: "center" }}>
                    <img
                      style={imageStyle}
                      src="/static/images/built-in-tasks.svg"
                    />
                  </Col>
                  <Col md={9}>
                    <h3>
                      <Link href="/tutorials/tasks">
                        <a>Tasks</a>
                      </Link>
                    </h3>
                    <p>
                      Tasks are how your excecute background jobs, like sending
                      emails or contacting a third-party API. In Actionhero, you
                      can trigger tasks manually or run them on a schedule.
                    </p>
                  </Col>
                </Row>

                <Row>
                  <Col md={3} style={{ textAlign: "center" }}>
                    <img
                      style={imageStyle}
                      src="/static/images/internet-of-things.svg"
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
                      src="/static/images/localization.svg"
                    />
                  </Col>
                  <Col md={9}>
                    <h3>
                      <Link href="/tutorials/localization">
                        <a>Localization</a>
                      </Link>
                    </h3>
                    <p>
                      Actionhero includes a built-in localization tool based on
                      i18n which allows you to custominze your API's responses
                      to a specific languange or country. You can customize how
                      that languag is determined.
                    </p>
                  </Col>
                </Row>

                <Row>
                  <Col md={3} style={{ textAlign: "center" }}>
                    <img
                      style={imageStyle}
                      src="/static/images/api-first-development.svg"
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
                      authatnication, logging, and other custom behavior to your
                      Actions and Tasks
                    </p>
                  </Col>
                </Row>

                <Row>
                  <Col md={3} style={{ textAlign: "center" }}>
                    <img
                      style={imageStyle}
                      src="/static/images/flying-man.svg"
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
                    <img style={imageStyle} src="/static/images/chat.svg" />
                  </Col>
                  <Col md={9}>
                    <h3>
                      <Link href="/tutorials/chat">
                        <a>Chat</a>
                      </Link>
                    </h3>
                    <p>
                      Actionhero's chat system is for more than just
                      peer-to-peer communciations. It is a robust way to share
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
                      src="/static/images/ops-tools.svg"
                    />
                  </Col>
                  <Col md={9}>
                    <h3>
                      <Link href="/tutorials/cli">
                        <a>CLI</a>
                      </Link>
                    </h3>
                    <p>
                      Actionhero incldues tools to build CLI scripts that
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
                      src="/static/images/internet-of-things.svg"
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
                      proticols like Quick and Protobuf to your application and
                      easily reuse your Actions!
                    </p>
                  </Col>
                </Row>

                <Row>
                  <Col md={3} style={{ textAlign: "center" }}>
                    <img
                      style={imageStyle}
                      src="/static/images/documentation.svg"
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
                      src="/static/images/api-first-development.svg"
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
                      src="/static/images/ops-tools.svg"
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
                      support for hot reloading, clustered process managment,
                      and multiple ways of logging.
                    </p>
                  </Col>
                </Row>

                <Row>
                  <Col md={3} style={{ textAlign: "center" }}>
                    <img
                      style={imageStyle}
                      src="/static/images/video-game-servers.svg"
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
                      to a nubmer of environments.
                    </p>
                  </Col>
                </Row>

                <Row>
                  <Col md={3} style={{ textAlign: "center" }}>
                    <img
                      style={imageStyle}
                      src="/static/images/ops-tools.svg"
                    />
                  </Col>
                  <Col md={9}>
                    <h3>
                      <Link href="/tutorials/repl">
                        <a>Debugging and REPL</a>
                      </Link>
                    </h3>
                    <p>
                      Actionhero includes a REPL so you can interactibvly
                      explore your application can work with your data.
                    </p>
                  </Col>
                </Row>

                <Row>
                  <Col md={3} style={{ textAlign: "center" }}>
                    <img
                      style={imageStyle}
                      src="/static/images/file-server.svg"
                    />
                  </Col>
                  <Col md={9}>
                    <h3>
                      <Link href="/tutorials/file-server">
                        <a>File Server</a>
                      </Link>
                    </h3>
                    <p>
                      ActionHero comes with a file server which makes it easy
                      for you to integrate assets with your API responses, and
                      serve up API playgrounds and documentation.
                    </p>
                  </Col>
                </Row>

                <Row>
                  <Col md={3} style={{ textAlign: "center" }}>
                    <img
                      style={imageStyle}
                      src="/static/images/ops-tools.svg"
                    />
                  </Col>
                  <Col md={9}>
                    <h3>
                      <Link href="/tutorials/logging">
                        <a>Logging</a>
                      </Link>
                    </h3>
                    <p>
                      ActionHero uses Winston to create multi faceted logs for
                      your applicaiton.
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
                      src="/static/images/ops-tools.svg"
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
                      src="/static/images/cluster-ready.svg"
                    />
                  </Col>
                  <Col md={9}>
                    <h3>
                      <Link href="/tutorials/cluster">
                        <a>Cluster</a>
                      </Link>
                    </h3>
                    <p>
                      ActionHero can be run either as a solitary server or as
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
                      src="/static/images/ops-tools.svg"
                    />
                  </Col>
                  <Col md={9}>
                    <h3>
                      <Link href="/tutorials/production-notes">
                        <a>Production Notes</a>
                      </Link>
                    </h3>
                    <p>
                      ActionHero has been used by many compines in both large
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
                      src="/static/images/documentation.svg"
                    />
                  </Col>
                  <Col md={9}>
                    <h3>
                      <Link href="/tutorials/upgrade-path">
                        <a>Upgrade Path</a>
                      </Link>
                    </h3>
                    <p>
                      Upgrading big ActionHero projects to a new major might
                      require some effort. Every ActionHero version has it's own
                      specific project files which you generate using
                      `actionhero generate` command... but this guide helps you
                      move from one version to the next.
                    </p>
                  </Col>
                </Row>

                <Row>
                  <Col md={3} style={{ textAlign: "center" }}>
                    <img style={imageStyle} src="/static/images/dog.svg" />
                  </Col>
                  <Col md={9}>
                    <h3>
                      <Link href="/tutorials/typescript">
                        <a>Typescript</a>
                      </Link>
                    </h3>
                    <p>
                      Actionhero has moved from being a Javscript project to a
                      Typescript project in version 21. This guide explains how
                      more your existing Javascript project to Typescript, and
                      how to enjoy all the enchancements of this new version.
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
