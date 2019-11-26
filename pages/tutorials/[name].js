import ReactMarkdown from "react-markdown/with-html";
import {Component} from 'react'
import Router from 'next'
import { Row, Col } from 'react-bootstrap'
import DocsPage from './../../components/layouts/docsPage.js'

export default class WhyPage extends Component {
  static async getInitialProps() {
    const content = await require("./../../tutorials/actions.md");
    return {
      content: content.default,
      title: "License"
    };
  }

  constructor (props) {
    super(props)
    this.state = {}
  }

  render () {
    const { content ,title} = this.props;

    return (
      <DocsPage titleSection={{
        title,
        icon: '/static/images/team-up.svg'
      }}
      >
        <Row>
          <Col md={12}>
              <ReactMarkdown source={content} escapeHtml={false} />
          </Col>
        </Row>
      </DocsPage>
    )
  }
}
