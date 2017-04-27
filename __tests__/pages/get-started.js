import React from 'react'
import ReactDOM from 'react-dom'
import TestUtils from 'react-dom/test-utils'

import GetStarted from '../../pages/get-started.js'

describe('GetStarted', () => {
  it('renders the page', () => {
    let page = TestUtils.renderIntoDocument(<GetStarted />)
    let body = ReactDOM.findDOMNode(page).textContent

    expect(body).toContain('Get Started with ActionHero')
  })
})
