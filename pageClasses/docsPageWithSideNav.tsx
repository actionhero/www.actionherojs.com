import { Component } from "react";
import DocSection from "../components/elements/docSection";

interface State {
  currentSection?: string;
  sections: { [key: string]: string };
  titleSection: { [key: string]: string };
  currentlyVisableSections?: Array<string>;
  links?: Array<any>;
}

export default class extends Component<{}, State> {
  waypointEnter(id, { previousPosition, currentPosition }) {
    if (!this.state.currentlyVisableSections) {
      // this.state.currentlyVisableSections = [];
      this.setState({ currentlyVisableSections: [] });
    }

    if (this.state.currentlyVisableSections.indexOf(id) < 0) {
      // going down
      if (previousPosition === "below" || !previousPosition) {
        this.state.currentlyVisableSections.push(id);
      }

      // going up
      if (previousPosition === "above") {
        // this.state.currentlyVisableSections = [id].concat(
        //   this.state.currentlyVisableSections
        // );
        this.setState({
          currentlyVisableSections: [id].concat(
            this.state.currentlyVisableSections
          )
        });
      }
    }
    this.highlightSection();
  }

  waypointExit(id, { previousPosition, currentPosition }) {
    if (this.state.currentlyVisableSections.indexOf(id)) {
      this.state.currentlyVisableSections.splice(
        this.state.currentlyVisableSections.indexOf(id),
        1
      );
    }
    this.highlightSection();
  }

  highlightSection() {
    const ids = Object.keys(this.state.sections);
    let i = 0;
    let id;
    while (i < ids.length) {
      id = ids[i];
      if (this.state.currentlyVisableSections.indexOf(id) >= 0) {
        return this.setState({ currentSection: id });
      }
      i++;
    }
  }

  section(id, content) {
    const sectionTitle = this.state.sections[id];

    return (
      <DocSection
        waypointEnter={this.waypointEnter}
        waypointExit={this.waypointExit}
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
