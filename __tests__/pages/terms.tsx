import React from "react";
import ReactDOM from "react-dom";
import TestUtils from "react-dom/test-utils";

import Solutions from "../../pages/terms";

describe("Terms", () => {
  it("renders the page", () => {
    const page = TestUtils.renderIntoDocument(<Solutions />);
    const body = ReactDOM.findDOMNode(page).textContent;

    expect(body).toContain(
      "These Terms and Conditions apply to the use of this website.",
    );
  });
});
