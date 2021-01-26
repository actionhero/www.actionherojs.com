import { Component } from "react";
import Router from "next/router";
import { Container, Navbar, Nav } from "react-bootstrap";
import Theme from "./theme";
import HeaderButton from "./buttons/headerButton";

const linkStyle = {
  lineHeight: 3,
  color: Theme.colors.white,
  paddingBottom: 10,
  fontWeight: 300,
  borderBottom: "none",
  marginRight: 20,
};

export default class extends Component<{}> {
  constructor(props) {
    super(props);
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
          backgroundColor: Theme.colors.blue,
        }}
      >
        <Container>
          <Navbar
            style={{
              backgroundColor: Theme.colors.blue,
              paddingTop: 5,
              marginBottom: 0,
              border: 0,
            }}
            expand="lg"
          >
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

            <Navbar.Toggle aria-controls="basic-navbar-nav" />

            <Navbar.Collapse id="basic-navbar-nav">
              {/* <Nav className="d-none d-lg-block">
                <NavItem>&nbsp;</NavItem>
                <NavItem>&nbsp;</NavItem>
              </Nav> */}

              <Nav className="mr-auto">
                <Nav.Link href="/why" style={linkStyle}>
                  Why Actionhero?
                </Nav.Link>
                <Nav.Link href="/downloads" style={linkStyle}>
                  Downloads
                </Nav.Link>
                <Nav.Link href="/tutorials" style={linkStyle}>
                  Tutorials
                </Nav.Link>
                <Nav.Link
                  href="https://docs.actionherojs.com"
                  style={linkStyle}
                >
                  Docs
                </Nav.Link>
                <Nav.Link href="/plugins" style={linkStyle}>
                  Plugins
                </Nav.Link>
                <Nav.Link href="/community" style={linkStyle}>
                  Community
                </Nav.Link>
                <Nav.Link
                  href="https://actionherojs.threadless.com"
                  style={linkStyle}
                >
                  Shop
                </Nav.Link>
              </Nav>

              <Nav className="d-none d-xl-block">
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
        </Container>
      </header>
    );
  }
}
