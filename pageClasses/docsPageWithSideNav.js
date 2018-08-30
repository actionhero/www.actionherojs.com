import React from 'react'
import DocSection from './../components/elements/docSection.js'

export default class extends React.Component {
  waypointEnter (id, { previousPosition, currentPosition }) {
    if (!this.state.currentlyVisableSections) { this.state.currentlyVisableSections = [] }

    if (this.state.currentlyVisableSections.indexOf(id) < 0) {
      // going down
      if (previousPosition === 'below' || !previousPosition) {
        this.state.currentlyVisableSections.push(id)
      }

      // going up
      if (previousPosition === 'above') {
        this.state.currentlyVisableSections = [id].concat(this.state.currentlyVisableSections)
      }
    }
    this.highlightSection()
  }

  waypointExit (id, { previousPosition, currentPosition }) {
    if (this.state.currentlyVisableSections.indexOf(id >= 0)) {
      this.state.currentlyVisableSections.splice(this.state.currentlyVisableSections.indexOf(id), 1)
    }
    this.highlightSection()
  }

  highlightSection () {
    let ids = Object.keys(this.state.sections)
    let i = 0
    let id
    while (i < ids.length) {
      id = ids[i]
      if (this.state.currentlyVisableSections.indexOf(id) >= 0) {
        return this.setState({ currentSection: id })
      }
      i++
    }
  }

  section (id, content) {
    let sectionTitle = this.state.sections[id]

    return (
      <DocSection
        waypointEnter={this.waypointEnter}
        waypointExit={this.waypointExit}
        currentSection={this.state.currentSection}
        id={id}
        parent={this}
        title={sectionTitle}
      >
        {content}
      </DocSection>
    )
  }
}
