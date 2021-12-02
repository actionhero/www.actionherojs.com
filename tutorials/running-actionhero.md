## Server.ts

Actionhero v22 removes the built-in `actionhero start` and `actionhero start cluster` commands, and adds a single `server.ts` entrypoint for your applications. We are also removing support for `boot.ts|js`.

For years, Actionhero has shipped with a robust runtime solution, handling graceful restarts, clustering, and more... however. as the node.js ecosystem has matured, the community has:

1. Created excellent process management tools, like [PM2](https://pm2.keymetrics.io/) which handle running and monitoring your processes, including integration with OS process managers
2. Moved to serverless/PASS/Docker deployments which prefer to mange the running of the application directly.

To better integrate with the above, Actionhero will now run from a new `server.ts` file, which will be required in your project @ `/src/server.ts`:

```ts
import { Process } from "actionhero";

// load any custom code, configure the env, as needed

async function main() {
  // create a new actionhero process
  const app = new Process();

  // handle unix signals and uncaught exceptions & rejections
  app.registerProcessSignals();

  // start the app!
  // you can pass custom configuration to the process as needed
  await app.start();
}

main();
```

When developing, there is no change to your workflow:

- `npm run dev` will continue to hot-compile your typescript code and run it.
- `npm run build` will compile your TS into JS
- `npm start` will now run your `./dist/server.js` instead of running `./node_modules/.bin/actoinhero`

This change should also make it easier to distribute your actionhero projects as you can modify a base config collection from this file, and you can use tools like [pkg](https://github.com/zeit/pkg) to compile your projects.

Now that we have this single entrypoint for your applications, we no longer need `boot.js|ts`. You can now directly run any setup code you need, modify the environment, etc directly in `server.ts`.

## The Actionhero Binary

Actionhero also includes an optional binary which can help you with lifecycle tasks, like generating a new project, actions, tasks, and more. The help for this binary is as follows:

```
$ (npx) actionhero help

Usage: actionhero [options] [command]

Options:
  -V, --version                   output the version number
  -h, --help                      display help for command

Commands:
  actions                         List the actions defined on this server
  console                         Start an interactive REPL session with the api object in-scope
  generate                        Generate a new Actionhero Project in an empty directory
  generate-action [options]       Generate a new Action
  generate-cli [options]          Generate a new cli command
  generate-initializer [options]  Generate a new Initializer
  generate-plugin                 Generate the structure of a new actionhero plugin in an empty directory
  generate-server [options]       Generate a new Server
  generate-task [options]         Generate a new Task
  task-enqueue [options]          Enqueue a defined Task into your actionhero cluster
  help [command]                  display help for command
```

## Environments and Config

By default, Actionhero will use the settings found in the `exports.default` blocks in `/config/`. However, you can set environment-specific overrides or changes. Actionhero inspects `process.env.NODE_ENV` to load up runtime configuration overrides from `exports.#{env}` blocks in your configuration files. This is the recommended way to have separate settings for staging and production.

The load order of configs is:

- default values in `/config`
- environment-specific values in `/config`

When using CLI commands, you can also set `process.env.ACTIONHERO_CONFIG_OVERRIDES`. In these cases, `ACTIONHERO_CONFIG_OVERRIDES` should be stringified JSON.

```ts
// from ./config/namespace.js
export const DEFAULT = {
  namespace: function () {
    return {
      enabled: true,
      safe: false,
    };
  },
};

export const production = {
  namespace: function () {
    return {
      safe: true,
    };
  },
};
```

In the example above, we are defining `config.namespace.enabled` and `config.namespace.safe`. In all environments (NODE_ENV) `config.namespace.enabled = true` Only in production would `config.namespace.safe = true`, it is `false` everywhere else.

## Signals

If your `server.ts` has used `app.registerProcessSignals()`, you should be ready to handle the most common unix signals:

```ts
  /**
   * Register listeners for process signals and uncaught exceptions & rejections.
   * Try to gracefully shut down when signaled to do so
   */
  registerProcessSignals() {
    function awaitHardStop() {
      const timeout = process.env.ACTIONHERO_SHUTDOWN_TIMEOUT
        ? parseInt(process.env.ACTIONHERO_SHUTDOWN_TIMEOUT)
        : 1000 * 30;
      return setTimeout(() => {
        console.error(
          `Process did not terminate within ${timeout}ms. Stopping now!`
        );
        process.nextTick(process.exit(1));
      }, timeout);
    }

    // handle errors & rejections
    process.on("uncaughtException", (error: Error) => {
      log(error.stack, "fatal");
      process.nextTick(process.exit(1));
    });

    process.on("unhandledRejection", (rejection: Error) => {
      log(rejection.stack, "fatal");
      process.nextTick(process.exit(1));
    });

    // handle signals
    process.on("SIGINT", async () => {
      log(`[ SIGNAL ] - SIGINT`, "notice");
      let timer = awaitHardStop();
      await this.stop();
      clearTimeout(timer);
    });

    process.on("SIGTERM", async () => {
      log(`[ SIGNAL ] - SIGTERM`, "notice");
      let timer = awaitHardStop();
      await this.stop();
      clearTimeout(timer);
    });

    process.on("SIGUSR2", async () => {
      log(`[ SIGNAL ] - SIGUSR2`, "notice");
      let timer = awaitHardStop();
      await this.restart();
      clearTimeout(timer);
    });
  }
```

You can of course add custom handlers as well to handle additional signals. Note that the environment variable `ACTIONHERO_SHUTDOWN_TIMEOUT` can be used to change how long the process waits to shut down gracefully.
