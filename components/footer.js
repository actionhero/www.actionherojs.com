import React from 'react'

export default class extends React.Component {
  constructor () {
    super()
    this.state = { date: new Date() }
  }

  render () {
    return (
      <footer id='footer-container'>
        <hr />
        <div className='row'>
          <div className='col-md-12'>
            <p className='text-muted _footer'>
              A <a target='_blank' href='https://www.delicioushat.com'> Delicious Hat</a> Thingamagig, { String.fromCharCode(169) + ' ' + this.state.date.getFullYear() }
            </p>
            <img style={{width: 50, padding: 10}} alt='delicious hat log' src='/static/images/delicious_hat.png' />
          </div>
        </div>
      </footer>
    )
  }
}
