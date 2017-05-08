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
          <link rel='stylesheet' type='text/css' href='/static/css/bootstrap.min.css' />
          <link rel='stylesheet' type='text/css' href='/static/css/animations.css' />
          <link href='https://fonts.googleapis.com/css?family=Open+Sans:300,400,700,800|Roboto:100,300,400,500,700,900' rel='stylesheet' />

          <title>ActionHero</title>

          <script src='/static/js/googleAnalytics.js' />
        </Head>

        <Grid fluid style={{
          paddingLeft: 0,
          paddingRight: 0
        }}>
          <Header />
        </Grid>

        <Grid fluid style={{
          paddingLeft: 0,
          paddingRight: 0
        }}>
          { this.props.children }
        </Grid>

        <Grid fluid style={{
          paddingLeft: 0,
          paddingRight: 0
        }}>
          <Footer />
        </Grid>

      </div>
    )
  }
}
