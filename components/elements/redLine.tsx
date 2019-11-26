import { Component } from "react";
import Theme from "../theme";

export default class extends Component {
  render() {
    return (
      <hr
        style={{
          color: Theme.colors.red,
          backgroundColor: Theme.colors.red,
          border: 0,
          height: 2
        }}
      />
    );
  }
}
