**For Actionhero v21.x.x**

## Why Typescript?

Actionhero is moving to [Typescript](https://www.typescriptlang.org).

Typescript is a language that `compiles` to javascript that makes the developer experience much nicer. It includes features like type checking, sharing interfaces and modules, and generally other "quality of life" features found in other languages to help you write better javascript code.

For Actionhero, that means we can now provide:

<h4>Type Hinting</h4>

<img style="width:90%" src='/static/images/tutorials/ts-actions.png' />

<h4>Module definitions</h4>

<img style="width:90%" src='/static/images/tutorials/ts-cache.png' />

<h4>Automatic Documentation directly from the code</h4>

Visit [docs.actionherojs.com](https://docs.actionherojs.com/) to see this live!
<img style="width:90%" src='/static/images/tutorials/docs.png' />

...and an overall more pleasant developer experience!

**Note**: You do not have to use Typescript to use Actionhero! Other than some layout changes to your project, you can continue to use Actionhero with regular javascript node.js projects. We will always ship compiled javascript files to NPM so that actionhero will still work with the most recent versions of Node.js. That said, the generators will favor Typescript projects moving forward, creating Typescript files

Actionhero will create and install everything you need for a pleasant typescript experience, including a `tsconfig` file, node's `@types` and development tools already linked into your `package.json`

---

## Upgrading Packages & Package.json

If you are upgrading an existing Actionhero project, the first thing to do is install the related packages and create new files:

```sh
npm install --save actionhero@next
npm install --save-dev @types/node prettier
npm uninstall standard
```

Update your scripts in `package.json`

```json
"scripts": {
  "dev": "ts-node-dev --transpile-only src/server.ts",
  "start": "node dist/server.js",
  "actionhero": "actionhero",
  "test": "jest",
  "pretest": "npm run build && npm run lint",
  "postinstall": "npm run build",
  "build": "tsc --declaration",
  "lint": "prettier --check src/*/** __test__/*/**",
  "pretty": "prettier --write src/*/** __test__/*/**"
},
```

and your `jest` config as well, also in `package.json`

```json
"jest": {
  "testEnvironment": "node",
  "transform": {
    "^.+\\.ts?$": "ts-jest"
  }
};
```

Remove the block about `standard` from your `package.json`. We are switching to [prettier](_https://prettier.io) because it has better typescript support.

Remember - you will be using `npm run dev` now when developing locally.

## Typescript Configuration

Typescript is managed by a `tsconfig.json` file at the root of your project. Create one now with the following content:

```json
{
  "compilerOptions": {
    "outDir": "./dist",
    "allowJs": true,
    "module": "commonjs",
    "target": "es2018"
  },
  "include": ["./src/**/*"]
}
```

## Project Structure

1. Create the `src` and `dist` directories
2. Move Actions, Tasks, Initializers, Servers, and Config into `src`
3. Create a new `modules` directory

Your project should now look like this:

```
|
|- src
|  - server.ts
|
|  - config
|    - (project settings)
|
|  - actions
|    -- (your actions)
|
|  - initializers
|    -- (any additional initializers you want)
|
|  - servers
|    -- (custom servers you may make)
|
|  - tasks
|    -- (your tasks)
|
|  - bin
|    -- (your custom CLI commands)
|
|- locales
|-- (translation files)
|
|- __tests__
|-- (tests for your API)
|
| - log
|-- (default location for logs)
|
|- node_modules
|-- (your modules, actionhero should be npm installed in here)
|
|- pids
|-- (pidfiles for your running servers)
|
|- public
|-- (your static assets to be served by /file)
|
readme.md
package.json
```

## Create server.ts

Create `server.ts` at /src/server.ts

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

## Update JS to TS syntax

Typescript uses the latest ES6-style syntax for importing and exporting things. You do not need to use babel to get this to work... Typescript does it for you!

- Rename all the files you just moved into `src` from `*.js` to `*.ts` files
  - A Helpful rename command for unix/osx computers to do this is -> `for f in _.js; do mv -- "$f" "${f%.js}.ts"; done`
- Change the imports from Require-style `const {thing} = require('thing')` to Import-style `import { thing } from 'thing'`
- Change all the exports from Module-style `module.exports = ...` or `exports.thing = ...` to ES6-style `export const thing = ...`

For example:

**OLD**

```js
const { Action } = require("actionhero");

exports.default = class MyAction extends Action {
  constructor() {
    super();
    this.name = "hello";
    this.description = "an actionhero action";
    this.outputExample = { message: "hello" };
  }

  async run() {
    return { message: "hello" };
  }
};
```

**NEW**

```ts
import { Action } from "actionhero";

export class MyAction extends Action {
  constructor() {
    super();
    this.name = "hello";
    this.description = "an actionhero action";
    this.outputExample = { message: "hello" };
  }

  async run() {
    response.message = "hello";
  }
}
```

## Config

The config module (it is a module now!) produces a static object with your configuration. This means that it can be required via `import {config} from 'actionhero'` at any point in your project's life cycle... you no longer need to wait for the initialization process to complete. However, this required some changes:

- The config methods no longer provide `api`, they provide `config`. Only other information from other config files is available to you, nothing from the rest of the application.

To upgrade your config:

- Change all of the exports, per above. When exporting the default config, use `DEFAULT` (all caps), ie: `export const DEFAULT = {{ ... }}`
- Update your paths in `config/general` , ie:

```json
paths: {
  action: [path.join(__dirname, "..", "actions")],
  task: [path.join(__dirname, "..", "tasks")],
  server: [path.join(__dirname, "..", "servers")],
  cli: [path.join(__dirname, "..", "bin")],
  initializer: [path.join(__dirname, "..", "initializers")],
  public: [path.join(process.cwd(), "public")],
  pid: [path.join(process.cwd(), "pids")],
  log: [path.join(process.cwd(), "log")],
  plugin: [path.join(process.cwd(), "node_modules")],
  locale: [path.join(process.cwd(), "locales")],
  test: [path.join(process.cwd(), "__tests__")],
  src: path.join(process.cwd(), "src"),
  dist: path.join(process.cwd(), "dist")
}
```

Don’t forget any paths you might have in other environments (like `test`)!

## Middleware and Sessions

Now with Typescript, you’ll get an error if you try to set arbitrary properties on the data object either within an `Action` or `Middleware`. We need a place to pass data from the middleware to the action.

```ts
// in an initializer
import { action } from "actionhero";
import { models } from "./../models"; // in your project

const authenticatedTeamMemberMiddleware = {
  name: "authenticated-team-member",
  global: false,
  priority: 1000,
  preProcessor: async (data) => {
    const { Team, TeamMember } = models;
    const sessionData = await api.session.load(data.connection);
    if (!sessionData) {
      throw new Error("Please log in to continue");
    } else if (
      !data.params.csrfToken ||
      data.params.csrfToken !== sessionData.csrfToken
    ) {
      throw new Error("CSRF error");
    } else {
      const teamMember = await TeamMember.findOne({
        where: { guid: sessionData.guid },
        include: Team,
      });
      data.session.data = sessionData; /// <--- HERE/
      data.session.teamMember = teamMember; /// <--- HERE/
    }
  },
};

action.addMiddleware(authenticatedTeamMemberMiddleware);
```

## Modules and Initializers

A number of things have been moved out of the API object to simplify their use by creating import/export modules you can require directly. In this way, you can get type hinting for various parts of Actionhero! This is a logical separation between `initializers` - code that executes when your server boots up and loads or connects vs `modules` which provide an API for you to use in your code.

For example, the `task` system has been split into 2 parts - both a `module` and `initializer`. The initializer continues to load your tasks into `api.tasks.tasks`, but doesn’t expose any methods for you to use. Now, when you want to enqueue a task, you call `task.enqueue()` you load it from the module via `import {task} from 'actionhero'`

The `initialize`, `start`, and `stop` methods of your initializers will now be passed `config`. This is helpful in the off chance you are modifying `config` and cannot rely on the static export of that information (this is rare).

**Removed from the API object and are now directly exported by Actionhero as modules:**

ie: `import { log, config } from 'actionhero'`

- log (the method to write to the logs)
- config (the config object hash)
- action (addMiddleware)
- task (addMiddleware)
- cache
- task
- i18n
- specHelper
- id (the server’s id)
- env (development, staging, production)

**The API object**

what remains on the API object are truly things about your API - actions, tasks, servers, initializers. And now these elements are very typesafe. **_You can no longer add and remove things randomly to the API object_**. This means that in your project, you should create imports and exports directly and share them with your actions and tasks.

**Polyfill**

A polyfill will be included in the first few releases of Actionhero in typescript to port the new exports back to the `api` object. A warning will be displayed.

A new config setting to enable or disable the polyfill is located at `config.general.legacyApiPolyfill`

## Config

- `config.general.id`: can no longer be set
- `config.i18n.determineConnectionLocale`: this method should be set on the `i18n` object exported by Actionhero.

## Chat

- `chatRoom.sanitizeMemberDetails()` is no longer overrideable/customizable.

## WatchFileAndAct

We have removed the custom module loaders for Actionhero's development mode, `watchFileAndAct`. Now that we need to transpile our applications from typescript to javascript, we can rely on some of the excellent packages already developed for this purpose. Newly generated Actionhero projects will make use of `node-ts-dev` (https://github.com/whitecolor/ts-node-dev) to boot and reload your projects when running in typescript mode.

Javascript projects can do a similar thing via the nodemon (https://nodemon.io/) package
