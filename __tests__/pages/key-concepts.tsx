import React from "react";
import ReactDOM from "react-dom";
import TestUtils from "react-dom/test-utils";

import GetStarted from "../../pages/key-concepts";

describe("KeyConcepts", () => {
  it("renders the page", () => {
    const page = TestUtils.renderIntoDocument(<GetStarted />);
    const body = ReactDOM.findDOMNode(page).textContent;

    expect(body).toContain("Actionhero is an API server");
  });
});
