import React from 'react'
import ReactDOM from 'react-dom'
import TestUtils from 'react-dom/test-utils'

import Plugins from '../../pages/plugins.js'

describe('Plugins', () => {
  it('renders the page', () => {
    let page = TestUtils.renderIntoDocument(<Plugins />)
    let body = ReactDOM.findDOMNode(page).textContent

    expect(body).toContain('robust ecosystem')
  })
})
