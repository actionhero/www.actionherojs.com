import React from 'react'
import ReactDOM from 'react-dom'
import TestUtils from 'react-addons-test-utils'

import Footer from '../../components/footer.js'

describe('Footer', () => {
  it('renders the date and body content', () => {
    let page = TestUtils.renderIntoDocument(<Footer />)
    let date = TestUtils.findRenderedDOMComponentWithClass(page, '_footer-date')
    let body = ReactDOM.findDOMNode(date).textContent
    expect(body).toContain(new Date().getFullYear())
    expect(body).toContain('Thingamagig')
  })
})
