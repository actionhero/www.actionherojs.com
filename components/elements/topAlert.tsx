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
          borderBottom: `5px solid ${Theme.colors.red}`
        }}
      >
        <p>
          <strong>Actionhero is moving to Typescript in v21!</strong>
          <br />
          To learn more about the new features and the upgrade process, visit
          the{" "}
          <Link href="/tutorials/typescript">
            <a>Typescript Tutorial</a>
          </Link>
          .
        </p>
      </div>
    );
  }
}
