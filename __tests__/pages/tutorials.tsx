import React from "react";
import ReactDOM from "react-dom";
import TestUtils from "react-dom/test-utils";

import Tutorials from "../../pages/tutorials";

describe("Terms", () => {
  it("renders the page", () => {
    const page = TestUtils.renderIntoDocument(<Tutorials />);
    const body = ReactDOM.findDOMNode(page).textContent;

    expect(body).toContain(
      "These tutorials are here to provide a more story-driven guide to how things work",
    );
  });
});
