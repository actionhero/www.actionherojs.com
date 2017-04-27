import React from 'react'
import ReactDOM from 'react-dom'
import TestUtils from 'react-dom/test-utils'

import SolutionsGrid from '../../components/solutionsGrid.js'

describe('SolutionsGrid', () => {
  it('renders', () => {
    let page = TestUtils.renderIntoDocument(<SolutionsGrid />)
    let body = ReactDOM.findDOMNode(page).textContent

    expect(body).toContain('Enterprise')
    expect(body).toContain('Apache-2 license')
  })
})
