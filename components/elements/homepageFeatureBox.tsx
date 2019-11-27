import { Component } from "react";
import { Col, Popover, OverlayTrigger } from "react-bootstrap";
import Code from "../code";
import Theme from "../theme";

interface CodePopoverProps {
  title: string;
  code: string;
}

class CodePopover extends Component<CodePopoverProps> {
  render() {
    const { code, title } = this.props;

    const content = (
      <Popover id={`popover-${title}`} style={{ maxWidth: 600 }}>
        <div
          style={{
            paddingTop: 15,
            paddingLeft: 10,
            paddingRight: 10,
            paddingBottom: 6
          }}
        >
          <Code language="javascript">{code}</Code>
        </div>
      </Popover>
    );

    return (
      <OverlayTrigger
        trigger={["hover", "focus", "click"]}
        placement="top"
        overlay={content}
      >
        <p>
          <strong>View Sample</strong>
        </p>
      </OverlayTrigger>
    );
  }
}

interface FeatureBoxProps {
  title: string;
  code?: string;
  body: string;
  image: string;
  colSpan?: number;
}

export default class FeatureBox extends Component<FeatureBoxProps> {
  render() {
    const { code, title, colSpan } = this.props;

    return (
      <Col md={colSpan || 4} style={{ textAlign: "center" }}>
        <div
          style={{
            paddingLeft: 20,
            paddingRight: 20,
            paddingBottom: 30
          }}
        >
          <img style={{ padding: 30 }} src={this.props.image} />
          <h2 style={Theme.typeography.h2Alt}>{this.props.title}</h2>
          <p style={{ lineHeight: 2 }}>{this.props.body}</p>
          <br />
          {this.props.code ? <CodePopover code={code} title={title} /> : null}
        </div>
      </Col>
    );
  }
}
