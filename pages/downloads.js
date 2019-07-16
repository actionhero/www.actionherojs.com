import React from 'react'
import { Row, Col, Alert } from 'react-bootstrap'
import DocsPage from './../components/layouts/docsPage.js'

import DocSection from './../components/elements/docSection.js'
import Code from './../components/code.js'

const npm = `# mkdir my_project && cd my_project
npm install actionhero --save
npx actionhero generate
npm install
npm start
`

const yarn = `# mkdir my_project && cd my_project
yarn add actionhero
yarn run actionhero generate
yarn add ws fakeredis ioredis jest standard
yarn run actionhero
`

export default class extends React.Component {
  render () {
    return (
      <DocsPage showSolutions titleSection={{
        title: 'Downloads',
        icon: '/static/images/downloads.svg'
      }}>
        <Row>
          <Col md={12}>
            <br />
            <br />
            <p>ActionHero's source code licence is The V2 Apache Licence, and is distributed with the code.  ActionHero can be installed via a number of methods, but we recommend using NPM or Yarn. <a href='https://nodejs.org' target='_blank'>Version 8.0.0+ of node.js</a> is required.</p>
          </Col>
        </Row>
        <Row>
          <Col md={6} style={{ textAlign: 'center', padding: 50 }}>
            <DocSection title='NPM' />
            <img src='/static/images/downloads/npm.svg' />
            <br />
            <br />
            <div style={{ textAlign: 'left' }}>
              <Code language='bash'>{npm}</Code>
            </div>
          </Col>
          <Col md={6} style={{ textAlign: 'center', padding: 50 }}>
            <DocSection title='Yarn' />
            <img height={100} src='/static/images/downloads/yarn.svg' />
            <br />
            <br />
            <div style={{ textAlign: 'left' }}>
              <Code language='bash'>{yarn}</Code>
            </div>
          </Col>
          <Col md={12} style={{ textAlign: 'center', padding: 50 }}>
            <DocSection title='Github' />
            <a href='https://github.com/actionhero/actionhero'>
              <img src='/static/images/downloads/github.svg' />
            </a>
            <br />
            <br />
            <p>All of ActionHero's source code is hosted on <a target='_blank' href='https://github.com/actionhero/actionhero'>GitHub</a>.</p>
            <p>If you are intersetd in forking or contributing to ActionHero, start here!</p>
            <a href='https://github.com/actionhero/actionhero'>
              <div style={{ textAlign: 'center' }}>
                <Alert bsStyle='success'>
                  {`https://github.com/actionhero/actionhero`}
                </Alert>
              </div>
            </a>
          </Col>
        </Row>
      </DocsPage>
    )
  }
}
