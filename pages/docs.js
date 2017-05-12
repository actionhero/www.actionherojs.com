import React from 'react'
import Link from 'next/link'
import { Row, Col } from 'react-bootstrap'
import DocsPage from './../components/layouts/docsPage.js'

import Theme from './../components/theme.js'
import SectionHeader from './../components/elements/sectionHeader.js'

class DocSectionLink extends React.Component {
  render () {
    return (
      <Link href={this.props.href}>
        <a>
          <h4 style={{color: Theme.colors.white}}>{this.props.children}</h4>
        </a>
      </Link>
    )
  }
}

export default class extends React.Component {
  render () {
    return (
      <DocsPage titleSection={{
        title: 'Documentation',
        icon: '/static/images/documentation.svg',
        subTitle: 'The ActionHero documentation is divided into three parts'
      }}>
        <Row style={{padding: 50}}>
          <Col md={6}>
            <div style={{
              width: '100%',
              padding: 20,
              backgroundColor: Theme.colors.blueGray,
              color: Theme.colors.yellow,
              boxShadow: '3px 3px 5px #222222'
            }}>
              <SectionHeader>Core</SectionHeader>
              <p>The core methods of ActionHero.  This section is for application developers who are implanting an API for thier application.</p>
              <br />

              <div style={{textAlign: 'center'}}>
                <DocSectionLink href='/docs/core/actions'>Actions</DocSectionLink>
                <DocSectionLink href='/docs/core/tasks'>Tasks</DocSectionLink>
                <DocSectionLink href='/docs/core/middleware'>Middleware</DocSectionLink>
                <DocSectionLink href='/docs/core/initializers'>Initializers</DocSectionLink>
                <DocSectionLink href='/docs/core/cli'>CLI</DocSectionLink>
                <DocSectionLink href='/docs/core/action-cluster'>Action Cluster</DocSectionLink>
                <DocSectionLink href='/docs/core/cache'>Cache</DocSectionLink>
                <DocSectionLink href='docs/core/chat'>Chat</DocSectionLink>
                <DocSectionLink href='docs/core/file_server'>File Server</DocSectionLink>
                <DocSectionLink href='docs/core/logging'>Logging</DocSectionLink>
                <DocSectionLink href='docs/core/plugins'>Plugins</DocSectionLink>
                <DocSectionLink href='docs/core/servers'>Servers</DocSectionLink>
                <DocSectionLink href='docs/core/localization'>Localization</DocSectionLink>
                <DocSectionLink href='docs/core/config'>Config</DocSectionLink>
                <DocSectionLink href='docs/core/util'>Util</DocSectionLink>
                <DocSectionLink href='docs/core/api_object'>Api Object</DocSectionLink>
              </div>
            </div>

            <br />
          </Col>

          <Col md={6}>
            <div style={{
              width: '100%',
              padding: 20,
              backgroundColor: Theme.colors.blueGray,
              color: Theme.colors.yellow,
              boxShadow: '3px 3px 5px #222222'
            }}>
              <SectionHeader>Servers</SectionHeader>
              <p>The in-depth details of the 3 types of servers which come with ActionHero.  The specifics of each type of connection and the limitations of each can be found here.</p>
              <br />

              <div style={{textAlign: 'center'}}>
                <DocSectionLink href='/docs/servers/web'>Web Server</DocSectionLink>
                <DocSectionLink href='/docs/servers/socket'>Socket (TCP) Server</DocSectionLink>
                <DocSectionLink href='/docs/servers/websocket'>Web Socket Server</DocSectionLink>
              </div>
            </div>

            <br />

            <div style={{
              width: '100%',
              padding: 20,
              backgroundColor: Theme.colors.blueGray,
              color: Theme.colors.yellow,
              boxShadow: '3px 3px 5px #222222'
            }}>
              <SectionHeader>Deployment & Testing</SectionHeader>
              <p>Operational and Test considerations for ActionHero.  Best practices and upgrade paths can be found here.</p>
              <br />

              <div style={{textAlign: 'center'}}>
                <DocSectionLink href='/docs/ops/running-actionhero'>Running ActionHero</DocSectionLink>
                <DocSectionLink href='/docs/ops/development-mode'>Development Mode</DocSectionLink>
                <DocSectionLink href='/docs/ops/testing'>Testing</DocSectionLink>
                <DocSectionLink href='/docs/ops/production-notes'>Production Notes</DocSectionLink>
                <DocSectionLink href='/docs/ops/upgrade-path'>Upgrade Path</DocSectionLink>
              </div>
            </div>
          </Col>
        </Row>
      </DocsPage>
    )
  }
}
