import { Component } from "react";
import DocSection from "../components/elements/docSection";

interface State {
  currentSection?: string;
  sections: { [key: string]: string };
  titleSection: { [key: string]: string };
  currentlyVisableSections?: { [key: string]: boolean };
  links?: Array<any>;
}

export default class extends Component<{}, State> {
  waypointEnter(id, { previousPosition, currentPosition }) {
    if (!this.state.currentlyVisableSections) {
      this.setState({ currentlyVisableSections: {} });
    }

    // going down
    if (previousPosition === "below" || !previousPosition) {
      this.state.currentlyVisableSections[id] = true;
    }

    // going up
    if (previousPosition === "above") {
      this.state.currentlyVisableSections[id] = true;
    }

    this.highlightSection();
  }

  waypointExit(id, { previousPosition, currentPosition }) {
    delete this.state.currentlyVisableSections[id];

    this.highlightSection();
  }

  highlightSection() {
    const ids = Object.keys(this.state.sections);
    let i = 0;
    let id;
    while (i < ids.length) {
      id = ids[i];
      if (this.state.currentlyVisableSections[id]) {
        return this.setState({ currentSection: id });
      }
      i++;
    }
  }

  section(id, content) {
    const sectionTitle = this.state.sections[id];

    return (
      <DocSection
        waypointEnter={(id, args) => this.waypointEnter(id, args)}
        waypointExit={(id, args) => this.waypointExit(id, args)}
        // currentSection={this.state.currentSection}
        id={id}
        parent={this}
        title={sectionTitle}
      >
        {content}
      </DocSection>
    );
  }
}
