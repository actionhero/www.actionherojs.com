import React from "react";
import ReactDOM from "react-dom";
import TestUtils from "react-dom/test-utils";

import DangerAlert from "../../../components/alerts/danger";

describe("DangerAlert", () => {
  it("renders the alert", () => {
    const page = TestUtils.renderIntoDocument(
      <DangerAlert message="hello world" />,
    );
    const body = ReactDOM.findDOMNode(page).textContent;

    expect(body).toContain("hello world");
  });
});
