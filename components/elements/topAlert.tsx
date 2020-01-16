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
          <strong>We need your input!</strong>
          <br />
          <br />
          The Actionhero Team is working on our plans for 2020 and would like to
          solicit input from our community. <br />
          Please take 5 to complete our{" "}
          <strong>
            <a href="https://forms.gle/ZMmCqGN7pvgHKdz57" target="_blank">
              2020 Developer Survey
            </a>
          </strong>
          ! .
        </p>
      </div>
    );
  }
}
