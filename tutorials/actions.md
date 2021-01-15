## Overview

```ts
// A simple Action

import { Action } from "actionhero";

export class RandomNumber extends Action {
  constructor() {
    super();
    this.name = "randomNumber";
    this.description = "I am an API method which will generate a random number";
    this.outputExample = { randomNumber: 0.1234 };
  }

  async run() {
    return { randomNumber: Math.random() };
  }
}
```

The core of Actionhero is the Action framework, and **actions** are the basic units of work. All connection types from all servers can use actions. This means that you only need to write an action once, and both HTTP clients and websocket clients can consume it!

The goal of an action is to read `data.params` (which are the arguments a connection provides), do work, and return a response (and `throw new Error()` when needed) values to build the response to the client.

You can create you own actions by placing them in a `./actions/` folder at the `src` directory of your application. You can use the generator with `actionhero generate action --name=myAction`

You can also define more than one action per file if you would like, and extend classes to share common methods and components (like input parsers).

```js
// A compound Action with Shared Inputs

import { Action } from "actionhero";

class ValidatedAction extends Action {
  constructor() {
    super();

    this.inputs = {
      email: {
        required: true,
        validator: this.emailValidator,
      },
      password: {
        required: true,
        validator: this.passwordValidator,
      },
    };
  }

  emailValidator(param) {
    if (param.indexOf("@") < 0) {
      throw new Error("that is not a valid email address");
    }
  }

  passwordValidator(param) {
    if (param.length <= 4) {
      throw new Error("password should be at least 4 letters long");
    }
  }
}

// the actions
export class UserAdd extends ValidatedAction {
  constructor() {
    super();
    this.name = "userAdd";
    this.description = "I add a user";
  }

  run(data) {
    // your code here
  }
}

export class UserDelete extends ValidatedAction {
  constructor() {
    super();
    this.name = "userDelete";
    this.description = "I delete a user";
  }

  run(data) {
    // your code here
  }
}
```

## Versions

Actionhero supports multiple versions of the same action. This will allow you to support actions/routes of the same name with upgraded functionality. To create actions of the same name with various versions, set the `version` parameter.

```js
import { Action } from "actionhero";

export class ActionVersion1 extends Action {
  constructor() {
    super();
    this.name = "randomNumber";
    this.description = "I am an API method which will generate a random number";
    this.outputExample = { randomNumber: 0.123 };
    this.version = 1;
  }

  async run({ connection }) {
    return { version: 1, randomNumber: Math.random() }
  }
};

exports class ActionVersion2 extends Action {
  constructor() {
    super();
    this.name = "randomNumber";
    this.description = "I am an API method which will generate a random number";
    this.outputExample = { randomNumber: 0.123 };
    this.version = 2;
  }

  async run({ connection }) {
    const number = Math.random();
    const responseString connection.localize([
      "Your random number is {{number}}", { number }
    ]);
    return { version: 2, randomNumber: responseString}
  }
};
```

- actions optionally have the `this.version` attribute, which defaults to `1`.
- a reserved param, `apiVersion` is used to directly specify the version of an action a client may request. You will likely want to check this in your `routes` file
- if a client doesn't specify an `apiVersion`, they will be directed to the highest numerical version of that action.

You can optionally create routes to handle your API versioning:

_As a note, if a client accessing Actionhero via routes does not provide an apiVersion and it is explicitly defined in the route, the highest number will not be assigned automatically, and will be seen as a routing error._

```js
exports.routes = {
  all: [
    // creates routes like \`/api/myAction/1/\` and \`/api/myAction/2/\`
    { path: "/myAction/:apiVersion", action: "myAction" },

    // creates routes like \`/api/v1/myAction/\` and \`/api/v2/myAction/\`
    { path: "/v:apiVersion/myAction", action: "myAction" },
  ],
};
```

We go into more detail about routes when discussing the [web server](/tutorials/web-server)

## Options

The complete set of options an action can have are:

