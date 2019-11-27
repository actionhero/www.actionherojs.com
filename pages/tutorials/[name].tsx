import ReactMarkdown from "react-markdown/with-html";
import { Component } from "react";
import { Row, Col } from "react-bootstrap";
import DocsPage from "../../components/layouts/docsPage";
import Code from "./../../components/code";
import Link from "next/link";
import Theme from "./../../components/theme";
import RedLine from "./../../components/elements/redLine";

interface Props {
  markdown: string;
  name: string;
}

interface State {
  sectionHeadings: Array<any>;
  renderedContent: any;
}

export default class ToutorialPage extends Component<Props, State> {
  static async getInitialProps(ctx) {
    const name = ctx.query.name;
    const markdown = await require(`./../../tutorials/${name}.md`);
    return {
      markdown: markdown.default,
      name
    };
  }

  constructor(props) {
    super(props);

    this.state = {
      sectionHeadings: [],
      renderedContent: (
        <ReactMarkdown
          source={props.markdown}
          escapeHtml={false}
          renderers={{
            code: Code,
            heading: node => {
              return this.parseHeading(node);
            }
          }}
        />
      )
    };
  }

  parseHeading({ children }) {
    const { sectionHeadings } = this.state;

    return (
      <>
        {children.map(child => {
          const stringValue = child.props.value;
          if (sectionHeadings.indexOf(stringValue) < 0) {
            sectionHeadings.push(stringValue);
            this.setState({ sectionHeadings });
          }

          return (
            <div key={child.key}>
              <br />
              <h2 id={stringValue} style={Theme.typeography.h2}>
                <span style={{ fontWeight: 300, fontSize: 36 }}>{child}</span>
              </h2>
              <RedLine />
            </div>
          );
        })}
      </>
    );
  }

  render() {
    const { name, markdown } = this.props;
    const { sectionHeadings, renderedContent } = this.state;

    const aStyle = {
      fontWeight: 300,
      fontSize: 18,
      lineHeight: "1.6em",
      color: null
    };

    return (
      <DocsPage
        showSolutions
        titleSection={{
          title: name.charAt(0).toUpperCase() + name.slice(1),
          icon: `/static/images/${Theme.icons[name]}`
        }}
      >
        <Row>
          <Col md={9}>{renderedContent}</Col>
          <Col md={3}>
            <div style={{ paddingTop: 90 }}>
              <ul
                style={{
                  listStyleType: "none",
                  paddingLeft: 0,
                  marginLeft: 0
                }}
              >
                {sectionHeadings.map(section => {
                  return (
                    <li key={`section-${section}`}>
                      <a
                        href={`#${section}`}
                        className="text-info"
                        style={aStyle}
                      >
                        {section}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
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
