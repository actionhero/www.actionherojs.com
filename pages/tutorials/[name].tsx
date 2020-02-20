import ReactMarkdown from "react-markdown/with-html";
import { Component } from "react";
import { Row, Col } from "react-bootstrap";
import { Waypoint } from "react-waypoint";
import DocsPage from "../../components/layouts/docsPage";
import Code from "./../../components/code";
import Link from "next/link";
import Theme from "./../../components/theme";
import RedLine from "./../../components/elements/redLine";
import BigButton from "./../../components/buttons/bigButton";

interface Props {
  markdown: string;
  name: string;
}

interface State {
  sectionHeadings: Array<any>;
  currentlyVisableSections: {};
  contentHeight: number;
}

export default class TutorialPage extends Component<Props, State> {
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
      currentlyVisableSections: {},
      sectionHeadings: [],
      contentHeight: 0
    };
  }

  componentDidMount() {
    this.measureContentHeight();
  }

  measureContentHeight() {
    const element = document.getElementById("tutorialPageContent");
    if (element) {
      const height = element.offsetHeight;
      this.setState({ contentHeight: height });
    }
  }

  waypointEnterCallback(id, { previousPosition }) {
    this.state.currentlyVisableSections[id] = true;
    this.highlightSideNav();
  }

  waypointExitCallback(id) {
    this.state.currentlyVisableSections[id] = false;
    this.highlightSideNav();
  }

  highlightSideNav() {
    Object.keys(this.state.currentlyVisableSections).forEach(section => {
      const value = this.state.currentlyVisableSections[section];
      const element = document.getElementById(`sidenav-${section}`);

      if (value) {
        element.style.color = Theme.colors.red;
        element.style.fontWeight = "400";
      } else {
        element.style.color = Theme.typography.h2.color;
        element.style.fontWeight = Theme.typography.h2.fontWeight.toString();
      }
    });
  }

  parseHeading({ children }) {
    const { sectionHeadings } = this.state;

    return (
      <div>
        {children.map(child => {
          const stringValue = child.props.value;
          if (sectionHeadings.indexOf(stringValue) < 0) {
            sectionHeadings.push(stringValue);
            this.setState({ sectionHeadings });
          }

          const style = Theme.typography.h2;

          return (
            <Waypoint
              key={child.key}
              onEnter={args => {
                this.waypointEnterCallback(stringValue, args);
              }}
              onLeave={args => {
                this.waypointExitCallback(stringValue);
              }}
            >
              <div id={stringValue}>
                <br />
                <h2 style={style}>
                  <span style={{ fontWeight: 300, fontSize: 36 }}>{child}</span>
                </h2>
                <RedLine />
              </div>
            </Waypoint>
          );
        })}
      </div>
    );
  }

  render() {
    const { name } = this.props;
    const { sectionHeadings, contentHeight } = this.state;

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
        <Row id="tutorialPageContent">
          <Col md={9}>
            <ReactMarkdown
              source={this.props.markdown}
              escapeHtml={false}
              renderers={{
                code: Code,
                heading: node => {
                  return this.parseHeading(node);
                }
              }}
            />
          </Col>
          <Col md={3} className="hidden-xs hidden-sm">
            <div style={{ height: contentHeight }}>
              <div style={{ paddingTop: 90, position: "sticky", top: 0 }}>
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
                          id={`sidenav-${section}`}
                        >
                          {section}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </Col>
        </Row>

        <br />

        <BigButton
          href="/tutorials"
          backgroundColor={Theme.colors.red}
          textColor={Theme.colors.white}
        >
          Back to Tutorials
        </BigButton>
      </DocsPage>
    );
  }
}