```js
import { Action } from "actionhero";

class ValidatedAction extends Action {
  constructor () {
    super()

    // (required) the action's name (the \`exports\` key doesn't matter)
    this.name = 'randomNumber'

    // (required) the description
    this.description = 'I am an API method which will generate a random number'

    // (required) a hash of all the inputs this action will accept
    // any inputs provided to the action not in this hash will be stripped
    this.inputs = {
      multiplier: {
        required: false,
        validator: (param, connection, actionTemplate) => {
          if (param < 0) { throw new Error('must be > 0') }
        },
        formatter: (param, connection, actionTemplate) => {
          return parseInt(param)
        },
        default: (param, connection, actionTemplate) => {
          return 1
        },
      }
    },

    // any middleware to apply before/after this action
    // global middleware will be applied automatically
    // default []
    this.middleware = []

    // an example response
    // default: {}
    this.outputExample = { randomNumber: 123 }

    // you can choose to block certain servers from using this action
    // default: []
    this.blockedConnectionTypes = ['websocket']

    // how should this action be logged?
    // default: 'info'
    this.logLevel = 'warning'

    // (HTTP only) if the route for this action includes an extension (like .jpg), should the response MIME be adjusted to match?
    // default: true
    this.matchExtensionMimeType = true

    // should this action appear within \`api.documentation\`
    // default: true
    this.toDocument = true
  }
  
  // (required) the run method of the action
  async run (data) {
    const randomNumber = Math.random() * data.params.multiplier;
    return { randomNumber };
  }
}
```

## Inputs

```js
action.inputs = {
  // a simple input
  // defaults assume required = false
  minimalInput: {}

  // a complex input
  multiplier: {
    required: true,
    validator: (param, connection, actionTemplate) => {
      if (param < 0) { throw new Error('must be > 0') }
    },
    formatter: (param, connection, actionTemplate) => {
      return parseInt(param);
    },
    default: (param, connection, actionTemplate) => {
      return 1;
    },
  },

  // a schema input
  schemaInput: {
    required: true,
    default: {},
    schema: {
      nestedInput: {
        required: true,
        default: 1,
        validator: (param, connection, actionTemplate) => {
          if (param < 0) { throw new Error('must be > 0') }
        },
        formatter: (param, connection, actionTemplate) => {
          return parseInt(param);
        },
      },
      otherInput: {},
    }
  }
};
```

The properties of an input are:

- `required` (boolean)
  - Default: `false`
- `formatter = function(param, connection, actionTemplate)`
  - will return the new value of the param
  - Default: The parameter is not reformatted
- `default = function(param, connection, actionTemplate)`
  - will return the default value of the param
  - you can also have a static assignment for `default` father than a function, ie: `default: 123`
  - Default: Parameter has no default value
- `validator = function(param, connection, actionTemplate)`
  - should return true, null, or undefined (return nothing) if validation passed
  - should throw an error message if validation fails which will be returned to the client
  - Default: Parameter is always valid
- `schema` (object)
  - optional nested inputs definition
  - accept `object` similar to regular input
  - nested input also have properties: `required`, `formatter`, `default` and `validator`

You can define `config.general.missingParamChecks = [null, '', undefined]` to choose explicitly how you want un-set params to be handled in your actions. For example, if you want to allow explicit `null` values in a JSON payload but not `undefined`, you can now opt-in to that behavior. This is what `action.inputs.x.required = true` will check against.</p>

Since all properties of an input are optional, the smallest possible definition of an input is: `name : {}`. However, you should usually specify that an input is required (or not), ie: `{`name: {required: false}`}`.</p>

The methods `default`, `formatter`, and `validator` have the api object set as `this` within their scopes. This means that you can define common formatters within middleware and reference them in each action.</p>

The methods are applied in this order:</p>

- `default()`
- `formatter()`
- `validator()`
- `required()`

Here's an example...

