import React from 'react'
import ReactDOM from 'react-dom'
import TestUtils from 'react-dom/test-utils'

import Footer from '../../components/footer.js'

describe('Footer', () => {
  it('renders the date and body content', () => {
    let page = TestUtils.renderIntoDocument(<Footer />)
    let content = TestUtils.findRenderedDOMComponentWithClass(page, '_footer')
    let body = ReactDOM.findDOMNode(content).textContent
    expect(body).toContain(new Date().getFullYear())
    expect(body).toContain('Thingamagig')
  })
})
