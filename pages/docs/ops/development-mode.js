import React from 'react'
import DocsPageWithNav from './../../../pageClasses/docsPageWithSideNav.js'
import { Row, Col, Alert } from 'react-bootstrap'
import DocsPage from './../../../components/layouts/docsPage.js'

import Code from './../../../components/code.js'

const WatchingCustomFiles =
`api.watchFileAndAct(path_to_file, function(){
  api.log('rebooting due to config change: ' + path_to_file, 'info');
  api.commands.restart();
});
`

const Debugging =
`// in package.json
"dependencies": {
  "actionhero": "x",
  "node-inspector": "x"
},`

const REPL =
`actionhero console

Running "console" task
2015-11-14 17:48:01 - notice: *** starting actionhero ***
2015-11-14 17:48:01 - warning: running with fakeredis
2015-11-14 17:48:01 - info: actionhero member 10.0.1.15 has joined the cluster
2015-11-14 17:48:01 - notice: pid: 38464
2015-11-14 17:48:01 - notice: server ID: 10.0.1.15
2015-11-14 17:48:01 - info: ensuring the existence of the chatRoom: defaultRoom
2015-11-14 17:48:01 - info: ensuring the existence of the chatRoom: anotherRoom
2015-11-14 17:48:01 - notice: environment: development
2015-11-14 17:48:01 - notice: *** Server Started @ 2015-11-14 17:48:01 ***
[ AH::development ] > api.id
‘10.0.1.15'

[ AH::development ] > Object.keys(api.actions.actions)
[ ‘cacheTest',
‘randomNumber',
‘showDocumentation',
‘sleepTest',
‘status' ]`

export default class extends DocsPageWithNav {
  constructor (props) {
    super(props)

    this.state = {
      titleSection: {
        title: 'Operations: Development Mode & REPL',
        icon: '/static/images/ops-tools.svg'
      },
      sections: {
        'overview': 'Overview',
        'effects': 'Effects of Development Mode',
        'watching-custom-files': 'Watching custom files',
        'debugging': 'Debugging',
        'repl': 'REPL'
      },
      links: [
        {link: '/docs/ops/testing', title: '» Operations: Testing'},
        {link: '/docs/ops/running-actionhero', title: '« Operations: Running ActionHero'}
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
                <Alert bsStyle='danger'>Warning: Don't use this in production!</Alert>
                <p>To enable development mode simply set <code>developmentMode: true</code> in your <code>config/api.js</code>.</p>
                <p>ActionHero's development mode is a little different than tools like <a href='https://github.com/remy/nodemon'>nodemon</a> in that it tries hard not to restart the server process. Changes to routes, tasks, and actions can simply replace those in memory when they are updated on disk. Other changes, like changes to <code>api.config</code> or initializers are more severe, and will restart the whole application (much like nodemon).</p>
                <p>Note that <code>api.config.general.developmentMode</code> is different from <code>NODE_ENV</code>, which by default is "development" (and is logged out when ActionHero boots). <code>NODE_ENV</code> is used to determine which config settings to use, and has no effect on developmentMode.</p>
              </div>
            )}

            { this.section('effects',
              <div>
                <p>Development mode, when enabled, will poll for changes in your actions, tasks and initializers, and reload them on the fly.</p>
                <p>Changes to Actions and Tasks will override the existing version in memory.  Changes to an initializer or config will reboot your server automatically.</p>

                <ul>
                  <li>Development Mode uses <code>fs.watchFile()</code> and may not work on all OSs / file systems.</li>
                  <li>New files won't be loaded in, only existing files when the app was booted will be monitored</li>
                  <li>As deleting a file might crash your application, we will not attempt to re-load deleted files</li>
                  <li>If you have changed the <code>task.frequency</code> of a periodic task, you will continue to use the old value until the task fires at least once after the change</li>
                  <li>Changing <code>api.config</code>, initializers, or servers, will attempt to do a "full" reboot the server rather than just reload that component.</li>
                </ul>
              </div>
            )}

            { this.section('watching-custom-files',
              <div>
                <Code>{WatchingCustomFiles}</Code>
                <p>You can use ActionHero's <code>api.watchFileAndAct()</code> method to watch additional files your application may have:</p>
              </div>
            )}

            { this.section('debugging',
              <div>
                <h3>Old debugger</h3>
                <p>You can use the awesome <a href='https://github.com/dannycoates/node-inspector'>node-inspector</a> project to help you debug your ActionHero application within the familiar Chrome Browser's developer tools.</p>
                <p>Be sure to run ActionHero with node's <code>--debug</code> flag, ie: <code>node ./node_modules/.bin/actionhero --debug start</code></p>
                <Code>{Debugging}</Code>
                <p>Start up node-inspector (both node-inspector and ActionHero have the same default port, so you will need to change one of them) <code>./node_modules/.bin/node-inspector --web-port=1234</code></p>
                <p>That's it! Now you can visit <code>{`http://0.0.0.0:1234/debug?port=5858`}</code> and start debugging.  Remember that the way node-debugger works has you first set a breakpoint in the file view, and then you can use the console to inspect various objects.  IE: I put a breakpoint in the default <code>status</code> action in the <code>run</code> method:</p>
             
               <h3>New debugger</h3>
               <p>New versions of node.js have built-in inspector capabilities.</p>
               <p>Run ActionHero with node's <code>--inspect</code> flag, ie: <code>node ./node_modules/.bin/actionhero --inspect start</code></p>
               <p>More info about new <a href='https://nodejs.org/en/docs/inspector'>node inspector</a></p>
              </div>
            )}

            { this.section('repl',
              <div>
                <Code>{REPL}</Code>
                <p>ActionHero now has a REPL (<code>v9.0.0+</code>)! This means you can spin up a new instance of ActionHero and manually call all the methods on the <code>api</code> namespace.  This combined with the new RPC tools make this a powerful debugging and development tool.  Running <code>ActionHero console</code> will load up a version of action hero in your terminal where you have access to the <code>api</code> object.  This version of the server will <code>boot</code>, <code>initialize</code>, and <code>start</code>, but will skip booting any <code>servers</code>.</p>
                <p>The REPL will:</p>

                <ul>
                  <li>source <code>NODE_ENV</code> properly to load the config</li>
                  <li>will connect to redis and load any user-defined initializers</li>
                  <li>will load any plugins</li>
                  <li>will <strong>not</strong> boot any servers</li>
                </ul>

                <p>If you are familiar with rails, this is very similar to <code>rails console</code></p>

                <img width='100%' src='https://cloud.githubusercontent.com/assets/303226/2953485/4db6cbe2-da5b-11e3-96de-26fe4931d9af.png' />
              </div>
            )}
          </Col>
        </Row>
      </DocsPage>
    )
  }
}
