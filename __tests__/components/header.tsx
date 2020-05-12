import React from "react";
import ReactDOM from "react-dom";
import TestUtils from "react-dom/test-utils";

import Header from "../../components/header";

describe("Header", () => {
  it("renders the nav", () => {
    const page = TestUtils.renderIntoDocument(<Header />);
    const body = ReactDOM.findDOMNode(page).textContent;

    expect(body).toContain("Get Started");
    expect(body).toContain("Docs");
    expect(body).toContain("Shop");
    expect(body).toContain("Community");
    expect(body).toContain("Download");
  });
});
