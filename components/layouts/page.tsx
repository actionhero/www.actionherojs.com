import { Component } from "react";
import { Container, Row } from "react-bootstrap";
import Head from "next/head";
import Router from "next/router";
import Theme from "../theme";
import TopAlert from "../elements/topAlert";
import Header from "../header";
import Footer from "../footer";

export default class extends Component {
  componentDidMount() {
    Router.events.on("onRouteChangeComplete", () => {
      //@ts-ignore
      ga("send", "pageview", location.pathname);
    });
  }

  render() {
    const commmonSetupStyle = {
      paddingLeft: 0,
      paddingRight: 0,
      fontFamily: Theme.fonts.main,
      fontSize: Theme.typography.default.fontSize,
      fontWeight: Theme.typography.default.fontWeight,
    };

    return (
      <div>
        <Head>
          <link
            rel="apple-touch-icon"
            sizes="57x57"
            href="/static/images/icons/apple-icon-57x57.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="60x60"
            href="/static/images/icons/apple-icon-60x60.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="72x72"
            href="/static/images/icons/apple-icon-72x72.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="76x76"
            href="/static/images/icons/apple-icon-76x76.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="114x114"
            href="/static/images/icons/apple-icon-114x114.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="120x120"
            href="/static/images/icons/apple-icon-120x120.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="144x144"
            href="/static/images/icons/apple-icon-144x144.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="152x152"
            href="/static/images/icons/apple-icon-152x152.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/static/images/icons/apple-icon-180x180.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="192x192"
            href="/static/images/icons/android-icon-192x192.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/static/images/icons/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="96x96"
            href="/static/images/icons/favicon-96x96.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/static/images/icons/favicon-16x16.png"
          />

          <meta name="viewport" content="width=device-width" />
          <link
            rel="stylesheet"
            type="text/css"
            href="/static/css/bootstrap.min.css"
          />
          <link
            rel="stylesheet"
            type="text/css"
            href="/static/css/bebasNeue.css"
          />
          <link
            rel="stylesheet"
            type="text/css"
            href="/static/css/animations.css"
          />
          <link
            href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,700,800|Roboto:100,300,400,500,700,900"
            rel="stylesheet"
          />

          <meta name="viewport" content="width=device-width, initial-scale=1" />

          <title>Actionhero</title>

          <script src="/static/js/googleAnalytics.js" />
        </Head>

        <Container fluid style={commmonSetupStyle}>
          <Header />
        </Container>

        <Container fluid style={commmonSetupStyle}>
          {this.props.children}
        </Container>

        <Container fluid style={commmonSetupStyle}>
          <Footer />
        </Container>
      </div>
    );
  }
}
