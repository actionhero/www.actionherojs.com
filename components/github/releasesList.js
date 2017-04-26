import React from 'react'
import GitHub from 'github-api'
import { Table } from 'react-bootstrap'

const github = new GitHub()

export default class extends React.Component {
  constructor () {
    super()
    this.state = {
      repository: github.getRepo('actionhero', 'actionhero'),
      releases: []
    }
  }

  componentWillMount () {
    this.state.repository.listReleases().then((response) => {
      this.setState({releases: response.data})
    }).catch((error) => {
      alert(error) //eslint-disable-line
    })
  }

  render () {
    return (
      <Table striped bordered condensed hover>
        <thead>
          <tr>
            <th>Version</th>
            <th>Release Date</th>
            <th>Name</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {
            this.state.releases.map((release) => {
              let date = new Date(release.published_at)
              let dateString = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
              return (
                <tr key={release.tag_name}>
                  <td>{release.tag_name}</td>
                  <td>{dateString}</td>
                  <td>{release.name}</td>
                  <td><a target='_blank' href={release.html_url}>Learn More</a></td>
                </tr>
              )
            })
          }
        </tbody>
      </Table>
    )
  }
}
