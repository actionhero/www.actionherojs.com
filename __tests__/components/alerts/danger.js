import React from 'react'
import ReactDOM from 'react-dom'
import TestUtils from 'react-dom/test-utils'

import DangerAlert from '../../../components/alerts/danger.js'

describe('DangerAlert', () => {
  it('renders the alert', () => {
    let page = TestUtils.renderIntoDocument(<DangerAlert message='hello world' />)
    let body = ReactDOM.findDOMNode(page).textContent

    expect(body).toContain('hello world')
  })
})
