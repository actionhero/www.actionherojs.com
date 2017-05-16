import DocsPageWithNav from './../../../pageClasses/docsPageWithSideNav.js'
import { Row, Col } from 'react-bootstrap'
import DocsPage from './../../../components/layouts/docsPage.js'

import Code from './../../../components/code.js'

const CreatingPlugins =
`/
| - actions
| - tasks
| - servers
| - initializers
| - scripts
| - config
|
| - package.json
`

export default class extends DocsPageWithNav {
  constructor (props) {
    super(props)

    this.state = {
      titleSection: {
        title: 'Core > Plugins',
        icon: '/static/images/ops-tools.svg'
      },
      sections: {
        'overview': 'Overview',
        'creating': 'Creating Plugins',
        'methods': 'Plugin Methods',
        'examples': 'Example Plugins',
        'published': 'Published Plugins'
      },
      links: [
        {link: '/docs/core/servers', title: '» Core > Servers'},
        {link: '/docs/core/logging', title: '« Core > Logging'}
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
                <p>As of ActionHero version <code>v8.0.0</code>, you can create and include plugins for you ActionHero project.  Plugins are collections of <code>tasks</code>, <code>actions</code>, <code>servers</code>, and <code>initializers</code> that are collected as a module.  You can install plugins via NPM or keep them in a local path.</p>
                <p>Plugins are loaded after all local ActionHero project files, but initializers follow the same priority scheme as all other initializers.</p>
              </div>
            )}

            { this.section('creating',
              <div>
                <Code language='bash'>{CreatingPlugins}</Code>
                <p>To create a plugin, create a project with the following structure:</p>
                <p>This structure will allow elements to be loaded into ActionHero (we search <code>/actions</code> for actions, <code>/tasks</code> for tasks, etc)</p>
                <p>When developing your plugin locally, you can load it into an existing ActionHero project to test it out.</p>
                <p>First, add the path your plugin is in to <code>api.config.general.paths.plugin</code>.  If your ActionHero app is in <code>/var/ah/actionhero</code> and your plugin is in <code>/var/ah/my_plugin</code>, add <code>/var/ah</code> to <code>api.config.general.paths.plugin</code></p>
                <p><strong>Please use the npm naming convention <code>ah-(name)-plugin</code> when uploading your plugin to npm</strong></p>
              </div>
            )}

            { this.section('methods',
              <div>
                <p>When creating plugins, you may find yourself wanting to do things which could normally be accomplished easily with a "top level" ActionHero project, but might be difficult from within the <code>node_modules</code> folder.  Here are some helpers:</p>

                <h3>Routes:</h3>

                <ul>
                  <li><code>api.routes.registerRoute(method, path, action, apiVersion, matchTrailingPathParts)</code>
                    <ul>
                      <li>Add a route to the system.</li>
                    </ul>
                  </li>
                </ul>
              </div>
            )}

            { this.section('examples',
              <div>
                <p><a href='https://github.com/actionhero/ah-sample-plugin'>You can view a sample plugin here</a></p>
              </div>
            )}

            { this.section('published',
              <div>
                <p>You can view a list of plugins maintained by <a href='https://github.com/l0oky'>@l0oky</a> via <a href='https://github.com/l0oky/awesome-actionhero'><img src='https://cdn.rawgit.com/sindresorhus/awesome/d7305f38d29fed78fa85652e3a63e154dd8e8829/media/badge.svg' alt='Awesome' /></a></p>
              </div>
            )}
          </Col>
        </Row>
      </DocsPage>
    )
  }
}
