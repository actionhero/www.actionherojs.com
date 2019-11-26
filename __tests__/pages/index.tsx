import React from "react";
import ReactDOM from "react-dom";
import TestUtils from "react-dom/test-utils";
import Home from "../../pages/index";

describe("Home", () => {
  it("renders the page", () => {
    const page = TestUtils.renderIntoDocument(<Home />);
    const body = ReactDOM.findDOMNode(page).textContent;
    expect(body).toContain("reusable, scalable, and quick");
  });
});
