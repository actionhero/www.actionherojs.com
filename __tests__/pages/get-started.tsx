import React from "react";
import ReactDOM from "react-dom";
import TestUtils from "react-dom/test-utils";

import GetStarted from "../../pages/get-started";

describe("GetStarted", () => {
  it("renders the page", () => {
    const page = TestUtils.renderIntoDocument(<GetStarted />);
    const body = ReactDOM.findDOMNode(page).textContent;

    expect(body).toContain("Who is the Actionhero?");
  });
});
