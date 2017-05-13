import React from 'react'
import ReactDOM from 'react-dom'
import TestUtils from 'react-dom/test-utils'

import Docs from '../../pages/docs.js'

describe('Docs', () => {
  it('renders the page', () => {
    let page = TestUtils.renderIntoDocument(<Docs />)
    let body = ReactDOM.findDOMNode(page).textContent

    expect(body).toContain('The core methods of ActionHero')
  })
})
