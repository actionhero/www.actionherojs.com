import React from "react";
import ReactDOM from "react-dom";
import TestUtils from "react-dom/test-utils";

import SolutionsGrid from "../../components/solutionsGrid";

describe("SolutionsGrid", () => {
  it("renders", () => {
    const page = TestUtils.renderIntoDocument(<SolutionsGrid />);
    const body = ReactDOM.findDOMNode(page).textContent;

    expect(body).toContain("Enterprise");
    expect(body).toContain("Apache-2 license");
  });
});
