import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { InstantSearch, Hits, SearchBox } from 'react-instantsearch/dom'

import Theme from './../theme.js'

class Hit extends React.Component {
  render () {
    let hit = this.props.hit

    if (!hit.content) { return null }
    console.log(hit)

    let messageParts = []
    Object.entries(hit.hierarchy).forEach(collection => {
      if (collection[1]) {
        messageParts.push(`${collection[1]}`.replace('» ', ''))
      }
    })

    return (
      <div style={{
        padding: 5,
        fontFamily: 'Roboto, sans-serif',
        color: Theme.colors.blueGray,
        fontWeight: 300,
        fontSize: 18,
        lineHeight: '1.6em'
      }}>
        <Link href={hit.url}>
          <a>{messageParts.join(' -> ')}</a>
        </Link>
      </div>
    )
  }
}

export default class extends React.Component {
  constructor (params) {
    super(params)
    this.state = {
      appId: 'BH4D9OD16A',
      apiKey: 'c815281728dda80aefecd9b4381390cb',
      indexName: 'actionherojs'
    }
  }

  render () {
    return (
      <div>
        <Head>
          <link rel='stylesheet' href='https://unpkg.com/react-instantsearch-theme-algolia@4.0.0/style.min.css' />
        </Head>

        <InstantSearch appId={this.state.appId} apiKey={this.state.apiKey} indexName={this.state.indexName} >
          <SearchBox />
          <Hits hitComponent={Hit} />
        </InstantSearch>
        <br />
      </div>
    )
  }
}
