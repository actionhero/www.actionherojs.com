import React from 'react'
import ReactDOM from 'react-dom'
import TestUtils from 'react-dom/test-utils'

import Solutions from '../../pages/solutions.js'

describe('Solutions', () => {
  it('renders the page', () => {
    const page = TestUtils.renderIntoDocument(<Solutions />)
    const body = ReactDOM.findDOMNode(page).textContent

    expect(body).toContain('Solutions')
  })
})
