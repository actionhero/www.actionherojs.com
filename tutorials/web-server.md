## Overview

The web server exposes actions and files over http or https. You can visit the API in a browser, Curl, etc. `{url}/actionName` or `{url}/api/{actionName}` is how you would access an action. For example, using the default ports in `/config/web.ts` you could reach the status action with both `http://127.0.0.1:8080/status`.

HTTP responses are always JSON and follow the following format:

```ts
{
  hello: "world",
  serverInformation: {
    serverName: "Actionhero API",
    apiVersion: 1,
    requestDuration: 14
  },
  requestorInformation: {
    remoteAddress: "127.0.0.1",
    RequestsRemaining: 989,
    receivedParams: {
      action: ""
    }
  }
}
```

## Full HTTP Example

```
> curl 'localhost:8080/api/status' -v | python -mjson.tool
* About to connect() to localhost port 8080 (#0)
*   Trying 127.0.0.1...
* connected
* Connected to localhost (127.0.0.1) port 8080 (#0)
> GET /api/status HTTP/1.1
> User-Agent: curl/7.24.0 (x86_64-apple-darwin12.0) libcurl/7.24.0 OpenSSL/0.9.8r zlib/1.2.5
> Host: localhost:8080
> Accept: */*
>
< HTTP/1.1 200 OK
< Content-Type: application/json
< X-Powered-By: Actionhero API
< Date: Sun, 29 Jul 2012 23:25:53 GMT
< Connection: keep-alive
< Transfer-Encoding: chunked
<
{ [data not shown]
100   741    0   741    0     0   177k      0 --:--:-- --:--:-- --:--:--  361k
* Connection #0 to host localhost left intact
* Closing connection #0
{
    "requestorInformation": {
        "receivedParams": {
            "action": "status",
        },
        "remoteAddress": "127.0.0.1"
    },
    "serverInformation": {
        "apiVersion": "3.0.0",
        "currentTime": 1343604353551,
        "requestDuration": 1,
        "serverName": "Actionhero API"
    },
    "stats":
        "id": "10.0.1.12:8080:4443:5000",
        "uptimeSeconds": 34.163
    }
}
```

- You can provide the `?callback=myFunc` param to initiate a JSONp response which will wrap the returned JSON in your callback `function`. The mime type of the response will change from JSON to Javascript.
- If everything went OK with your request, no error attribute will be set on the response, otherwise, you should see either a string or hash error response within your action
- To build the response for "hello" above, the action would have returned `{hello: 'world'}` in an action.

## Config Options

