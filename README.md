# www.actionherojs.com

[![Build Status](https://travis-ci.org/actionhero/www.actionherojs.com.svg?branch=master)](https://travis-ci.org/actionhero/www.actionherojs.com)

## Install
This is a [React Project](https://facebook.github.io/react/) utilizing [next.js](https://github.com/zeit/next.js/) and [react-bootstrap](https://react-bootstrap.github.io/)

- `npm install`

## Running in Development
- `npm run dev`

## Building for Production

- `npm run build`
- `npm run serve`

The master branch of this repository is automatically deployed by Travis.ci on a successful test run to www.actionherojs.com.  

## Linting

We use [standard.js](https://standardjs.com) to manage our lint rules.  We run `standard` as part of our test suite, and your contributions must pass.  Standard is *very* opinionated and inflexible such that we cannot inject our own opinions.  There are no eslint/jshint files to manage in this project.  

## CSS
- we use a default boostrap CSS file
- all components provide thier own CSS inline

## TODO

### Homepage Design
- button click states (coming soon)
  - buttons should have no hover state (undeline)
- button link text should be white
- remove 'latest release; no italics' (roboto 300 weight)
  - have more equal padding on top and bottom (30px)
- spacing between header and 'section tagline' should be 40px
  - check font heading size
   - section heading max-width should be 480px
- bring back the blue grid lines
- company logos need more padding, and to be centered properly; padding isn't maintinaed
- solutions: titles should have top and bottom spacing symetric (50px)
- footer: 3 cols, 50px margin from the right?
