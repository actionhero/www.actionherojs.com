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

.h1, .h2, .h3, h1, h2, h3 {
    margin-top: 20px;
    margin-bottom: 10px;
    font-family: bebas neue;
    letter-spacing: 2px;
    font-size: 36px;
}

.h2, h2 {
    font-size: 30px;
    color: #3B5D72 ;
}

.text-info {
color: #31708f ;
line-height: 2.5em;
}

.form-control:focus {
border-color: #6E8898 ;
outline: 0;
color: black;
}

.form-control {
display: block;
width: 100%;
height: 40px;
padding: 10px 20px;
font-size: 14px;
line-height: 1.42857143;
background-color: #fff;
background-image: none;
border: 2px solid #2F5266 ;
border-radius: 100px;
font-family: roboto;
font-weight: 300;
color: #6E8898 ;
}

---

feature boxes:

p {
font-family: roboto;
font-weight: 300;
line-height: 2em;
}

[4:38]
.col-md-4 {
width: 33.33333333%;
padding: 0 3em;
}

## Homepage
- update style per above
- button click states (coming soon)
  - buttons should have no hover state (undeline)
- button link text should be white
- remove 'latest release; no italics' (roboto 300 weight)
  - have more equal padding on top and bottom (30px)
- tagline shold all be lowercase
- buttons are too wide (width should be 157px), with 30px between them.  buttons can be taller though.
- all titles should have Bebus New font, and check color and size
- spacing between header and 'section tagline' should be 40px
  - check font heading size
   - section heading max-width should be 480px
- color sections have 100px padding before content
- bring back the blue grid lines
- code samples popovers do not need a header 'code sample'
  - popover box shoul have more margin (30px); don't round corners
- company logos need more padding, and to be cented properly; padding isn't maintinaed
- solutions: titles should have top and bottom spacing symetric (50px)
- right nav should not overflow solutions/foooter
- footer: 3 cols, 50px margin from the right?


## other pages:
- navbar too high (should be 60px)
- highlighted page should white underline, rather than red
- docs pages have other font
