import React from "react";
import ReactDOM from "react-dom";
import TestUtils from "react-dom/test-utils";

import TutorialContainer from "../../../pages/tutorials/[name]";

const markdown = `
## Hello World
The core of Actionhero is the Action framework
`;

describe("Terms", () => {
  it("renders the page", () => {
    const page = TestUtils.renderIntoDocument(
      <TutorialContainer name="actions" markdown={markdown} />
    );
    const body = ReactDOM.findDOMNode(page).textContent;

    expect(body).toContain("Hello World");
    expect(body).toContain("The core of Actionhero is the Action framework");
  });
});
