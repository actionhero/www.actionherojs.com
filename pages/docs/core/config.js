import React from 'react'
import DocsPageWithNav from './../../../pageClasses/docsPageWithSideNav.js'
import { Row, Col } from 'react-bootstrap'
import DocsPage from './../../../components/layouts/docsPage.js'

import Code from './../../../components/code.js'

const BasicExample =
`exports.default = {
  general: function(api){
    return {
      //...
      developmentMode: true
      //...
    }
  }
}

exports.production = {
  general: function(api){
    return {
      developmentMode: false
    }
  }
}
`
const ConfigChanges =
`var actionhero = require("actionhero").actionhero;

var params = {};
params.configChanges = {
  general: {
    developmentMode: true
  }
}

// start the server!
actionhero.start(params, function(error, api){
  api.log("Boot Successful!");
});`

export default class extends DocsPageWithNav {
  constructor (props) {
    super(props)

    this.state = {
      titleSection: {
        title: 'Core: Config',
        icon: '/static/images/ops-tools.svg'
      },
      sections: {
        'overview': 'Overview',
        'config-changes': 'Config Changes',
        'boot-options': 'Boot Options'
      },
      links: [
        {link: '/docs/core/utils', title: '» Core: Utils'},
        {link: '/docs/core/localization', title: '« Core: localization'}
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
                <p>There are 2 ways to manage actionHero configuration: config files and overrides.  In both cases, ActionHero starts by reading the config in <code>./config/</code>. <a href='https://github.com/actionhero/actionhero/blob/master/config/'>Here is a documented example</a>.</p>
                <p>The normal way to deal with configuration changes is to use the files in <code>/config/</code> and to have special options for each environment.  First we load in all settings from the <code>default</code> config block, and then we replace those with anything defined in the relevant <code>environment</code> section.  ActionHero uses the standard node environment variable <code>NODE_ENV</code> to determine environment, and defaults to ‘development' when one isn't found.  This pattern is very similar the Rails and Sails frameworks.  A good way to visualize this is to note that, by default, the web server will return metadata in response JSON, but we change that in the production NODE_ENV and disable it.</p>
                <Code>{BasicExample}</Code>

                <p>The other way to modify the config is to pass a "changes" hash to the server directly at boot.  You can do things like: <code>{`actionhero.start({configChanges: configChanges}, callback)`}</code>.</p>
                <p>The priority order of configs is:</p>

                <ol>
                  <li>options passed in to boot with <code>{`actionhero.start({configChanges: configChanges}, callback)`}</code></li>
                  <li>environment-specific values in <code>/config</code></li>
                  <li>default values in <code>/config</code></li>
                  <li>default values of undefined settings from a plugin</li>
                  <li>default values of undefined settings from ActionHero's core</li>
                </ol>

                <p>When building config files of your own, note that an <code>exports.default</code> is always required, and any environment overrides are optional.  What is exported is a hash which eventually resolves a synchronous function which accepts the <code>api</code> variable.</p>
              </div>
            )}

            { this.section('config-changes',
              <div>
                <p>A configChanges example:</p>
                <Code>{ConfigChanges}</Code>
              </div>
            )}

            { this.section('boot-options',
              <div>
                <p>When launching ActionHero you can specify which config directory to use with <code>--config=/path/to/dir</code> or the environment variable <code>ACTIONHERO_CONFIG</code>, otherwise <code>/config/</code> will be used from your working directory.</p>
                <p>The priority of arguments is:</p>

                <ol>
                  <li>Use the project 'config' folder, if it exists.</li>
                  <li><code>actionhero --config=PATH1 --config=PATH2 --config=PATH3,PATH4</code></li>
                  <li><code>ACTIONHERO_CONFIG=PATH1,PATH2 npm start</code></li>
                </ol>

                <p>Note that if <code>--config</code> or <code>ACTIONHERO_CONFIG</code> are used, they <em>overwrite</em> the use of the default <code>/config</code> folder. If you wish to use both, you need to re-specify "config", e.g. <code>--config=config,local-config</code>. Also, note that specifying multiple <code>--config</code> options on the command line does exactly the same thing as using one parameter with comma separators, however the environment variable method only supports the comma-delimited syntax.</p>
              </div>
            )}
          </Col>
        </Row>
      </DocsPage>
    )
  }
}
