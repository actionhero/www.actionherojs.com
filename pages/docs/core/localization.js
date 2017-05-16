import DocsPageWithNav from './../../../pageClasses/docsPageWithSideNav.js'
import { Row, Col } from 'react-bootstrap'
import DocsPage from './../../../components/layouts/docsPage.js'

import Code from './../../../components/code.js'

const DetermineLocale =
`module.exports = {
  initialize: function(api, next){
    api.customLocalization = {
      lookup: function(connection){
        var locale = 'en';
        if(connection.type === 'web'){
          var host = connection.rawConnection.req.headers.host
          if(host === 'usa.site.com'){ locale = 'en-US'; }
          if(host === 'uk.site.com'){  locale = 'en-GB'; }
          if(host === 'es.site.com'){  locale = 'es-ES'; }
          if(host === 'mx.site.com'){  locale = 'es-MX'; }
        }
        return locale;
      }
    }
    next();
  }
}
`

const CountExample = "data.response.message = connection.localize('the count was {{count}}', {count: 4})"

export default class extends DocsPageWithNav {
  constructor (props) {
    super(props)

    this.state = {
      titleSection: {
        title: 'Core > Localization',
        icon: '/static/images/localization.svg'
      },
      sections: {
        'overview': 'Overview',
        'locale-files': 'Loale Files',
        'connection-locale': 'Determining Connection Locale',
        'connection-methods': 'Connection Methods',
        'other-strings': 'Localizing other Strings'
      },
      links: [
        {link: '/docs/core/config', title: '» Core > Config'},
        {link: '/docs/core/servers', title: '« Core > Servers'}
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
                <p>Starting in ActionHero <code>v13.0.0</code>, you can now use the <a href='https://github.com/mashpie/i18n-node'>i18n</a> module to customize all aspects of ActionHero.</p>
              </div>
            )}

            { this.section('locale-files',
              <div>
                <ul>
                  <li>When running ActionHero with <code>api.config.i18n.updateFiles = true</code>, you will see ActionHero generate a 'locales' folder at the top level of your project which will contain translations of all strings in your project with are passed though the new localization system.  This includes all uses of <code>api.i18n.localize</code>, <code>connection.localize</code> and <code>api.log</code>.
                    <ul>
                      <li>be sure to use sprintf-style string interpolation for variables!</li>
                    </ul>
                  </li>
                  <li>From here, it is an easy matter to change the strings, per locale, to how you would like them presented back in your application.  The next time you restart the server, the values you've updated in your locale strings file will be used.</li>
                  <li>disable <code>api.config.i18n.updateFiles</code> if you do not want this behavior.</li>
                </ul>
              </div>
            )}

            { this.section('connection-locale',
              <div>
                <p>Since every ActionHero implementation is unique, we cannot ship with a "guess" about how to determine a given connection's locale. Perhaps you have an HTTP server and you can trust your client's <code>accept-language</code> headers.  Or perhaps you run your API under a number of different host names and you can presume locale based on them.   Whatever the case, you need to create a synchronous method in an initializer which will be called when each connection connects to return its locale.</p>
                <p>For example, I may have an initializer in my project like this:</p>
                <Code>{DetermineLocale}</Code>
                <p>To tell the i18n to use this method with a new connection, set <code>api.config.i18n.determineConnectionLocale = 'api.customLocalization.lookup'</code></p>
              </div>
            )}

            { this.section('connection-methods',
              <div>
                <ul>
                  <li><code>connection.localize(string)</code> or <code>connection.localize([string-with-interpolation, value])</code>
                    <ul>
                      <li>Allows you to interpolate a string based on the connection's current locale.  For example, say in an action you wanted to respond with <code>{CountExample}</code> In your locale files, you would define <code>the count was {`{{count}}`}</code> in every language you cared about, and not need to modify the action itself at all.</li>
                    </ul>
                  </li>
                </ul>
              </div>
            )}

            { this.section('other-strings',
              <div>
                <ul>
                  <li>To localize strings that are not used in methods mentioned above you can use <code>api.i18n.localize(string, options)</code>.
                    <ul>
                      <li>Allows you to interpolate a string.</li>
                      <li>Just as the other localize methods above, the input string will be in your locale files for you to change it anytime you want.</li>
                      <li>The second <code>options</code> optional argument (default value is <code>api.i18n</code>) allows you to <a href='https://github.com/mashpie/i18n-node#list-of-all-configuration-options'>configure</a> i18n. Note that you will use this argument only in very few special cases, It is recommended to edit the global <code>api.config.i18n</code> settings to suit your localization needs.</li>
                    </ul>
                  </li>
                </ul>
              </div>
            )}
          </Col>
        </Row>
      </DocsPage>
    )
  }
}
