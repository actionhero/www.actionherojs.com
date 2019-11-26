import React from "react";
import ReactDOM from "react-dom";
import TestUtils from "react-dom/test-utils";

import GithubLatestVersion from "../../components/githubLatestVersion";

describe("GithubLatestVersion", () => {
  it("loads a version from GitHub mocked", () => {
    const page = TestUtils.renderIntoDocument(
      <GithubLatestVersion latestRelease="v1.2.3" />
    );

    const body = ReactDOM.findDOMNode(page).textContent;
    expect(body).toEqual("v1.2.3");
  });
});