```js
moneyInCents: {
  required:  true,
  default:   (p) => { return 0 },
  formatter: (p) => { return parseFloat(p) },
  validator: (p) => {
    if(isNaN(parseFloat(p)){ throw new Error('not a number') }
    if(p < 0){ throw new Error('money cannot be negative') }
  }
}
```

Formatters and Validators can also be named method names. For example, you might have an action like:

```js
inputs: {
  key: {
    required: true,
    formatter: 'api.formatter.uniqueKeyName'
  }
}
```

You can define `api.formatter.uniqueKeyName` elsewhere in your project.

Example schema input:

```js
inputs = {
  firstName: { required: true },
  lastName: { required: false },
  username: { required: true },
  address: {
    required: false,
    schema: {
      country: {
        required: true,
        default: "USA",
      },
      state: { required: false },
      city: {
        required: true,
        formatter: (val) => `City:\${val}`,
        validator: (val) => val.length > 10,
      },
    },
  },
};
```

### Reserved Input Names

There are a small number of input names that are reserved by Actionhero, enumerated within `api.params.globalSafeParams` which should not be used as input keys in your Actions. These are used at the system or server level to help with routing and formatting.

```ts
api.params.globalSafeParams = [
  "file",
  "apiVersion",
  "callback",
  "action",
  "messageId",
];
```

## Extending the Action class

There may be times that you want add properties to the Action class. A common reason for this is to work with middleware, adding a property to your action that controls how authentication might work, etc. With typescript, adding arbitrary properties to class (interface) will produce an error, as we don't have a type definition for your new property. The way to overcome this is to extend the Action class with your new property.

The example below creates a new class, `AuthenticatedAction` which adds a boolean `authenticated` to the action. A global action middleware then checks if the action should be `authenticated`, and if it does, it checks for a password.

```ts
import { Action, action } from "actionhero";

abstract class AuthenticatedAction extends Action {
  /**
   * does this action require the user to be logged in?
   */
  authenticated: boolean;
}

action.addMiddleware({
  name: "Authentication Middleware",
  global: true,
  preProcessor({ params, actionTemplate }) {
    // we have access to the action's template here, which now will contain "authenticated: boolean"
    if (actionTemplate.authenticated) {
      if (params.password !== "thePassw0rd") {
        // it the request does not include the param "password=thePassw0rd", the action will not be run
        // this is bad authentication strategy, but hopefully serves as a good example
        throw new Error("bad password");
      }
    }
  },
});

export class ShowDashboard extends AuthenticatedAction {
  constructor() {
    super();
    this.name = "showDashboard";
    this.description = "I return the authenticated user's dashboard data";
    // without the AutheticatedAction class, this would throw an error, as "authenticated" is not a property of the class "Action"
    this.authenticated = true;
  }

  async run() {
    // your logic would be here...
    return { dashboard: true };
  }
}

/**
 * ❯ curl "http://localhost:8080/api/showDashboard"
 * { "error": "bad password" }
 *
 * ❯ curl "http://localhost:8080/api/showDashboard?password=thePassw0rd"
 * { "dashboard": true }
 */
```

## The Data Object

The `data` object passed into your action captures the state of the connection at the time the action was started. Middleware preProcessors have already fired, and input formatting and validation has occurred. Here are the properties of the `data` object.

```js
data = {
  connection: connection,
  action: "randomNumber",
  toProcess: true,
  toRender: true,
  messageId: 123,
  params: { action: "randomNumber", apiVersion: 1 },
  actionStartTime: 123,
  session: {},
};
```

The goal of most actions is to do work and then modify the value of `data.response`, which will eventually be sent down to the client.

You can also modify properties of the connection by accessing `data.connection`, IE changing the response header for a HTTP request.

If you don't want your action to respond to the client, or you have already sent data to the client (perhaps you already rendered a file to them or sent an error HTTP header), you can set `data.toRender = false;`

