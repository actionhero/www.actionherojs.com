## Overview

Initializers are the main way you expand your Actionhero server. This is where you connect to databases, modify the global `api` object with new classes and helper methods, and set up your [middleware](/tutorials/middleware).

Initializers run in 3 phases coinciding with the lifecycles of the application: `initialize`, `start`, and `stop`. All `initialize` steps happen before all `start` steps. Initializers can define both methods and priorities which will happen at each phase of the server's lifecycle.

System initializers (like setting up redis and the cache) have priority levels in the 100 to 1000 level range. Application initializers should run with a priority level of over 1000 to use methods created by Actionhero, as they might not exist before then. You can of course set priority levels lower than 1000 in your application (perhaps you connect to a database). The priority level split is purely convention.

In general, `initialize()` methods should create prototypes and new objects, and `start()` should boot things or connect to external resources.

## Format

```ts
// initializers/myInitializer.ts

import { Initializer, api, log } from "actionhero";

export class myInitializer extends Initializer {
  constructor() {
    super();
    this.name = "myInitializer";
    this.loadPriority = 1000;
    this.startPriority = 1000;
    this.stopPriority = 1000;
  }

  async initialize() {
    api.StuffInit = {
      doAThing: async () => {},
      stopStuff: async () => {},
    };

    log("I initialized", "debug", this.name);
  }

  async start() {
    await api.StuffInit.startStuff();
    log("I started", "debug", this.name);
  }

  async stop() {
    await api.StuffInit.stopStuff();
    log("I stopped", "debug", this.name);
  }
}
```

To use a custom initializer, create a `initializers` directory in your project. Export a class that extends `actionhero.Initializer` and implements at least one of `start`, `stop` or `initialize` and specify your priorities.

You can generate a file of this type with `actionhero generate initializer --name=stuffInit`

## Errors

You can throw an error at any step in the initializer. Doing so will cause Actionhero to log the error and stop the server. For example, you might throw an error if you cannot connect to an external service at boot, [like a database](https://github.com/Actionhero/ah-sequelize-plugin/blob/master/initializers/sequelize.js).
