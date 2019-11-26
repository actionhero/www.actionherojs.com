import React from "react";
import ReactDOM from "react-dom";
import TestUtils from "react-dom/test-utils";

import Why from "../../pages/why";

describe("Terms", () => {
  it("renders the page", () => {
    const page = TestUtils.renderIntoDocument(<Why />);
    const body = ReactDOM.findDOMNode(page).textContent;

    expect(body).toContain("Actionhero Whitepaper");
  });
});
