import DocsPageWithNav from './../pageClasses/docsPageWithSideNav.js'
import { Row, Col } from 'react-bootstrap'
import DocsPage from './../components/layouts/docsPage.js'

export default class extends DocsPageWithNav {
  constructor (props) {
    super(props)

    this.state = {
      titleSection: {
        title: 'Terms & Conditions'
      },
      sections: {
        'web': 'Terms and Conditions',
        'privacy': 'Privacy Policy',
        'code': 'Apache License (v2)'
      }
    }
  }

  render () {
    return (
      <DocsPage sideNav={this.state.sections} titleSection={this.state.titleSection} currentSection={this.state.currentSection}>
        <Row>
          <Col md={12}>
            { this.section('web',
              <div>
                <p>These Terms and Conditions apply to the use of this website.</p>
                <hr />

                <h3>1. Terms</h3>

                <p>By accessing the website at <a href='https://www.actionherojs.com'>https://www.actionherojs.com</a>, you are agreeing to be bound by these terms of service, all applicable laws and regulations, and agree that you are responsible for compliance with any applicable local laws. If you do not agree with any of these terms, you are prohibited from using or accessing this site. The materials contained in this website are protected by applicable copyright and trademark law.  You must be above the age of majority, or have the express consent from a parent or guardian, to use our application and services.</p>

                <h3>2. Use License</h3>

                <ol type='a'>
                  <li>
                      Permission is granted to download one copy of the materials (information, app, site, or software) on this website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:

                      <ol type='i'>
                        <li>modify or copy the materials;</li>
                        <li>use the materials for any commercial purpose, or for any public display (commercial or non-commercial);</li>
                        <li>attempt to decompile or reverse engineer any software contained on this website;</li>
                        <li>remove any copyright or other proprietary notations from the materials; or</li>
                        <li>transfer the materials to another person or "mirror" the materials on any other server.</li>
                      </ol>
                  </li>
                  <li>This license shall automatically terminate if you violate any of these restrictions and may be terminated at any time. Upon terminating your viewing of these materials or upon the termination of this license, you must destroy any downloaded materials in your possession whether in electronic or printed format.</li>
                </ol>

                <h3>3. Disclaimer</h3>

                <ol type='a'>
                  <li>The materials on this website are provided on an 'as is' basis. We makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.</li>
                  <li>Further, we do not warrant or make any representations concerning the accuracy, likely results, or reliability of the use of the materials on its website or otherwise relating to such materials or on any sites linked to this site.</li>
                </ol>

                <h3>4. Limitations</h3>

                <p>In no event shall we (or our suppliers) be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on this website, even if we or a an authorized representative has been notified orally or in writing of the possibility of such damage. Because some jurisdictions do not allow limitations on implied warranties, or limitations of liability for consequential or incidental damages, these limitations may not apply to you.</p>

                <h3>5. Accuracy of materials</h3>

                <p>The materials appearing on this website could include technical, typographical, or photographic errors. We do not warrant that any of the materials on its website are accurate, complete or current. We may make changes to the materials contained on its website at any time without notice. However we do not make any commitment to update the materials.</p>

                <h3>6. Links</h3>

                <p>We have not reviewed all of the sites linked to its website and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by us of the site. Use of any such linked website is at the user's own risk.</p>

                <h3>7. Modifications</h3>

                <p>We may revise these terms of service for this website at any time without notice. By using this website you are agreeing to be bound by the then current version of these terms of service.</p>

                <h3>8. Governing Law</h3>

                <p>These terms and conditions are governed by and construed in accordance with the laws of California and you irrevocably submit to the exclusive jurisdiction of the courts in that State or location.</p>
              </div>
            )}

            { this.section('privacy',
              <div>
                <p>These Terms and Conditions apply to the use of this website.</p>
                <hr />

                <p>Your privacy is important to us.</p>

                <p>It is our policy to respect your privacy regarding any information we may collect while operating our website. Accordingly, we have developed this privacy policy in order for you to understand how we collect, use, communicate, disclose and otherwise make use of personal information. We have outlined our privacy policy below.</p>

                <ul>
                  <li>We will collect personal information by lawful and fair means and, where appropriate, with the knowledge or consent of the individual concerned.  This includes both 1st and 3d party cookies, tokens, other other means of personally identifying you.</li>
                  <li>Before or at the time of collecting personal information, we will identify the purposes for which information is being collected.  We may ask for enhanced permisions on your mobile device (geolocation access, camera access, etc), but we will inform you as to why.</li>
                  <li>We will collect and use personal information solely for fulfilling those purposes specified by us and for other ancillary purposes, unless we obtain the consent of the individual concerned or as required by law.</li>
                  <li>Personal data should be relevant to the purposes for which it is to be used, and, to the extent necessary for those purposes, should be accurate, complete, and up-to-date.</li>
                  <li>We will protect personal information by using reasonable security safeguards against loss or theft, as well as unauthorized access, disclosure, copying, use or modification.</li>
                  <li>We will make readily available to customers information about our policies and practices relating to the management of personal information.</li>
                  <li>We will only retain personal information for as long as necessary for the fulfilment of those purposes.</li>
                </ul>

                <p>We are committed to conducting our business in accordance with these principles in order to ensure that the confidentiality of personal information is protected and maintained. We may change this privacy policy from time to time at our sole discretion.</p>
              </div>
            )}

            { this.section('code',
              <div>
                <p>ActionHero's source code licence is <a href='https://github.com/actionhero/actionhero/master/LICENSE.txt'>The V2 Apache Licence, and is distributed with the code.</a></p>
              </div>
            )}

          </Col>
        </Row>
      </DocsPage>
    )
  }
}