[`/config/web.ts`](https://github.com/actionhero/actionhero/blob/main/src/config/web.ts) contains the settings for the web server

Note that if you wish to create a secure (https) server, you will be required to complete the serverOptions hash with at least a cert and a keyfile:

```js
config.web.serverOptions: {
  key: fs.readFileSync('certs/server-key.pem'),
  cert: fs.readFileSync('certs/server-cert.pem')
}
```

## The Connection Object

```ts
{ id: '3e55b464fd34708eba26f609f44481a120e094a8-a6dfb60b-9562-4cc0-9d92-bc6cc1b622ba',
  connectedAt: 1447554153233,
  type: 'web',
  rawConnection:
   {
     req: {},
     res: {},
     params: { query: {} },
     method: 'GET',
     cookies: {},
     responseHeaders: [ [Object], [Object], [Object], [Object], [Object], [Object] ],
     responseHttpCode: 200,
     parsedURL:
      Url {},
  remotePort: 57259,
  remoteIP: '127.0.0.1',
  error: null,
  fingerprint: '3e55b464fd34708eba26f609f44481a120e094a8',
  rooms: [],
  params: { action: 'randomNumber', apiVersion: 1 },
  pendingActions: 1,
  totalActions: 1,
  messageId: 0,
  canChat: false,
  sendMessage: [Function],
  sendFile: [Function]
}
```

when inspecting `data.connection` in actions or action middleware from web client, a few additional elements are added for convenience:

- `connection.rawConnection.responseHeaders`: array of headers which can be built up in the action. Headers will be made unique, and latest header will be used (except setting cookies)
- `connection.rawConnection.method`: A string, GET, POST, etc
- `connection.rawConnection.cookies`: Hash representation of the connection's cookies
- `connection.rawConnection.responseHttpCode`: the status code to be rendered to the user. Defaults to 200
- `connection.type` for a HTTP client is "web"
- `connection.rawConnection.params.body` will contain un-filtered form data
- `connection.rawConnection.params.files` will contain un-filtered form data
- `connection.extension`. If are using a route to access an action, and the request path ends in a file extension (IE: `server.com/action/option.jpg`), the extension will be available. Depending on the server's options, this extension may also be used to modify the response mime-type by configuring `matchExtensionMimeType` within each action.

## Sending Files

Actionhero can also serve up flat files. Actionhero will not cache these files and each request to `file` will re-read the file from disk (like the nginx web server).

If the file you want to send is within your `/public` directory you can use:

```ts
async run (data) {
  data.connection.sendFile("/path/to/file.mp3");
  data.toRender = false;
}
```

Otherwise, you'll need to pipe the file and set headers directly:

```ts
async run (data) {
  const file = await File.findOne({where: {id: data.params.fileId}})
  if (file) {
    const fileBuffer = await fs.readFile(file.localPath, 'binary')
    data.connection.rawConnection.res.writeHead(200, {
      'Content-Disposition': `attachment; filename=${file.name}`,
      'Content-Type': file.mimeType,
      'Content-Length': Buffer.byteLength(fileBuffer)
    })
    data.connection.rawConnection.res.write(fileBuffer)
    data.connection.rawConnection.res.end()
    data.toRender = false
  } else {
    throw new Error(`File with id ${data.params.fileId} not found`)
  }
}
```

There are helpers you can use in your actions to send files:

- `/public` and `/api` are routes which expose the directories of those types. These top level path can be configured in `/config/web.ts` with `config.web.urlPathForActions` and `config.web.urlPathForFiles`.
- the root of the web server "/" can be toggled to serve the content between /file or /api actions per your needs `config.web.rootEndpointType`. The default is `api`.
- Actionhero will serve up flat files (html, images, etc) as well from your ./public folder. This is accomplished via the `file` route as described above. `http://{baseUrl}/public/{pathToFile}` is equivalent to `http://{baseUrl}/file/{pathToFile}`.
- Errors will result in a 404 (file not found) with a message you can customize.
- Proper mime-type headers will be set when possible via the `mime` package.

See the [file server](tutorials/file-server) page for more documentation

## Routes

For web clients, you can define an optional RESTful mapping to help route requests to actions. If the client doesn't specify an action via a param, and the base route isn't a named action, the action will attempt to be discerned from this `config/routes.js` file.

This variables in play here are:

- `config.web.urlPathForActions`
- `config.web.rootEndpointType`
- and of course the content of `config/routes.js`

Say you have an action called ‘status' (like in a freshly generated Actionhero project). Lets start with Actionhero's default config:

```ts
config.web.urlPathForActions = "api";
config.web.urlPathForFiles = "public";
config.web.rootEndpointType = "file";
```

```ts
export const DEFAULT = {
  routes: () => {
    return {
      get: [
        { path: ‘/stuff/statusPage', action: 'status' }
      ]
    };
  };
};
```

If the `config.web.rootEndpointType` is `"file"` which means that the routes you are making are active only under the `/api` path. If you wanted the route example to become `server.com/stuff/statusPage`, you would need to change `config.web.rootEndpointType` to be ‘api'. Note that making this change doesn't stop `server.com/api/stuff/statusPage` from working as well, as you still have `config.web.urlPathForActions` set to be ‘api', so both will continue to work.

For a route to match, all params must be satisfied. So, if you expect a route to provide `api/:a/:b/:c` and the request is only for `api/:a/:c`, the route won't match. This holds for any variable, including `:apiVersion`. If you want to match both with and without apiVersion, just define the rote 2x, IE:

```ts
export const DEFAULT = {
  routes: () => {
    return {
      all: [
        { path: "/cache/:key/:value", action: "cacheTest" },
        { path: "/:apiVersion/cache/:key/:value", action: "cacheTest" },
      ],
    };
  };
};
```

If you want to shut off access to your action at `server.com/api/stuff/statusPage` and only allow access via `server.com/stuff/statusPage`, you can disable `config.web.urlPathForActions` by setting it equal to `null` (but keeping the `config.web.rootEndpointType` equal to `api`).

Routes will match the newest version of `apiVersion`. If you want to have a specific route match a specific version of an action, you can provide the `apiVersion` param in your route definitions:

```ts
export const DEFAULT = {
  routes: () => {
    return {
      get: [
        { path: "/myAction/old", action: "myAction", apiVersion: 1 },
        { path: "/myAction/new", action: "myAction", apiVersion: 2 },
      ],
    };
  };
};
```

This would create both `/api/myAction/old` and `/api/myAction/new`, mapping to apiVersion 1 and 2 respectively.

In your actions and middleware, if a route was matched, you can see the details of the match by inspecting `data.connection.matchedRoute` which will include `path` and `action`.

Finally, you can toggle an option, `matchTrailingPathParts`, which allows the final segment of your route to absorb all trailing path parts in a matched variable.

```ts
post: [
  // yes match: site.com/api/123
  // no match: site.com/api/123/admin
  { path: '/login/:userId(.*)', action: 'login' }
],

post: [
  // yes match: site.com/api/123
  // yes match: site.com/api/123/admin
  { path: '/login/:userId(.*)', action: 'login', matchTrailingPathParts: true }
],
```

This also enables "catch all" routes, like:

```ts
get: [
  { path: ‘:path(.*)', action: ‘catchAll', matchTrailingPathParts: true }
],
```

If you have a route with multiple variables defined and `matchTrailingPathParts` is true, only the final segment will match the trailing sections:

```ts
get: [
  // the route site.com/users/123/should/do/a/thing would become {userId: 123, path: ‘/should/do/a/thing'}
  { path: ‘/users/:userId/:path(.*)', action: ‘catchAll', matchTrailingPathParts: true }
],
```

**Note**: In regular expressions used for routing, you cannot use the "/" character.

#### Handling Static Folders with Routes

If you want map a special public folder to a given route you can use the "dir" parameter in your "get" routes in the routes.js file:

```ts
get: [
  { path: ‘/my/special/folder', dir: __dirname + ‘/…/public/my/special/folder', matchTrailingPathParts: true }
],
```

After mapping this route all files/folders within the mapped folder will be accessible on the route.

You have to map the specified public folder within the "dir" parameter, relative to the routes.js file or absolute. Make sure to set "matchTrailingPathParts" to "true", because when it is set to false, the route will never match when you request a file. (e.g.: site.com/my/special/folder/testfile.txt).

#### Route Notes

- you can mix explicitly defined params with route-defined params. If there is an overlap, the route-defined params win
  - IE: /api/user/123?userId=456 => `connection.userId = 123`
- routes defined with the "all" method will be duplicated to "get", "put", "post", and "delete"
- use ":variable" to define "variable"
- an undefined ":variable" will not match
  - IE: "/api/user/" will not match "/api/user/:userId"
  - You would need a second route in this case to match "/api/user"
- routes are matched as defined top-down in `routes.js`
- you can optionally define a regex match along with your route variable
  - IE: `{`path:"/game/:id(^[a-z]{0,10}\$)", action: "gamehandler" }`}`
  - be sure to double-escape when needed: `{` path: "/login/:userID(^\\d{3}\$)", action: "login" }`}`
