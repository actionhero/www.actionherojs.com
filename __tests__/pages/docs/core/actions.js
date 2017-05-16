import React from 'react'
import ReactDOM from 'react-dom'
import TestUtils from 'react-dom/test-utils'

import Docs from '../../../../pages/docs/core/actions.js'

describe('Docs/Actions', () => {
  it('renders the page', () => {
    let page = TestUtils.renderIntoDocument(<Docs />)
    let body = ReactDOM.findDOMNode(page).textContent

    expect(body).toContain('Action framework')
  })
})
