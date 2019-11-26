import { Component } from "react";
import Theme from "../theme";

export default class extends Component {
  render() {
    return (
      <hr
        style={{
          color: Theme.colors.blue,
          backgroundColor: Theme.colors.blue,
          border: 0,
          height: 2
        }}
      />
    );
  }
}