- The HTTP verbs which you can route against are: `api.routes.verbs = ['head', 'get', 'post', 'put', 'patch', 'delete']`

```ts
export const DEFAULT = {
  routes: () => {
    return {
      get: [
        { path: "/users", action: "usersList" }, // (GET) /api/users
        { path: "/search/:term/limit/:limit/offset/:offset", action: "search" }, // (GET) /api/search/car/limit/10/offset/100
      ],

      post: [
        { path: "/login/:userID(^\\d{3}$)", action: "login" }, // (POST) /api/login/123
      ],

      all: [
        { path: "/user/:userID", action: "user" }, // (*) / /api/user/123
      ],
    };
  };
};
```

## Hosts

Actionhero allows you to define a collection of host headers which this API server will allow access from. You can set these via `config.web.allowedRequestHosts`. If the `Host` header of a client does not match one of those listed (protocol counts!), they will be redirected to the first one present.

You can also set `process.env.ALLOWED_HOSTS` which will be parsed as a comma-separated list of Hosts which will set `config.web.allowedRequestHosts`

## Parameters

Params provided by the user (GET, POST, etc for http and https servers, setParam for TCP clients, and passed to action calls from a web socket client) will be checked against a whitelist defined by your action (can be disabled in `/config/web.ts`). Variables defined in your actions by `action.inputs` will be added to your whitelist. Special params which the api will always accept are:

