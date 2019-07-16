import React from 'react'
import ReactDOM from 'react-dom'
import TestUtils from 'react-dom/test-utils'
import Home from '../../pages/index.js'

describe('Home', () => {
  it('renders the page', () => {
    const page = TestUtils.renderIntoDocument(<Home latestRelease={'V0.0.1'} />)
    const body = ReactDOM.findDOMNode(page).textContent
    expect(body).toContain('reusable, scalable, and quick')
  })
})