If you are certain that your action is only going to be handled by a web server, then a convenience method has been provided to you via `data.connection.setHeader()`. This function is a proxy to the <a href='https://nodejs.org/api/http.html#http_response_setheader_name_value'>Node HTTP Response setHeader</a> function and allows you to set response headers without having to drill into the `data.connection.rawConnection` object. Please be aware, the `data.connection.setHeader()` function will only be available if your action is being handled by a web server. Other server types will throw an exception. See [Servers: Customizing the Connection](/tutorial/servers) for more details.

Similarly to the above, the web server also exposes `data.connection.setStatusCode()`, again only for actions in use by the web server. This can be used as a helper to set the HTTP responses' status code, ie: 404, 200, etc.

Finally, if your action is again only for the web server, you can send a string or buffer as a file response with `data.connection.pipe(buffer, headers)`. You will still need to set `data.toRender = false` in your action to avoid double-sending a response to the client.

## Middleware

You can create middleware which would apply to the connection both before and after an action. Middleware can be either global (applied to all actions) or local, specified in each action via `action.middleware = []`. Supply the `names` of any middleware you want to use.

You can [learn more about middleware here](/tutorials/middleware).

## Running Actions Programmatically

From time to time, you may want to run an Action programmatically in your codebase. Perhaps you want to combine the responses of 2 Actions into one, or you may want to run an Action via a Task. You can with `action.run()`, introduced in Actionhero v24.0.1.

```ts
import { action } from "actionhero";

const nameOfAction = "myAction";
const actionVersion = "v1"; // or leave null to use the latest version
const params = { key: "value" }; // the params which would be parsed from the client
const connectionProperties = {}; // special properties on the connection which may be expected by the action or middleware.  Perhaps "session.id" or "authenticated = true" depending on your middleware

const response = await action.run(
  nameOfAction,
  actionVersion,
  params,
  connectionProperties
);
```

So, if you wanted an Action which combines the responses of 2 other Actions:

```ts
import { Action, action } from "actionhero";

export class RecursiveAction extends Action {
  constructor() {
    super();
    this.name = "recursiveAction";
    this.description = "I am an action that runs 2 other actions";
    this.outputExample = {};
  }

  async run() {
    const localResponse = { local: true };
    const firstActionResponse = await action.run("otherAction");
    const secondActionResponse = await action.run("anotherAction");
    return Object.assign(
      firstActionResponse,
      secondActionResponse,
      localResponse
    );
  }
}
```

## Notes

- Actions' run methods are async, and have `data` as their only argument. Completing an action is as simple returning from the method.
- If you throw an error, be sure that it is a `new Error()` object, and not a string. Thrown errors will automatically be sent to the client as the `error` key in the response object. Also, throw Errors are processed at `config/errors.js` in `genericError(data, error)`. Here you can check your error add to the response (`requestIds`, status codes, etc.)
- The metadata `outputExample` is used in reflexive and self-documenting actions in the API, an is used by the Swagger action.
- You can limit how many actions a persistent client (websocket, tcp, etc) can have pending at once with `config.general.simultaneousActions`
- `actions.inputs` are used for both documentation and for building the whitelist of allowed parameters the API will accept. Client params not included in these whitelists will be ignored for security. If you wish to disable the whitelisting you can use the flag at `config.general.disableParamScrubbing`. Note that [Middleware](tutorial-middleware.html) preProcessors will always have access to all params pre-scrubbing.
- `matchExtensionMimeType` is currently only used by the `web` server, and it indicates that if this action is successfully called by a client with `connection.extension` set, the headers of the response should be changed to match that file type. This is useful when creating actions that download files.
- Actionhero strives to keep the `data.connection` object uniform among various client types, and more importantly, present `data.params` in a homogeneous way to actions. You can inspect `data.connection.type` to learn more about the connection. The gory details of the connection (which vary on its type) are stored in `data.connection.rawConnection` which will contain the websocket, tcp connection, etc. For web clients, `{`data.connection.rawConnection = {req: req, res: res}`}` for example.

[You can learn more about handling HTTP verbs and file uploads here](/tutorials/web-server) and [Web-Socket Clients](/tutorials/websocket-server).
