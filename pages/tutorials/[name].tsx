import ReactMarkdown from "react-markdown/with-html";
import { Component } from "react";
import { Row, Col } from "react-bootstrap";
import DocsPage from "../../components/layouts/docsPage";
import Code from "./../../components/code";
import Link from "next/link";

interface Props {
  content: string;
  name: string;
}

export default class ToutorialPage extends Component<Props> {
  static async getInitialProps(ctx) {
    const name = ctx.query.name;
    const content = await require(`./../../tutorials/${name}.md`);
    return {
      content: content.default,
      name
    };
  }

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { content, name } = this.props;
    console.log(name);

    return (
      <DocsPage
        showSolutions
        titleSection={{
          title: name.charAt(0).toUpperCase() + name.slice(1),
          icon: "/static/images/team-up.svg"
        }}
      >
        <Row>
          <Col md={12}>
            <ReactMarkdown
              source={content}
              escapeHtml={false}
              renderers={{ code: Code }}
            />
          </Col>
        </Row>

        <hr />
        <p>
          Back to{" "}
          <Link href="/tutorials">
            <a>Tutorials</a>
          </Link>
        </p>
      </DocsPage>
    );
  }
}
