import React from 'react'
import { FormGroup, FormControl, InputGroup, Glyphicon } from 'react-bootstrap'

export default class extends React.Component {
  constructor (params) {
    super(params)
    this.state = {
      site: 'www.actionherojs.com',
      query: ''
    }
  }

  buildUrl () {
    return `https://www.google.com/#q=site:${this.state.site}+${this.state.query}`
  }

  handleChange (event) {
    let change = {}
    change[event.target.id] = event.target.value
    this.setState(change)
  }

  submit (event) {
    event.preventDefault()
    window.location.href = this.buildUrl()
  }

  render () {
    return (
      <form onSubmit={this.submit.bind(this)}>
        <FormGroup bsSize='large'>
          <InputGroup>
            <InputGroup.Addon><Glyphicon glyph='search' /></InputGroup.Addon>
            <FormControl
              id='query'
              type='text'
              value={this.state.query}
              onChange={this.handleChange.bind(this)}
              placeholder='Search Docs'
            />
            <FormControl.Feedback />
          </InputGroup>
        </FormGroup>
      </form>
    )
  }
}
