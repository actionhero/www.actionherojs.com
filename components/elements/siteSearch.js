import React from 'react'
import { FormGroup, FormControl } from 'react-bootstrap'

export default class extends React.Component {
  render () {
    return (
      <form action='https://www.google.com/#q=site:www.actionherojs.com+file' method='get' target='_blank' noValidate>
        <FormGroup>
          <FormControl
            id='q'
            name='q'
            type='text'
            placeholder='Search'
          />
          <FormControl type='hidden' id='site' name='site' value='www.actionherojs.com' />
          <FormControl.Feedback />
        </FormGroup>
      </form>
    )
  }
}
