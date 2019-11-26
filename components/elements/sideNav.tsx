import { Component } from "react";
import Link from "next/link";
import Theme from "../theme";
import ReactDOM from "react-dom";

interface Props {
  contentHeight: number;
  currentSection: string;
  color?: string;
  sideNav: Array<any>;
  links: Array<any>;
}

export default class extends Component<Props> {
  render() {
    const { contentHeight, currentSection, sideNav, links } = this.props;

    const bottomLinkStyle = {
      fontWeight: 200,
      color: Theme.colors.red
    };

    if (!this.props.sideNav) {
      return null;
    }

    return (
      <div style={{ height: contentHeight }}>
        <div style={{ paddingTop: 90 }}>
          <ul
            style={{
              listStyleType: "none",
              paddingLeft: 0,
              marginLeft: 0
            }}
          >
            {Object.keys(sideNav).map(key => {
              const message = sideNav[key];

              const aStyle = {
                fontWeight: 300,
                fontSize: 18,
                lineHeight: "1.6em",
                color: null
              };

              if (this.props.currentSection === key) {
                aStyle.color = Theme.colors.red;
                aStyle.fontWeight = 400;
              }

              return (
                <li key={key}>
                  <a href={`#${key}`} className="text-info" style={aStyle}>
                    {message}
                  </a>
                </li>
              );
            })}
          </ul>

          <br />

          <ul
            style={{
              listStyleType: "none",
              paddingLeft: 0,
              marginLeft: 0
            }}
          >
            {links ? (
              <div>
                {links.map(k => {
                  return <li key={`side-nav-link-${k.link}`}></li>;
                })}
              </div>
            ) : null}
          </ul>
        </div>
      </div>
    );
  }
}
