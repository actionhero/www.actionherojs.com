import { Component } from "react";
import Link from "next/link";
import { Button } from "react-bootstrap";
import Theme from "../theme";

interface Props {
  backgroundColor?: string;
  textColor: string;
  href?: string;
  size?: "lg" | "sm";
  onClick?: (e) => {};
  variant?:
    | "link"
    | "primary"
    | "secondary"
    | "success"
    | "danger"
    | "warning"
    | "info"
    | "dark"
    | "light"
    | "outline-primary"
    | "outline-secondary"
    | "outline-success"
    | "outline-danger"
    | "outline-warning"
    | "outline-info"
    | "outline-dark"
    | "outline-light";
}

interface State {
  mouseDown: boolean;
}

export default class extends Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = { mouseDown: false };
  }

  onMouseDown() {
    this.setState({ mouseDown: true });
  }

  onMouseUp() {
    this.setState({ mouseDown: false });
  }

  render() {
    const style = Theme.buttons.big(
      this.props.backgroundColor,
      this.props.textColor
    );

    if (this.state.mouseDown === true) {
      style.filter = "brightness(85%)";
    }

    return (
      <div
        onMouseDown={() => {
          this.onMouseDown();
        }}
        onMouseUp={() => {
          this.onMouseUp();
        }}
      >
        {this.props.href ? (
          <Link href={this.props.href}>
            <a style={{ textDecoration: "none" }}>
              <Button style={style} size={this.props.size || "lg"} block>
                {this.props.children}
              </Button>
            </a>
          </Link> //eslint-disable-line
        ) : (
          <Button
            onClick={this.props.onClick}
            style={style}
            variant={this.props.variant || "primary"}
            size={this.props.size || "lg"}
            block
          >
            {this.props.children}
          </Button>
        )}
      </div>
    );
  }
}
