# www.actionherojs.com

![Test](https://github.com/actionhero/www.actionherojs.com/workflows/Test/badge.svg)

## Install

This is a [React Project](https://facebook.github.io/react/) utilizing [next.js](https://github.com/zeit/next.js/) and [react-bootstrap](https://react-bootstrap.github.io/)

- `npm install`

## Running in Development

- `npm run dev`

## Building for Production

(see `./bin/deploy`)

The main branch of this repository is automatically built and pushed to the `gh-pages` branch of this project by Circle.CI on a successful test run. We statically host this project on www.actionherojs.com via github pages.

## Linting

We use [prettier](https://prettier.io/) to manage our lint rules. We run `prettier --check` as part of our test suite, and your contributions must pass. Prettier is _very_ opinionated and inflexible such that we cannot inject our own opinions. There are no eslint/jshint files to manage in this project.

## CSS

- we use a default boostrap CSS file
- all components provide thier own CSS inline

## Sponsors

Thank you to [Vercel](https://vercel.com?utm_source=actionhero&utm_campaign=oss) for sponsoring Actionhero and providing hosting for this website!
