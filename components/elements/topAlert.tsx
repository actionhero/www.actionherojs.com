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
          <strong>Meet Keryx</strong>, the successor to Actionhero — a
          TypeScript framework on Bun that serves one action class over HTTP,
          WebSockets, the CLI, background tasks, and as an MCP tool for AI
          agents.{" "}
          <strong>
            <a
              href="https://keryxjs.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              keryxjs.com →
            </a>
          </strong>
        </p>
      </div>
    );
  }
}
