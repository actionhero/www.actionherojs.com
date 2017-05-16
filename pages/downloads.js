import React from 'react'
import { Row, Col } from 'react-bootstrap'
import DocsPage from './../components/layouts/docsPage.js'

import DocSection from './../components/elements/docSection.js'
import Code from './../components/code.js'

let npm = `# mkdir my_project && cd my_project
npm install actionhero
./node_modules/.bin/actionhero generate
npm install
npm start
`

let github = `# mkdir my_project && cd my_project
# TODO
`

export default class extends React.Component {
  render () {
    return (
      <DocsPage titleSection={{
        title: 'Downloads',
        icon: '/static/images/downloads.svg'
      }}>
        <Row>
          <Col md={6} style={{textAlign: 'center', padding: 50}}>
            <DocSection title='NPM' />
            <img src='/static/images/downloads/npm.svg' />
            <br />
            <br />
            <div style={{textAlign: 'left'}}>
              <Code language='bash'>{npm}</Code>
            </div>
          </Col>
          <Col md={6} style={{textAlign: 'center', padding: 50}}>
            <DocSection title='Github' />
            <img src='/static/images/downloads/github.svg' />
            <br />
            <br />
            <div style={{textAlign: 'left'}}>
              <Code language='bash'>{github}</Code>
            </div>
          </Col>
        </Row>
      </DocsPage>
    )
  }
}
