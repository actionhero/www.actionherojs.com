## Debugging and REPL

### Debugging

Modern versions of node.js have built-in inspector capabilities.

Run Actionhero with node's `--inspect` flag, ie: `node ./node_modules/.bin/actionhero --inspect start`

More info about new [node inspector](https://nodejs.org/en/docs/inspector)

### REPL

```bash
actionhero console

Running "console" task
2015-11-14 17:48:01 - notice: *** starting actionhero ***
2015-11-14 17:48:01 - warning: running with fakeredis
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
