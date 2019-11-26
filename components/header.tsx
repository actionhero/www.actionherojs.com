import { Component } from "react";
import Router from "next/router";
import { Grid, Navbar, Nav, NavItem } from "react-bootstrap";
import Theme from "./theme";
import HeaderButton from "./buttons/headerButton";

interface State {
  activeKey: string;
  hoverKey: string;
}

export default class extends Component<{}, State> {
  constructor(props) {
    super(props);
    this.state = { activeKey: null, hoverKey: null };
  }

  componentDidMount() {
    if (!process || process.browser) {
      this.setState({ activeKey: Router.pathname });
    }
  }

  onMouseEnter(matchKey) {
    this.setState({ hoverKey: matchKey });
  }

  onMouseLeave() {
    this.setState({ hoverKey: null });
  }

  linkStyle(matchKey) {
    let decoration = null;
    if (
      (this.state.activeKey && this.state.activeKey.match(matchKey)) ||
      (this.state.hoverKey && this.state.hoverKey.match(matchKey))
    ) {
      decoration = "3px solid currentColor";
    }

    return {
      lineHeight: 3,
      color: Theme.colors.white,
      paddingBottom: 10,
      fontWeight: 300,
      borderBottom: decoration
    };
  }

  async goTo(path) {
    if (path.indexOf("http") === 0) {
      return (window.location.href = path);
    }

    try {
      await Router.push(path);
    } catch (error) {
      window.location.href = path;
    }
  }

  render() {
    return (
      <header
        style={{
          backgroundColor: Theme.colors.blue
        }}
      >
        <Grid>
          <Navbar
            style={{
              backgroundColor: Theme.colors.blue,
              paddingTop: 5,
              marginBottom: 10,
              border: 0
            }}
          >
            <Navbar.Header>
              <Navbar.Brand>
                <a
                  onClick={this.goTo.bind(this, "/")}
                  style={{ paddingTop: 0, marginBottom: 15 }}
                >
                  <img
                    src="/static/images/actionhero-logo-header-wordmark.svg"
                    style={{ paddingTop: 14, paddingBottom: 20 }}
                  />
                </a>
              </Navbar.Brand>
              <Navbar.Toggle />
            </Navbar.Header>

            <Navbar.Collapse>
              <Nav pullRight />

              <Nav pullLeft className="hidden-md hidden-sm hidden-xs">
                <NavItem>&nbsp;</NavItem>
                <NavItem>&nbsp;</NavItem>
              </Nav>

              <Nav pullLeft>
                <NavItem
                  onClick={this.goTo.bind(this, "/why")}
                  className="hidden-sm"
                >
                  <span
                    onMouseEnter={() => {
                      this.onMouseEnter("/why");
                    }}
                    onMouseLeave={() => {
                      this.onMouseLeave();
                    }}
                    style={this.linkStyle("/why")}
                  >
                    Why Actionhero
                  </span>
                </NavItem>

                <NavItem onClick={this.goTo.bind(this, "/downloads")}>
                  <span
                    onMouseEnter={() => {
                      this.onMouseEnter("/downloads");
                    }}
                    onMouseLeave={() => {
                      this.onMouseLeave();
                    }}
                    style={this.linkStyle("/downloads")}
                  >
                    Downloads
                  </span>
                </NavItem>

                <NavItem onClick={this.goTo.bind(this, "/tutorials")}>
                  <span
                    onMouseEnter={() => {
                      this.onMouseEnter("/tutorials");
                    }}
                    onMouseLeave={() => {
                      this.onMouseLeave();
                    }}
                    style={this.linkStyle("/tutorials")}
                  >
                    Tutorials
                  </span>
                </NavItem>

                <NavItem
                  onClick={this.goTo.bind(
                    this,
                    "https://docs.actionherojs.com"
                  )}
                >
                  <span
                    onMouseEnter={() => {
                      this.onMouseEnter("/docs");
                    }}
                    onMouseLeave={() => {
                      this.onMouseLeave();
                    }}
                    style={this.linkStyle("/docs")}
                  >
                    Documentation
                  </span>
                </NavItem>

                <NavItem
                  onClick={this.goTo.bind(this, "/plugins")}
                  className="hidden-sm"
                >
                  <span
                    onMouseEnter={() => {
                      this.onMouseEnter("/plugins");
                    }}
                    onMouseLeave={() => {
                      this.onMouseLeave();
                    }}
                    style={this.linkStyle("/plugins")}
                  >
                    Plugins
                  </span>
                </NavItem>

                <NavItem onClick={this.goTo.bind(this, "/community")}>
                  <span
                    onMouseEnter={() => {
                      this.onMouseEnter("/community");
                    }}
                    onMouseLeave={() => {
                      this.onMouseLeave();
                    }}
                    style={this.linkStyle("/community")}
                  >
                    Community
                  </span>
                </NavItem>

                <NavItem
                  onClick={this.goTo.bind(
                    this,
                    "https://actionherojs.threadless.com"
                  )}
                >
                  <span
                    onMouseEnter={() => {
                      this.onMouseEnter("/shop");
                    }}
                    onMouseLeave={() => {
                      this.onMouseLeave();
                    }}
                    style={this.linkStyle("/shop")}
                  >
                    Shop
                  </span>
                </NavItem>
              </Nav>

              <Nav pullRight>
                <HeaderButton
                  href="/get-started"
                  backgroundColor={Theme.colors.red}
                  textColor={Theme.colors.white}
                >
                  Get Started
                </HeaderButton>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        </Grid>
      </header>
    );
  }
}
