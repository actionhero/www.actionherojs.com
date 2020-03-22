import { Component } from "react";
import GitHub from "github-api";

interface Props {
  latestRelease?: string;
}

interface State {
  latestRelease: string;
  github: any;
  org: string;
  repo: string;
  repository?: any;
  error: string;
}

export default class extends Component<Props, State> {
  constructor(props) {
    super(props);

    this.state = {
      latestRelease: props.latestRelease || "~",
      github: new GitHub(),
      org: props.org || "Actionhero",
      repo: props.repo || "Actionhero",
      error: null,
    };
  }

  async componentDidMount() {
    await this.setState({
      repository: this.state.github.getRepo(this.state.org, this.state.repo),
    });

    if (this.state.latestRelease === "~") {
      this.loadReleases();
    }
  }

  async loadReleases() {
    let latestRelease;
    let error;

    try {
      const response = await this.state.repository.listReleases();
      const releases = response.data;
      latestRelease = releases[0].tag_name;
    } catch (e) {
      if (e.message) {
        error = `Cannot load recent releases: ${e.message}`;
      } else {
        error = e.toString();
      }
    }

    this.setState({ error, latestRelease });
  }

  render() {
    if (this.state.error) {
      console.error(`Error fetching versions: ${this.state.error}`);
    }

    return (
      <span className="githubLatestVersion">{this.state.latestRelease}</span>
    );
  }
}
