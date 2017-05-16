import DocsPageWithNav from './../../../pageClasses/docsPageWithSideNav.js'
import { Row, Col } from 'react-bootstrap'
import DocsPage from './../../../components/layouts/docsPage.js'

import Code from './../../../components/code.js'

const CodeSample = `
// something multi-line
`

export default class extends DocsPageWithNav {
  constructor (props) {
    super(props)

    this.state = {
      titleSection: {
        title: 'Core > Actions',
        icon: '/static/images/easy-to-use-actions.svg'
      },
      sections: {
        'general': 'General'
      },
      links: [
        {link: '/docs/core/middlware', title: '» << Core > Middleware'},
        {link: '/docs/core/actions', title: '« Core > Actions'}
      ]
    }
  }

  render () {
    return (
      <DocsPage sideNav={this.state.sections} titleSection={this.state.titleSection} links={this.state.links} currentSection={this.state.currentSection}>
        <Row>
          <Col md={12}>
            { this.section('general',
              <div>
                <Code>{CodeSample}</Code>

                <p>The core of ActionHero is the Action framework, and <strong>actions</strong> are the basic units of work.  All connection types from all servers can use actions.  This means that you only need to write an action once, and both HTTP clients and websocket clients can consume it.</p>
                <p>The goal of an action is to read <code>data.params</code> (which are the arguments a connection provides), do work, and set the <code>data.response</code> (and <code>error</code> when needed) values to build the response to the client.</p>
                <p>You can create you own actions by placing them in a <code>./actions/</code> folder at the root of your application.  You can use the generator with <code>actionhero generate action --name=myAction</code></p>
                <p>Here's an example of a simple action which will return a random number to the client:</p>
                <p>You can also define more than one action per file if you would like, to share common methods and components (like input parsers):</p>
              </div>
            )}
          </Col>
        </Row>
      </DocsPage>
    )
  }
}
