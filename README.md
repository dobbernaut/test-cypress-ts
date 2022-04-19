# Test with Cypress and Typescript

This is test suite for testing the [Blog Posts API](https://jsonplaceholder.typicode.com/guide/).

The tests runs on [Node](https://nodejs.org/en/) with [Cypress](https://www.cypress.io/).

# Prerequisites

You will need to have Node installed and able to run yarn commands. Commands shown below are run on bash.

# Setup

To set up the project, install the node packages by running:

```bash
yarn install
```

# Test

To run the tests:

```bash
yarn test
```

# Watch Test

To run the test with the cypress gui:

```bash
yarn test-watch
```

## Test Report

A test report will be generated after running the tests and will be saved in `/cypress/reports`.

A build pipeline is also available to run the tests here https://github.com/dobbernaut/test-cypress/actions.

And the latest test report is published here https://dobbernaut.github.io/test-cypress.
