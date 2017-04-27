import React from 'react'
import ReactDOM from 'react-dom'
import TestUtils from 'react-dom/test-utils'

import Community from '../../pages/community.js'

describe('Community', () => {
  it('renders the page', () => {
    let releases = [
      {
        published_at: 'Thu Apr 27 2017 15:43:47 GMT-0700 (PDT)',
        tag_name: 'v0.0.1',
        name: 'first!',
        html_url: 'http://go.away'
      }
    ]

    let page = TestUtils.renderIntoDocument(<Community releases={releases} />)
    let body = ReactDOM.findDOMNode(page).textContent

    expect(body).toContain('Team Up')
    expect(body).toContain('GitHub')
    expect(body).toContain('Slack')
    expect(body).toContain('Recent Releases')

    expect(body).toContain('first!')
  })

  it('renders the errror, should there be one', () => {
    let releases = []
    let error = 'Oh No!'

    let page = TestUtils.renderIntoDocument(<Community releases={releases} error={error} />)
    let body = ReactDOM.findDOMNode(page).textContent

    expect(body).toContain(error)
  })
})
