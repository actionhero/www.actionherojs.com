## Overview

Actionhero provides test helpers so that you may try your actions and tasks within a headless environment. We do this by including a `specHelper` initializer which creates a server, `testServer` when running within the test environment. Via the `testServer`, you can easily call actions or tasks without making a real request.

We have chosen [jest](https://facebook.github.io/jest) as our test framework which is included as dependencies within all new projects generated with `Actionhero generate`. You do not need to use these testing tools, but an example will be provided which makes use of them.

You also don't need to use these test helpers, and you may want to make a real http or websocket request to test something specific. If this is the case, you can [check out how Actionhero tests its own servers](https://github.com/Actionhero/Actionhero/tree/master/test/servers) for examples.

## Getting Started

```js
// package.json from a new Actionhero project with \`jest\`included

{
  "author": "YOU <YOU@example.com>",
  "name": "my_actionhero_project",
  "description": "my Actionhero project",
  "version": "0.1.0",
  "engines": {
    "node": ">=8.0.0"
  },
  "dependencies": {

    "Actionhero": "21.x.x",
    "ws": "latest",
    "ioredis": "latest",
    "winston": "latest"
  },
  "devDependencies": {
    "@types/node": "latest",
    "@types/jest": "latest",
    "jest": "latest",
    "prettier": "latest",
    "ts-jest": "latest",
    "ts-node-dev": "latest",
    "typescript": "latest"
  },
  "scripts": {
    "dev": "ts-node-dev --transpile-only ./node_modules/.bin/Actionhero start",
    "start": "Actionhero start",
    "Actionhero": "Actionhero",
    "test": "jest",
    "pretest": "npm run build && npm run lint",
    "build": "tsc --declaration",
    "lint": "prettier --check src/*/** __test__/*/**",
    "pretty": "prettier --write src/*/** __test__/*/**"
  },
  "jest": {
    "testEnvironment": "node",
    "transform": {
      "^.+\\.ts?$": "ts-jest"
    }
  }
}
```

To run a jest test suite, you invoke the jest binary, `./node_modules/.bin/jest` or `npx jest`. This will tell jest to look in your `./__tests__` folder and run any tests that it can find. There are ways to change the test folder location, only run specific tests, change the reporting format and more which you can learn about on [Jest's website](https://facebook.github.io/jest). We assume that you have `jest` installed to your project by listing it in your `package.json`. If you used `Actionhero generate` to create your project, this should already be configured for you.

The majority of the time, you'll be testing actions and other methods you have written, so you'll need to "run" an Actionhero server as part of your test suite. Many times you'll want to have Actionhero behave in a slightly unique way while testing (perhaps connect to a special database, don't log, etc). To do this, you can change the behavior of the config files for the `test` environment. Here is how we tell Actionhero [not to write any logs when testing](https://github.com/Actionhero/Actionhero/blob/master/config/logger.js#L48-L54). Note the test-specific configuration overrides the defaults. Jest will automatically set `NODE_ENV=test` for you.

Actionhero comes with a `specHelper` to make it easier to test tasks and actions. This specHelper is a special [server](/docs/core/#servers) which can check things without needing to make an HTTP, websocket, etc request. If you need to check the true behavior of a server (perhaps how the router works for an HTTP request), you should make a real HTTP request in your test suite, using something like the [request](https://github.com/request/request) library ([example](https://github.com/Actionhero/Actionhero/blob/master/test/servers/web.js#L178-L184)).

## Example Test

Say you had an action that was supposed to respond with a `randomNumber`, and you wanted to write a test for it.

```js
// from __tests__/actions/randomNumber.ts
import { Process, specHelper } from "Actionhero";

const Actionhero = new Process();

describe("Action", () => {
  describe("randomNumber", () => {
    beforeAll(async () => {
      await Actionhero.start();
    });

    afterAll(async () => {
      await Actionhero.stop();
    });

    let firstNumber = null;

    test("generates random numbers", async () => {
      const { randomNumber } = await specHelper.runAction("randomNumber");
      expect(randomNumber).toBeGreaterThan(0);
      expect(randomNumber).toBeLessThan(1);
      firstNumber = randomNumber;
    });

    test("is unique / random", async () => {
      const { randomNumber } = await specHelper.runAction("randomNumber");
      expect(randomNumber).toBeGreaterThan(0);
      expect(randomNumber).toBeLessThan(1);
      expect(randomNumber).not.toEqual(firstNumber);
    });
  });
});
```

More details on the specHelper methods [can be found here](https://docs.actionherojs.com/modules/spechelper.html). Methods include:

- `buildConnection`
- `findEnqueuedTasks`
- `getStaticFile`
- `runAction`
- `runFullTask`
- `runTask`

If you want to see fuller example of how to create an integration test within Actionhero, please [check out the tutorial](https://github.com/Actionhero/Actionhero-tutorial#testing)
