import React from 'react'
import { Row, Col } from 'react-bootstrap'

import Page from './page.js'

import SolutionsGrid from './../solutionsGrid.js'

export default class extends React.Component {
  render () {
    let title = this.props.navigationTitle || 'Navigation'

    return (
      <Page>
        <Row>
          <Col md={9}>
            <div>
              { this.props.children }
            </div>
          </Col>

          <Col md={3} className='hidden-sm hidden-xs'>
            <div style={{position: 'fixed'}} >
              <h3>{title}</h3>

              <ol>
                {
                  this.props.sideNav.map((e) => {
                    return (
                      <li key={e.key}>
                        <a href={e.key} className='text-info'>{e.label}</a>
                        {
                          e.children
                          ? <ul>
                            {
                              e.children.map((c) => {
                                return (
                                  <li key={`${e.key}-${c.key}`}>
                                    <a href={c.key} className='text-warning'>{c.label}</a>
                                  </li>
                                )
                              })
                            }
                          </ul>
                          : null
                        }
                      </li>
                    )
                  })
                }
              </ol>
            </div>
          </Col>
        </Row>

        <Row>
          <Col md={12}>
            <SolutionsGrid />
          </Col>
        </Row>
      </Page>
    )
  }
}
