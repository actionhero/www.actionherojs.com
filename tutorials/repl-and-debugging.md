## Debugging and REPL

### Debugging

**Development Debugging / Typescript Debugging**

Actionhero makes it simple to use the node.js debugger, even when developing your project with Typescript. New Actionhero projects comes with a `npm run debug` script which will pass the proper arguments to [`ts-node-dev`](https://github.com/whitecolor/ts-node-dev), which we use to run our development mode server. For older Actionhero projects, to start a debugger with `ts-node-dev`, the command is:

```shell
ts-node-dev --transpile-only --no-deps --inspect -- ./src/server
```

Once your server is running in debug mode, you can then attach to it via a number of debuggers. The default debugger in Chrome can be used. Learn more here: https://nodejs.org/en/docs/guides/debugging-getting-started/.

You can also use the inspector built into your IDE. For example, VSCode is easy to use with the following `.vscode/launch.json` configuration:

```json
// from .vscode/launch.json

{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "attach",
      "name": "Actionhero Debugger",
      "protocol": "inspector",
      "port": 9229,
      "restart": true,
      "localRoot": "${workspaceFolder}",
      "remoteRoot": "."
    }
  ]
}
```

<img style="width:90%" src="/static/images/debugger.png" />

**Production Debugging**

Modern versions of node.js have built-in inspector capabilities.

Run Actionhero with node's `--inspect` flag, ie: `node ./dist/server.js --inspect start`

More info about the [node inspector](https://nodejs.org/en/docs/inspector) can be found on the official node.js website.

### REPL

```bash
actionhero console

Running "console" task
2015-11-14 17:48:01 - notice: *** starting actionhero ***
2015-11-14 17:48:01 - info: actionhero member 10.0.1.15 has joined the cluster
2015-11-14 17:48:01 - notice: pid: 38464
2015-11-14 17:48:01 - notice: server ID: 10.0.1.15
2015-11-14 17:48:01 - info: ensuring the existence of the chatRoom: defaultRoom
2015-11-14 17:48:01 - info: ensuring the existence of the chatRoom: anotherRoom
2015-11-14 17:48:01 - notice: environment: development
2015-11-14 17:48:01 - notice: *** Server Started @ 2015-11-14 17:48:01 ***
[ AH::development ] > api.id
‘10.0.1.15'

[ AH::development ] > Object.keys(api.actions.actions)
[ ‘cacheTest',
‘randomNumber',
‘showDocumentation',
‘sleepTest',
‘status' ]
```

Actionhero has a command-line interface called a REPL! This means you can spin up a new instance of Actionhero and manually call all the methods on the `api` namespace. This combined with the new RPC tools make this a powerful debugging and development tool. Running `actionhero console` will load up a version of Actionhero in your terminal where you have access to the `api` object. This version of the server will `boot`, `initialize`, and `start`, but will skip booting any `servers`. You will be connected to any databases per your initializers.

The REPL will:

- source `NODE_ENV` properly to load the config
- will connect to redis and load any user-defined initializers
- will load any plugins
- will **not** boot any servers

If you are familiar with rails, this is very similar to `rails console`
