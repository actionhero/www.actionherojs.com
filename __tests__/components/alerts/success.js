import React from 'react'
import ReactDOM from 'react-dom'
import TestUtils from 'react-dom/test-utils'

import SuccessAlert from '../../../components/alerts/success.js'

describe('SuccessAlert', () => {
  it('renders the alert', () => {
    let page = TestUtils.renderIntoDocument(<SuccessAlert message='hello world' />)
    let body = ReactDOM.findDOMNode(page).textContent

    expect(body).toContain('hello world')
  })
})
