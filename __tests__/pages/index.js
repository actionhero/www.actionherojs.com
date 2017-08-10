import React from 'react'
import ReactDOM from 'react-dom'
import TestUtils from 'react-dom/test-utils'

import Home from '../../pages/index.js'

describe('Home', () => {
  it('renders the page', () => {
    let page = TestUtils.renderIntoDocument(<Home latestRelease={'V0.0.1'} />)
    let body = ReactDOM.findDOMNode(page).textContent

    expect(body).toContain('reusable, scalable, and quick')
    expect(body).toContain('V0.0.1')
  })
})
