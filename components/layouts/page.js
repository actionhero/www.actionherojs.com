import React from 'react'
import { Grid, Row, Col } from 'react-bootstrap'
import Head from 'next/head'
import Router from 'next/router'

import Header from './../header.js'
import Footer from './../footer.js'

export default class extends React.Component {
  componentDidMount () {
    Router.onRouteChangeComplete = (url) => {
      ga('send', 'pageview', location.pathname) // eslint-disable-line
    }
  }

  render () {
    return (
      <div>
        <Head>
          <link rel='icon' href='/static/images/icons/favicon-96x96.png' type='image/png' />

          <meta name='viewport' content='width=device-width' />
          <link rel='stylesheet' type='text/css' href='/static/css/theme.min.css' />
          <link rel='stylesheet' type='text/css' href='/static/css/app.css' />
          <link href='https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css' rel='stylesheet' />

          <title>ActionHero</title>

          <script src='/static/js/googleAnalytics.js' />
        </Head>

        <Grid>
          <Row>
            <Col md={12}>
              <Header />
            </Col>
          </Row>
        </Grid>

        <Grid>
          { this.props.children }
        </Grid>

        <Grid>
          <Row>
            <Col md={12}>
              <Footer />
            </Col>
          </Row>
        </Grid>

      </div>
    )
  }
}
