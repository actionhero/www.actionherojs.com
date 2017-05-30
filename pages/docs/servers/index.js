import React from 'react'
import Router from 'next/router'
import Link from 'next/link'
import Page from './../../../components/layouts/page.js'

export default class extends React.Component {
  componentDidMount () {
    Router.replace('/docs')
  }

  render () {
    return (
      <Page>
        <div style={{textAlign: 'center'}}>
          <h1>You shouldn't be here!</h1>
          <h2>Try <Link href='/docs'><a>starting over in the Documentation secion</a></Link>.</h2>
        </div>
      </Page>
    )
  }
}
