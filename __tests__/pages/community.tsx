import React from "react";
import ReactDOM from "react-dom";
import TestUtils from "react-dom/test-utils";

import Community from "../../pages/community";

describe("Community", () => {
  it("renders the page", () => {
    const releases = [
      {
        published_at: "Thu Apr 27 2017 15:43:47 GMT-0700 (PDT)",
        tag_name: "v0.0.1",
        name: "first!",
        html_url: "http://go.away",
      },
    ];

    const page = TestUtils.renderIntoDocument(
      <Community releases={releases} />,
    );
    const body = ReactDOM.findDOMNode(page).textContent;

    expect(body).toContain("Team Up");
    expect(body).toContain("GitHub");
    expect(body).toContain("Slack");
    expect(body).toContain("Recent Releases");

    expect(body).toContain("first!");
  });

  it("renders the errror, should there be one", () => {
    const releases = [];
    const error = "Oh No!";

    const page = TestUtils.renderIntoDocument(
      <Community releases={releases} error={error} />,
    );
    const body = ReactDOM.findDOMNode(page).textContent;

    expect(body).toContain(error);
  });
});
