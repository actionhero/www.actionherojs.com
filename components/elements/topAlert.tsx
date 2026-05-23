import { Component } from "react";
import Theme from "./../theme";
import Link from "next/link";

export default class TopAlert extends Component {
  render() {
    return (
      <div
        style={{
          textAlign: "center",
          padding: 10,
          backgroundColor: Theme.colors.white,
          borderBottom: `5px solid ${Theme.colors.red}`,
        }}
      >
        <p style={{ marginBottom: 0 }}>
          <strong>Actionhero has a successor!</strong> Check out{" "}
          <strong>
            <a
              href="https://keryxjs.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              keryxjs.com
            </a>
          </strong>{" "}
          — the next-generation Node.js framework from the Actionhero team.
        </p>
      </div>
    );
  }
}
