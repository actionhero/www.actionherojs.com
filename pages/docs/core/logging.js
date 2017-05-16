import React from 'react'
import DocsPageWithNav from './../../../pageClasses/docsPageWithSideNav.js'
import { Row, Col } from 'react-bootstrap'
import DocsPage from './../../../components/layouts/docsPage.js'

import Code from './../../../components/code.js'

const Defaults =
`config.logger = {
  transports: [
    function(api){
      return new (winston.transports.Console)({
        colorize: true,
        level: "debug",
      });
    },
    function(api){
      return new (winston.transports.File)({
        filename: './log/' + api.pids.title + '.log',
        level: "info",
        timestamp: true,
      });
    }
  ]
};
`

const Levels =
`api.log('hello'); // will use the default, 'info' level
api.log('debug message', 'debug') // will not show up unless you have configured your logger in this NODE_ENV to be debug
api.log('OH NO', 'emerg') // will show up in all logger levels
api.log('the params were', 'info', data.params) // you can log objects too`

const Methods =
`// the most basic use.  Will assume 'info' as the severity
api.log('hello');

// custom severity
api.log('OH NO!', 'warning');

// custom severity with a metadata object
api.log('OH NO, something went wrong', 'warning', { error: new Error('things are busted') });
`

export default class extends DocsPageWithNav {
  constructor (props) {
    super(props)

    this.state = {
      titleSection: {
        title: 'Core: Logging',
        icon: '/static/images/ops-tools.svg'
      },
      sections: {
        'overview': 'Overview',
        'defaults': 'Defaults',
        'levels': 'Levels',
        'methods': 'Methods'
      },
      links: [
        {link: '/docs/core/plugins', title: '» Core: Plugins'},
        {link: '/docs/core/file-server', title: '« Core: File Server'}
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
                <p>ActionHero uses the <strong><a href='https://github.com/flatiron/winston'>Winston logger</a></strong>.  This allows for better, more customizable logging.</p>
              </div>
            )}

            { this.section('defaults',
              <div>
                <Code>{Defaults}</Code>
                <p>In your <code>config/logger.js</code>, you can customize which <code>transports</code> you would like the logger to use. If none are provided, a default logger which only will print to stdout will be used.  See winston's documentation for all the logger types, but know that they include console, file, s3, riak, and more.</p>
                <p>You can set a transport directly, IE <code>new (winston.transports.Console)()</code> or in a function which will be passed the <code>api</code> object like the examples above.  The benefit of using the function invocation is you will have access to other methods and configuration options (like the title of the process).</p>
              </div>
            )}

            { this.section('levels',
              <div>
                <Code>{Levels}</Code>
                <p>Note that you can set a <code>level</code> which indicates which level (and those above it) you wish to log per transport.  The log levels are:</p>

                <ul>
                  <li>0=debug</li>
                  <li>1=info</li>
                  <li>2=notice</li>
                  <li>3=warning</li>
                  <li>4=error</li>
                  <li>5=crit</li>
                  <li>6=alert</li>
                  <li>7=emerg</li>
                </ul>

                <p>You can customize these via <code>api.config.logger.levels</code> and <code>api.config.logger.colors</code>.  See <a href='https://github.com/winstonjs/winston#using-custom-logging-levels'>Winston's documenation for more information</a></p>
                <p>For example, if you set the logger's level to "notice", you would also see "crit" messages, but not "debug" messages.</p>
                <p>To invoke the logger from your code, use: <code>api.log(message, severity, metadata)</code></p>
              </div>
            )}

            { this.section('methods',
              <div>
                <p><code>api.logger.log</code> and <code>api.logger[severity]</code> also exist which allow you to call and modify the Winston instance directly.</p>
                <p><code>api.log</code> will pass your message to all transports.</p>

                <h3><code>api.log(message, severity, metadata)</code></h3>

                <Code>{Methods}</Code>
              </div>
            )}
          </Col>
        </Row>
      </DocsPage>
    )
  }
}
