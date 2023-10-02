import React from "react";
import DocsPageWithNav from "../pageClasses/docsPageWithSideNav";
import { Row, Col } from "react-bootstrap";
import DocsPage from "../components/layouts/docsPage";

export default class WhyPage extends DocsPageWithNav {
  constructor(props) {
    super(props);

    this.state = {
      titleSection: {
        title: "Why Actionhero",
        icon: "/static/images/routing.svg",
      },
      sections: {
        introduction: "Introduction",
        why: "Why Actionhero",
        comparison: "Comparison",
      },
    };
  }

  render() {
    return (
      <DocsPage
        showSolutions
        sideNav={this.state.sections}
        titleSection={this.state.titleSection}
        currentSection={this.state.currentSection}
      >
        <Row>
          <Col md={12}>
            {this.section(
              "introduction",
              <div>
                <h2>Actionhero Whitepaper</h2>
                <em>
                  <strong>The Case for Conventions and Built-in Tools</strong>
                </em>
                <br />
                <br />

                <p>
                  We are often asked why one might choose Actionhero to power
                  their API/App vs one of the other node.js frameworks. This
                  document is organized around the various topics you may
                  consider when starting a new project.
                </p>

                <p>
                  Actionhero is an opinionated Node.js API server framework
                  providing robust and proven options out of the box for:
                  logging, testing, HTTP and WebSockets, caching, asynchronous
                  task processing, project structure, and clustering (both local
                  and distributed). By providing these capabilities Actionhero
                  helps developers focus on building features instead of
                  building infrastructure. Conversely, most other Node API
                  server projects require that developers invest significant
                  time in choosing and integrating third-party plugins and
                  extensions to deliver these capabilities.
                </p>
              </div>,
            )}

            {this.section(
              "why",
              <div>
                <p>
                  Unlike Express and Koa, but similar to Loopback, Actionhero is
                  an API server framework. Instead of focusing on HTTP request
                  handling Actionhero separates the transport mechanism (HTTP,
                  Websocket, etc) from the API logic with the concept of
                  Actions. Actions are discrete and synchronous units of logic
                  that can be invoked using any transport (i.e. Servers). This
                  separation helps us to accomplish many things.
                </p>

                <strong>General Use Case</strong>
                <ul>
                  <li>Simplifies test development</li>
                  <li>
                    Reduces complexity by removing transport specific
                    error/response handling
                  </li>
                  <li>
                    Allows the same code to be used for both HTTP and websocket
                    clients
                  </li>
                  <li>
                    Provides a convenient, per route way to apply middleware,
                    authentication, and validation
                  </li>
                </ul>

                <strong>Deployability and Scalability</strong>
                <ul>
                  <li>Stand-alone app, but also...</li>
                  <li>
                    Same-machine cluster to utilize all CPUs (doesn’t require
                    forever or pm2)
                  </li>
                  <li>Multi-machine cluster with only redis to communicate</li>
                  <li>
                    Includes shared cache, cluster broadcast, and other features
                  </li>
                  <li>
                    Built with Docker deployments in mind; minimal docker &
                    compose files included
                  </li>
                </ul>

                <strong>Background Jobs</strong>
                <ul>
                  <li>Actionhero’s task system is based on node-resque</li>
                  <li>
                    A proven background job system compatible with ruby, php,
                    and python
                  </li>
                  <li>
                    Support for multiple queues, retry semantics, and periodic
                    tasks
                  </li>
                </ul>

                <strong>Project Coordination</strong>
                <ul>
                  <li>Conventions for config follow 12-factor app patterns</li>
                  <li>Project organization with automatic-loading</li>
                  <li>hot-reloading developer experience</li>
                </ul>

                <strong>Testing</strong>
                <ul>
                  <li>Uses Jest for server code testing</li>
                  <li>
                    Testing library (specHelper) for running actions and tasks -
                    integration tests out of the box
                  </li>
                  <li>Generator includes test files</li>
                </ul>

                <strong>Real-time & Connections other than HTTP</strong>
                <ul>
                  <li>
                    Websocket first-class citizen. Sessions linked with HTTP
                    requests
                  </li>
                  <li>Client-side library</li>
                  <li>
                    Built on Primus, with support for multiple WS
                    implementations
                  </li>
                  <li>
                    Other servers possible for input (like Twitter, JSON over
                    TCP, QUIC, etc)
                  </li>
                </ul>

                <strong>Databases</strong>
                <ul>
                  <li>None included for flexibility</li>
                  <li>Plugins integrate with Seqeulize, Mongo, and more</li>
                </ul>
              </div>,
            )}

            {this.section(
              "comparison",
              <div>
                <table style={{ width: "100%" }}>
                  <thead>
                    <tr>
                      <th>&nbsp;</th>
                      <th>Actionhero</th>
                      <th>Express</th>
                      <th>Koa</th>
                      <th>Loopback</th>
                      <th>Sails</th>
                    </tr>
                  </thead>

                  <tbody>
                    <tr>
                      <td style={{ padding: 10 }}>
                        <strong>HTTP</strong>
                      </td>
                      <td style={{ color: "green" }}>✅</td>
                      <td style={{ color: "green" }}>✅</td>
                      <td style={{ color: "green" }}>✅</td>
                      <td style={{ color: "green" }}>✅</td>
                      <td style={{ color: "green" }}>✅</td>
                    </tr>

                    <tr>
                      <td style={{ padding: 10 }}>
                        <strong>WebSocket</strong>
                      </td>
                      <td style={{ color: "green" }}>✅</td>
                      <td>🚫</td>
                      <td>🚫</td>
                      <td>🚫</td>
                      <td>🚫</td>
                    </tr>

                    <tr>
                      <td style={{ padding: 10 }}>
                        <strong>TCP Socket</strong>
                      </td>
                      <td style={{ color: "green" }}>✅</td>
                      <td>🚫</td>
                      <td>🚫</td>
                      <td>🚫</td>
                      <td>🚫</td>
                    </tr>

                    <tr>
                      <td style={{ padding: 10 }}>
                        <strong>Shared Cache</strong>
                      </td>
                      <td style={{ color: "green" }}>✅</td>
                      <td>🚫</td>
                      <td>🚫</td>
                      <td>🚫</td>
                      <td>🚫</td>
                    </tr>

                    <tr>
                      <td style={{ padding: 10 }}>
                        <strong>Logging</strong>
                      </td>
                      <td style={{ color: "green" }}>✅</td>
                      <td>🚫</td>
                      <td>🚫</td>
                      <td style={{ color: "green" }}>✅</td>
                      <td style={{ color: "green" }}>✅</td>
                    </tr>

                    <tr>
                      <td style={{ padding: 10 }}>
                        <strong>Parallel Processes</strong>
                      </td>
                      <td style={{ color: "green" }}>✅</td>
                      <td>🚫</td>
                      <td>🚫</td>
                      <td>🚫</td>
                      <td>🚫</td>
                    </tr>

                    <tr>
                      <td style={{ padding: 10 }}>
                        <strong>Multiple Host Cluster</strong>
                      </td>
                      <td style={{ color: "green" }}>✅</td>
                      <td>🚫</td>
                      <td>🚫</td>
                      <td>🚫</td>
                      <td>🚫</td>
                    </tr>

                    <tr>
                      <td style={{ padding: 10 }}>
                        <strong>Background Processing</strong>
                      </td>
                      <td style={{ color: "green" }}>✅</td>
                      <td>🚫</td>
                      <td>🚫</td>
                      <td>🚫</td>
                      <td>🚫</td>
                    </tr>

                    <tr>
                      <td style={{ padding: 10 }}>
                        <strong>Middleware</strong>
                      </td>
                      <td style={{ color: "green" }}>✅</td>
                      <td style={{ color: "green" }}>✅</td>
                      <td style={{ color: "green" }}>✅</td>
                      <td style={{ color: "green" }}>✅</td>
                      <td>🚫</td>
                    </tr>

                    <tr>
                      <td style={{ padding: 10 }}>
                        <strong>Testing Support</strong>
                      </td>
                      <td style={{ color: "green" }}>✅</td>
                      <td>🚫</td>
                      <td>🚫</td>
                      <td style={{ color: "green" }}>✅</td>
                      <td>🚫</td>
                    </tr>

                    <tr>
                      <td style={{ padding: 10 }}>
                        <strong>Project Organization Conventions</strong>
                      </td>
                      <td style={{ color: "green" }}>✅</td>
                      <td>🚫</td>
                      <td>🚫</td>
                      <td style={{ color: "green" }}>✅</td>
                      <td style={{ color: "green" }}>✅</td>
                    </tr>
                  </tbody>
                </table>
              </div>,
            )}
          </Col>
        </Row>
      </DocsPage>
    );
  }
}
