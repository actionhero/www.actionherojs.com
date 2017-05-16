import React from 'react'
import ReactDOM from 'react-dom'
import TestUtils from 'react-dom/test-utils'

import Solutions from '../../pages/terms.js'

describe('Terms', () => {
  it('renders the page', () => {
    let page = TestUtils.renderIntoDocument(<Solutions />)
    let body = ReactDOM.findDOMNode(page).textContent

    expect(body).toContain('These Terms and Conditions apply to the use of this website.')
  })
})
