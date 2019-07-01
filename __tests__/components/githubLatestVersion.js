import React from 'react'
import ReactDOM from 'react-dom'
import TestUtils from 'react-dom/test-utils'

import GithubLatestVersion from '../../components/githubLatestVersion.js'

describe('GithubLatestVersion', () => {
  it('loads a version from GitHub mocked', () => {
    let page = TestUtils.renderIntoDocument(<GithubLatestVersion latestRelease={'v1.2.3'} />)
    let body = ReactDOM.findDOMNode(page).textContent
    expect(body).toEqual('v1.2.3')
  })
})
