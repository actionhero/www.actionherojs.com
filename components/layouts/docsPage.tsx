import { Component } from "react";
import { Grid, Row, Col } from "react-bootstrap";
import Link from "next/link";
import Page from "./page";
import Theme from "../theme";
import SideNav from "../elements/sideNav";
import SolutionsGrid from "../solutionsGrid";
import BlueLine from "../elements/blueLine";

interface Props {
  sideNav?: any;
  titleSection: { [key: string]: any };
  links?: Array<any>;
  showSolutions: boolean;
  currentSection?: string;
}

interface State {
  contentHeight: number;
}

export default class extends Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = { contentHeight: 0 };
  }

  componentDidMount() {
    setTimeout(this.measureContentHeight.bind(this));
  }

  measureContentHeight() {
    const height = document.getElementById("docPageContent").offsetHeight;
    this.setState({ contentHeight: height });
  }

  render() {
    let contentColWidth = 12;
    if (this.props.sideNav) {
      contentColWidth = 9;
    }

    return (
      <Page>
        {this.props.titleSection ? (
          <div
            style={{
              backgroundColor: Theme.colors.yellow,
              color: Theme.colors.blue,
              fontWeight: 200,
              padding: 50
            }}
          >
            <Grid>
              <Row>
                <Col md={3} style={{ textAlign: "center" }}>
                  {this.props.titleSection.icon ? (
                    <img src={this.props.titleSection.icon} />
                  ) : null}
                </Col>
                <Col md={6} style={{ textAlign: "center" }}>
                  <h1 style={Theme.typeography.h1}>
                    <br />
                    {this.props.titleSection.title}
                  </h1>
                  {this.props.titleSection.subTitle ? (
                    <p>{this.props.titleSection.subTitle}</p>
                  ) : null}
                </Col>
                <Col md={3} />
              </Row>
            </Grid>
          </div>
        ) : null}

        <div
          style={{
            height: 183,
            background: `url("/static/images/clouds-white.svg") no-repeat center ${Theme.colors.yellow}`
          }}
        />

        <Grid style={{ paddingBottom: Theme.padding.section.paddingBottom }}>
          <Row>
            <div id="_top" />
            <Col md={contentColWidth} id="docPageContent">
              {this.props.children}
            </Col>

            <Col md={3} className="hidden-xs hidden-sm">
              <SideNav
                contentHeight={this.state.contentHeight}
                sideNav={this.props.sideNav}
                links={this.props.links}
                currentSection={this.props.currentSection}
              />
            </Col>
          </Row>
        </Grid>

        {this.props.links && this.props.links[0].title.indexOf("»") >= 0 ? (
          <div
            style={{
              paddingBottom: Theme.padding.section.paddingBottom,
              color: Theme.colors.blue
            }}
          >
            <Grid>
              <Row>
                <Col md={12} style={{ textAlign: "center" }}>
                  <BlueLine />
                  <h2 style={Theme.typeography.h2}>
                    <span style={{ fontWeight: 400 }}>Up Next</span>
                  </h2>
                  <h2 style={Theme.typeography.h2}>
                    <Link href={this.props.links[0].link}>
                      <a>{this.props.links[0].title.replace("» ", "")}</a>
                    </Link>
                  </h2>
                </Col>
              </Row>
            </Grid>
          </div>
        ) : null}

        {this.props.showSolutions ? <SolutionsGrid /> : null}
      </Page>
    );
  }
}
