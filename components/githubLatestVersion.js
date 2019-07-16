import React from 'react'
import GitHub from 'github-api'

export default class extends React.Component {
  constructor (props) {
    super(props)

    this.github = new GitHub()
    this.org = props.org || 'ActionHero'
    this.repo = props.repo || 'ActionHero'
    this.repository = this.github.getRepo(this.org, this.repo)
    this.state = {
      latestRelease: props.latestRelease || '~',
      error: null
    }
  }

  componentDidMount () {
    if (this.state.latestRelease === '~') { this.loadReleases() }
  }

  async loadReleases () {
    let latestRelease
    let error

    try {
      const response = await this.repository.listReleases()
      const releases = response.data
      latestRelease = releases[0].tag_name
    } catch (e) {
      if (e.message) {
        error = `Cannot load recent releases: ${e.message}`
      } else {
        error = e.toString()
      }
    }

    this.setState({ error, latestRelease })
  }

  render () {
    if (this.state.error) { console.error(`Error fetching versions: ${this.state.error}`) }
    return <span className='githubLatestVersion'>{this.state.latestRelease}</span>
  }
}
