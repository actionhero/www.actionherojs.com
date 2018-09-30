import React from 'react'
import ReactDOM from 'react-dom'
import TestUtils from 'react-dom/test-utils'

import GithubLatestVersion from '../../components/GithubLatestVersion.js'

describe('GithubLatestVersion', () => {
  const sleep = (sleep) => {
    return new Promise((resolve) => {
      setTimeout(resolve, sleep)
    })
  }

  it('loads a version from GitHub', async () => {
    let page = TestUtils.renderIntoDocument(<GithubLatestVersion />)
    let body = ReactDOM.findDOMNode(page).textContent
    expect(body).toEqual('~')

    await sleep(4000)
    // TODO
    // expect(body).toContain('v')
  })
})