```ts
[
  ‘file',
  ‘apiVersion',
  ‘callback',
  ‘action',
]
```

Params are loaded in this order GET -> POST (normal) -> POST (multipart). This means that if you have `{url}?key=getValue` and you post a variable `key=postValue` as well, the `postValue` will be the one used. The only exception to this is if you use the URL method of defining your action. You can add arbitrary params to the whitelist by adding them to the `api.postVariables` array in your initializers.

File uploads from forms will also appear in `connection.params`, but will be an object with more information. That is, if you uploaded a file called "image", you would have `connection.params.image.path`, `connection.params.image.name` (original file name), and `connection.params.image.type` available to you.

A note on JSON payloads:

You can post BODY json payloads to Actionhero in the form of a hash or array.

**Hash**: `curl -X POST -d '{"key":"something", "value":{"a":1, "b":2}}' http://localhost:8080/api/cacheTest`. This will result in:

```ts
connection.params = {
  key: ‘something',
  value: {
    a: 1,
    b: 2
  }
}
```

**Array**: `curl -X POST -d '[{"key":"something", "value":{"a":1, "b":2}}]' http://localhost:8080/api/cacheTest`. In this case, we set the array to the param key `payload`:

```ts
connection.params = {
  payload: [
    {
      key: 'something'
      value: {
        a: 1,
        b: 2
      }
    }
  ]
}
```

### Uploading Files

Actionhero uses the [formidable](https://github.com/felixge/node-formidable) form parsing library. You can set options for it via `config.web.formOptions`. You can upload multiple files to an action and they will be available within `connection.params` as formidable response objects containing references to the original file name, where the uploaded file was stored temporarily, etc. Here is an example:

```ts
// actions/uploader.js
import { Action } from "Actionhero";

export class Uploader extends Action {
  constructor() {
    super();
    this.name = "uploader";
    this.description = "File upload Service";
    this.input = {
      file1: { required: true },
      file2: { required: false },
      key1: { required: false },
      key2: { required: false },
    };
  }

  async run(data) {
    console.log(data);
  }
}
```

```html
<!-- public/uploader.html -->

<html>
  <head></head>
  <body>
    <form
      method="post"
      enctype="multipart/form-data"
      action="http://localhost:8080/api/uploader"
    >
      <input type="file" name="file1" />
      <input type="file" name="file2" />
      <br /><br />
      <input type="text" name="key1" />
      <input type="text" name="key2" />
      <br /><br />
      <input type="submit" value="send" />
    </form>
  </body>
</html>
```

```ts
// what the params look like to an action

{ action: 'uploader',
  file1:
   { domain: null,
     _events: null,
     _maxListeners: 10,
     size: 5477608,
     path: '/app/Actionhero/tmp/86b2aa018a9785e20b3f6cea95babcca',
     name: '1-02 Concentration Enhancing Menu Initializer.mp3',
     type: 'audio/mp3',
     hash: false,
     lastModifiedDate: Wed Feb 13 2013 20:32:49 GMT-0800 (PST),
     _writeStream:
      { ... },
     length: [Getter],
     filename: [Getter],
     mime: [Getter] },
  file2:
   { domain: null,
     _events: null,
     _maxListeners: 10,
     size: 10439802,
     path: '/app/Actionhero/tmp/6052010f1d75ceaeb9197a9a759124dc',
     name: '1-10 There She Is.mp3',
     type: 'audio/mp3',
     hash: false,
     lastModifiedDate: Wed Feb 13 2013 20:32:49 GMT-0800 (PST),
     _writeStream:
      { ... },
   }
  key1: '123',
  key2: '456',
 }
```

## Client Library

Although the `ActionheroWebsocketClient` client-side library is mostly for websockets, it can now be used to make http actions when not connected (and websocket clients will fall back to http actions when disconnected)

```html
<script src="/public/javascript/ActionheroWebsocketClient.js"></script>

<script>
  var client = new ActionheroWebsocketClient();
  client.action("cacheTest", { key: "k", value: "v" }, function (error, data) {
    // do stuff
  });
</script>
```

Note that we never called `client.connect`. More information can be found on the [websocket server docs page](/docs/servers/websocket).
