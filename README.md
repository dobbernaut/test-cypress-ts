# Test with Cypress in Typescript

- [Test with Cypress in Typescript](#test-with-cypress-in-typescript)
  - [Installation](#installation)
    - [Adding node packages](#adding-node-packages)
  - [Prerequisites](#prerequisites)
    - [nvm](#nvm)
      - [For Linux](#for-linux)
      - [For Mac](#for-mac)
      - [For Windows](#for-windows)
  - [Setup](#setup)
  - [Test](#test)
    - [Watch Test](#watch-test)
    - [Test Report](#test-report)
  - [Lint and Format](#lint-and-format)
  - [Structure](#structure)
    - [Artifacts](#artifacts)
    - [Config](#config)
    - [Constants](#constants)
    - [Scripts](#scripts)
    - [Services](#services)
    - [Pages](#pages)
    - [Tests](#tests)

This is a sample testing project that runs on [node](https://nodejs.org/en/) and [yarn](https://yarnpkg.com/getting-started) for package management in [TypeScript](https://www.typescriptlang.org/docs/handbook/typescript-from-scratch.html).

It uses [Cypress](https://www.cypress.io/) for the test framework and for testing services and ui.

See [structure](#structure) for a description of the test project structure.

## Installation

Have [nvm](https://github.com/nvm-sh/nvm) installed to make it easier to manage node from your local environment. Yarn is also required to be installed with node and npm. Later versions of node should include yarn by default, if not, follow the install steps from the [prerequisites](#yarn).

```bash
nvm use
yarn ci
```

### Adding node packages

Using [yarn install](https://classic.yarnpkg.com/en/docs/cli/install) is used to install all dependencies from this package.

To [add](https://classic.yarnpkg.com/en/docs/cli/add), use `yarn add -D { package-name }` for adding new packages and;

`yarn upgrade { package-name }@{ version-number }` for [upgrading](https://classic.yarnpkg.com/lang/en/docs/cli/upgrade/) existing packages.

## Prerequisites

### [nvm](https://github.com/nvm-sh/nvm)

#### For Linux

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

# check nvm installed
nvm

# install node
nvm install 16.13.0

# install yarn globally
npm install -g yarn

# check yarn working properly
yarn --version
```

#### For Mac

```
brew install nvm
nvm install `cat .nvmrc`
nvm use `cat .nvmrc`
```

#### For Windows

Download the setup.zip file from the [latest release](https://github.com/coreybutler/nvm-windows/releases), extract and run setup as administrator.

**Run terminal as administrator to run and use nvm.**

```bash
# check nvm installed
nvm

# install node
nvm install 16.13.0

# install yarn globally
npm install -g yarn

# check yarn working properly
yarn --version
```

## Setup

To set up the project, install the node packages by running:

```bash
yarn ci
```

## Test

To run the tests:

```bash
yarn test
```

### Watch Test

To run the test with the cypress gui:

```bash
yarn test-watch
```

### Test Report

A test report will be generated after running the tests and will be saved in `/cypress/artifacts/reports`.

## Lint and Format

Formatting and linting of source files are enforced by [eslint](https://eslint.org/docs/about/) and [prettier](https://prettier.io/).

Most editors can integrate directly with these tools, so that files will be checked and formatted.

> On install of local dependencies `yarn install`, a git pre-commit hook will be added from [githooks](scripts/githooks/pre-commit).
> This will run steps similar to `yarn lint-pretty` for the files to be committed.

> **WARNING**: You can add **--no-verify** on your git commit to bypass the pre-commit hook... If you don't use it, that will be the end of it. I will not look for you, I will not pursue you... but if you do, I will look for you, I will find you... and I will kill you.

Before then, the IDE will highlight issues and errors based on rules that were set in [.eslintrc.json](.eslintrc.json) to be fixed, see eslint [rules](https://eslint.org/docs/rules/). Here are the npm scripts to lint and check formatting:

- `yarn lint-pretty` - see if there are linting issues and what files are not formatted correctly.
- `yarn lint-fix-pretty` - try to fix fixable eslint errors and re-format files in place according to the prettier rules.

## Structure

```
.
|-- test
|   |-- cypress
|       |-- artifacts
|           |-- reports
|               |--report_20420908_121213.html
|       |-- constants
|       |-- services
|           |-- sample-api-service
|               |-- api-endpoints.ts
|               |-- api-endpoints-helper.ts
|               |-- index.ts
|           |-- aws-utility-service
|               |-- aws.ts
|       |-- pages
|           |-- base.page.ts
|           |-- store
|               |-- catalog-search.page.ts
|               |-- store.page.ts
|       |-- integration
|           |-- scenario-group
|               |-- group-1
|                   |-- group-1.test.ts
|                   |-- group-1a.test.ts
|               |-- group-2
|                   |-- group-2.test.ts
|                   |-- group-2a.test.ts
|   |-- scripts
|-- package.json
|-- cypress.json
```

### Artifacts

- Have all test artifacts save here ie test result reports, error screenshots and logs.

### Config

- All test related configurations lives in **[cypress.json](./cypress.json)**. Do not confuse with configs for node packages and dependencies like eslint, mocha configs on the main directory.

### Constants

- Contains constants to use for test and function arguments.
- **Example** http response status codes.

### Scripts

- Any scripts we need to run adjacent to our test suite like hooks or running build pipelines.
- Exceptions could be when a build tool requires their scripts on a specific directory eg: github actions requires them to be on a .github directory from the main directory.

### Services

- All services under test and utilities for the test suite are here. If you need to get data from a web service or a configuration or secret from a key store, create a service folder for that resource or purpose here.
- **Example** if you want to read a json file from aws s3, create an aws utility folder here and have an s3.ts file that contains methods for getting files from s3 etc.

```
|-- services
|   |-- aws
|       |-- s3.ts
|   |-- kafka
|       |-- kafka.ts
|   |-- blog-post
|       |-- blog-post.ts
|       |-- blog-post-helper.ts
|       |-- index.ts
```

- **index.ts** - Use index to export all files from a directory so there's not much clutter from the import statements when importing a few classes or methods from files spread inside the directory eg:

```
|-- services
|   |-- blog-post
|       |-- blog-post.ts
|       |-- blog-post-helper.ts
|       |-- index.ts
```

```javascript
// blog-post.ts

export const blogPostFunction = () => {
  console.log('hello from blog post function');
};
```

```javascript
// blog-post-helper.ts

export const blogPostFunctionHelper = () => {
  console.log('hello from blog post function helper');
};
```

```javascript
// index.ts

export * from './blog-post';
export * from './blog-post-helper';
```

```javascript
// file.test.ts

import { blogPostFunction, blogPostFunctionHelper } from './services/blog-post';
```

### Pages

- Similar to services, all page objects are here. Have each pages represent the tree map of the application.
- Each page is composed of the element selectors and the page actions.

```
|-- pages
|   |-- sample.page.ts
```

```javascript
// sample.page.ts

export class SamplePage {
  private sampleButton = 'button[type="sample"]';
  /**
   * Do some sampling.
   *
   * @returns {Promise<number>}
   */
  public sample() {
    cy.get(this.#sampleButton).click();
  }
}
```

### Tests

- All tests for your application are in **[cypress/integation](cypress/integration/)**. Suffix the test files with .test.ts. Try grouping them by logical parts of the application or service.

```
|-- integration
|   |-- blog-posts
|       |-- add-update.test.ts
|       |-- delete.test.ts
|       |-- get.test.ts
```
