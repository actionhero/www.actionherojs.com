import React from 'react'
import DocsPageWithNav from './../../../pageClasses/docsPageWithSideNav.js'
import { Row, Col } from 'react-bootstrap'
import DocsPage from './../../../components/layouts/docsPage.js'

export default class extends DocsPageWithNav {
  constructor (props) {
    super(props)

    this.state = {
      titleSection: {
        title: 'Core: Utils',
        icon: '/static/images/ops-tools.svg'
      },
      sections: {
        'overview': 'Overview',
        'methods': 'Methods'
      },
      links: [
        {link: '/docs/core/api-object', title: '» Core: API Object'},
        {link: '/docs/core/config', title: '« Core: Config'}
      ]
    }
  }

  render () {
    return (
      <DocsPage sideNav={this.state.sections} titleSection={this.state.titleSection} links={this.state.links} currentSection={this.state.currentSection}>
        <Row>
          <Col md={12}>
            { this.section('overview',
              <div>
                <p>ActionHero ships with a few utility methods exposed for your convince:</p>
              </div>
            )}

            { this.section('methods',
              <div>
                <h3><code>api.utils.hashMerge(a, b)</code></h3>
                <ul>
                  <li>create a new hash which looks like b merged into a</li>
                  <li><code>{`{a:1, b:2}`}</code> merged with <code>{`{b:3, c:4}`}</code> looks like <code>{`{a: 1, b:3, c:4}`}</code></li>
                </ul>

                <h3><code>api.utils.isPlainObject(object)</code></h3>
                <ul>
                  <li>determines if <code>object</code> is a plain js 'Object' or something more complex, like a stream</li>
                </ul>

                <h3><code>api.utils.arrayUniqueify(arr)</code></h3>
                <ul>
                  <li>removes duplicate entries from an array</li>
                </ul>

                <h3><code>api.utils.objClone(obj)</code></h3>
                <ul>
                  <li>creates a new object with the same keys and values of the original object</li>
                </ul>

                <h3><code>api.utils.getExternalIPAddress()</code></h3>
                <ul>
                  <li>attempts to determine this server's external IP address out of all plausible addressees this host is listening on</li>
                </ul>

                <h3><code>api.utils.parseCookies(req)</code></h3>
                <ul>
                  <li>a helper to parse the request object's headers and returns a hash of the client's cookies</li>
                </ul>

                <h3><code>api.utils.parseIPv6URI(address)</code></h3>
                <ul>
                  <li>will return <code>{`{host: host, port: port}`}</code> for an IPv6 address</li>
                </ul>
              </div>
            )}
          </Col>
        </Row>
      </DocsPage>
    )
  }
}
