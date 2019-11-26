import { Component } from "react";
import { Row, Col, Alert } from "react-bootstrap";

interface Props {
  message: string;
}

export default class extends Component<Props> {
  render() {
    if (!this.props.message) {
      return null;
    }

    return (
      <Row>
        <Col md={12}>
          <Alert bsStyle="success"> {this.props.message.toString()} </Alert>
        </Col>
      </Row>
    );
  }
}
