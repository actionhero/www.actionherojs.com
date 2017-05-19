import React from 'react'
import DocsPageWithNav from './../../../pageClasses/docsPageWithSideNav.js'
import { Row, Col } from 'react-bootstrap'
import DocsPage from './../../../components/layouts/docsPage.js'

import Code from './../../../components/code.js'

const SampleResponse =
`{
  hello: "world",
  serverInformation: {
    serverName: "actionhero API",
    apiVersion: 1,
    requestDuration: 14
  },
  requestorInformation: {
    remoteAddress: "127.0.0.1",
    RequestsRemaining: 989,
    recievedParams: {
      action: ""
    }
  }
}`

const HTTPExample =
`> curl 'localhost:8080/api/status' -v | python -mjson.tool
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
< X-Powered-By: actionhero API
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
        "recievedParams": {
            "action": "status",
        },
        "remoteAddress": "127.0.0.1"
    },
    "serverInformation": {
        "apiVersion": "3.0.0",
        "currentTime": 1343604353551,
        "requestDuration": 1,
        "serverName": "actionhero API"
    },
    "stats": {
        "cache": {
            "numberOfObjects": 0
        },
        "id": "10.0.1.12:8080:4443:5000",
        "memoryConsumption": 8421200,
        "peers": [
            "10.0.1.12:8080:4443:5000"
        ],
        "queue": {
            "queueLength": 0,
            "sleepingTasks": []
        },
        "socketServer": {
            "numberOfGlobalSocketRequests": 0,
            "numberOfLocalActiveSocketClients": 0,
            "numberOfLocalSocketRequests": 0
        },
        "uptimeSeconds": 34.163,
        "webServer": {
            "numberOfGlobalWebRequests": 5,
            "numberOfLocalWebRequests": 3
        },
        "webSocketServer": {
            "numberOfGlobalWebSocketRequests": 0,
            "numberOfLocalActiveWebSocketClients": 0
        }
    }
}`

const Config =
`exports['default'] = {
  servers: {
    web: function (api) {
      return {
        enabled: true,
        // HTTP or HTTPS?
        secure: false,
        // Passed to https.createServer if secure=true. Should contain SSL certificates
        serverOptions: {},
        // Should we redirect all traffic to the first host in this array if hte request header doesn't match?
        // i.e.: [ 'https://www.site.com' ]
        allowedRequestHosts: process.env.ALLOWED_HOSTS ? process.env.ALLOWED_HOSTS.split(',') : [],
        // Port or Socket Path
        port: process.env.PORT || 8080,
        // Which IP to listen on (use '0.0.0.0' for all; '::' for all on ipv4 and ipv6)
        // Set to \`null\` when listening to socket
        bindIP: '0.0.0.0',
        // Any additional headers you want actionhero to respond with
        httpHeaders: {
          'X-Powered-By': api.config.general.serverName,
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'HEAD, GET, POST, PUT, PATCH, DELETE, OPTIONS, TRACE',
          'Access-Control-Allow-Headers': 'Content-Type'
        },
        // Route that actions will be served from; secondary route against this route will be treated as actions,
        //  IE: /api/?action=test == /api/test/
        urlPathForActions: 'api',
        // Route that static files will be served from;
        //  path (relative to your project root) to serve static content from
        //  set to \`null\` to disable the file server entirely
        urlPathForFiles: 'public',
        // When visiting the root URL, should visitors see 'api' or 'file'?
        //  Visitors can always visit /api and /public as normal
        rootEndpointType: 'file',
        // simple routing also adds an 'all' route which matches /api/:action for all actions
        simpleRouting: true,
        // queryRouting allows an action to be defined via a URL param, ie: /api?action=:action
        queryRouting: true,
        // The cache or (if etags are enabled) next-revalidation time to be returned for all flat files served from /public; defined in seconds
        flatFileCacheDuration: 60,
        // Add an etag header to requested flat files which acts as fingerprint that changes when the file is updated;
        // Client will revalidate the fingerprint at latest after flatFileCacheDuration and reload it if the etag (and therfore the file) changed
        // or continue to use the cached file if it's still valid
        enableEtag: true,
        // How many times should we try to boot the server?
        // This might happen if the port is in use by another process or the socketfile is claimed
        bootAttempts: 1,
        // Settings for determining the id of an http(s) request (browser-fingerprint)
        fingerprintOptions: {
          cookieKey: 'sessionID',
          toSetCookie: true,
          onlyStaticElements: false,
          settings: {
            path: '/',
            expires: 3600000
          }
        },
        // Options to be applied to incoming file uploads.
        //  More options and details at https://github.com/felixge/node-formidable
        formOptions: {
          uploadDir: os.tmpdir(),
          keepExtensions: false,
          maxFieldsSize: 1024 * 1024 * 100
        },
        // Should we pad JSON responses with whitespace to make them more human-readable?
        // set to null to disable
        padding: 2,
        // Options to configure metadata in responses
        metadataOptions: {
          serverInformation: true,
          requesterInformation: true
        },
        // When true, returnErrorCodes will modify the response header for http(s) clients if connection.error is not null.
        // You can also set connection.rawConnection.responseHttpCode to specify a code per request.
        returnErrorCodes: true,
        // should this node server attempt to gzip responses if the client can accept them?
        // this will slow down the performance of actionhero, and if you need this funcionality, it is recommended that you do this upstream with nginx or your load balancer
        compress: false,
        // options to pass to the query parser
        // learn more about the options @ https://github.com/hapijs/qs
        queryParseOptions: {}
      }
    }
  }
}`

const CertExample =
`config.server.web.serverOptions: {
  key: fs.readFileSync('certs/server-key.pem'),
  cert: fs.readFileSync('certs/server-cert.pem')
}`

const TheConnectionObject =
`{ id: '3e55b464fd34708eba26f609f44481a120e094a8-a6dfb60b-9562-4cc0-9d92-bc6cc1b622ba',
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
  messageCount: 0,
  canChat: false,
  sendMessage: [Function],
  sendFile: [Function]
}`

const SendingFiles =
`data.connection.sendFile('/path/to/file.mp3');
data.toRender = false;
next();`

const RoutesOptions =
`api.config.servers.web.urlPathForActions = ‘api';
api.config.servers.web.urlPathForFiles = ‘public';
api.config.servers.web.rootEndpointType = ‘file';`

const RoutesSample1 =
`exports.default = function(api) {
  return {
    get: [
      { path: ‘/stuff/statusPage', action: ‘status' }
    ]
  };
}`

const RoutesSample2 =
`exports.default = function(api) {
  return {
    all: [
      { path: "/cache/:key/:value",             action:  "cacheTest" },
      { path: "/:apiVersion/cache/:key/:value", action:  "cacheTest" },
    ]
  };
}`

const RoutesSample3 =
`exports.default = function(api) {
  return {
    get: [
      { path: "/myAction/old", action:  "myAction", apiVersion: 1 },
      { path: "/myAction/new", action:  "myAction", apiVersion: 2 },
    ]
  };
}`

const RoutesSample4 =
`post: [
  // yes match: site.com/api/123
  // no match: site.com/api/123/admin
  { path: '/login/:userId(.*)', action: 'login' }
],

post: [
  // yes match: site.com/api/123
  // yes match: site.com/api/123/admin
  { path: '/login/:userId(.*)', action: 'login', matchTrailingPathParts: true }
],`

const RoutesSample5 =
`get: [
  { path: ‘:path(.*)', action: ‘catchAll', matchTrailingPathParts: true }
],`

const RoutesSample6 =
`get: [
  // the route site.com/users/123/should/do/a/thing would become {userId: 123, path: ‘/should/do/a/thing'}
  { path: ‘/users/:userId/:path(.*)', action: ‘catchAll', matchTrailingPathParts: true }
],`

const RoutesSample7 =
`get: [
  { path: ‘/my/special/folder', dir: __dirname + ‘/…/public/my/special/folder', matchTrailingPathParts: true }
],`

const RoutesSample8 =
`exports.default = function(api) {
  return {
    get: [
      { path: "/users", action: "usersList" }, // (GET) /api/users
      { path: "/search/:term/limit/:limit/offset/:offset", action: "search" }, // (GET) /api/search/car/limit/10/offset/100
    ],

    post: [
      { path: "/login/:userID(^\\d{3}$)", action: "login" } // (POST) /api/login/123
    ],

    all: [
      { path: "/user/:userID", action: "user" } // (*) / /api/user/123
    ]
  };
}`

const ParamsSample1 =
`[
  ‘file',
  ‘apiVersion',
  ‘callback',
  ‘action',
]`

const ParamsSample2 =
`connection.params = {
  key: ‘something',
  value: {
    a: 1,
    b: 2
  }
}`

const ParamsSample3 =
`connection.params = {
  payload: [
    {
      key: ‘something'
      value: {
        a: 1,
        b: 2
      }
    }
  ]
}`

const UploadingFiles1 =
`// actions/uploader.js

exports.action = {
  name: 'uploader',
  description: 'uploader',
  inputs: {
    file1: {required: true},
    file2: {required: false},
    key1: {required: false},
    key2: {required: false},
  },
  outputExample: null,
  run: function(api, data, next){
    console.log(data.params);
    next();
  }
};`

const UploadingFiles2 =
`<!-- public/uploader.html -->

<html>
    <head></head>
    <body>
        <form method="post" enctype="multipart/form-data" action="http://localhost:8080/api/uploader">
            <input type="file" name="file1" />
            <input type="file" name="file2" />
            <br><br>
            <input type='text' name="key1" />
            <input type='text' name="key2" />
            <br><br>
            <input type="submit" value="send" />
        </form>
    </body>
</html>`

const UploadingFiles3 =
`// what the params look like to an action

{ action: 'uploader',
  file1:
   { domain: null,
     _events: null,
     _maxListeners: 10,
     size: 5477608,
     path: '/app/actionhero/tmp/86b2aa018a9785e20b3f6cea95babcca',
     name: '1-02 Concentration Enhancing Menu Initialiser.mp3',
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
     path: '/app/actionhero/tmp/6052010f1d75ceaeb9197a9a759124dc',
     name: '1-10 There She Is.mp3',
     type: 'audio/mp3',
     hash: false,
     lastModifiedDate: Wed Feb 13 2013 20:32:49 GMT-0800 (PST),
     _writeStream:
      { ... },
  key1: '123',
  key2: '456',
 }`

const ClientLibrary =
`<script src="/public/javascript/actionheroClient.js"></script>

<script>
  var client = new ActionheroClient();
  client.action('cacheTest', {key: 'k', value: 'v'}, function(error, data){
     // do stuff
  });
</script>`

export default class extends DocsPageWithNav {
  constructor (props) {
    super(props)

    this.state = {
      titleSection: {
        title: 'Servers: Web',
        icon: '/static/images/routing.svg'
      },
      sections: {
        'overview': 'Overview',
        'http-example': 'HTTP Example',
        'config-options': 'Config Options',
        'the-connection-object': 'The Connection Object',
        'sending-files': 'Sending Files',
        'routes': 'Routes',
        'hosts': 'Hosts',
        'params': 'Params',
        'uploading-files': 'Uploading Files',
        'client-library': 'Client Library'
      },
      links: [
        {link: '/docs/servers/websocket', title: '» Servers: WebSocket'}
      ]
    }
  }

  render () {
    return (
      <DocsPage sideNav={this.state.sections} titleSection={this.state.titleSection} links={this.state.links} currentSection={this.state.currentSection}>
        <Row>
          <Col md={12}>
            { this.section('overview',
              <div>
                <Code>{SampleResponse}</Code>
                <p>The web server exposes actions and files over http or https.  You can visit the API in a browser, Curl, etc. <code>{`{url}?action=actionName`}</code> or <code>{`{url}/api/{actionName}`}</code> is how you would access an action.  For example, using the default ports in <code>/config/servers/web.js</code> you could reach the status action with both <code>http://127.0.0.1:8080/status</code> or <code>http://127.0.0.1:8080/?action=status</code></p>
                <p>HTTP responses are always JSON and follow the format above.</p>
              </div>
            )}

            { this.section('http-example',
              <div>
                <Code language='bash'>{HTTPExample}</Code>
                <ul>
                  <li>You can provide the <code>?callback=myFunc</code> param to initiate a JSONp response which will wrap the returned JSON in your callback {`function`}.  The mime type of the response will change from JSON to Javascript.</li>
                  <li>If everything went OK with your request, no error attribute will be set on the response, otherwise, you should see either a string or hash error response within your action</li>
                  <li>To build the response for "hello" above, the action would have set <code>{`connection.response.hello = 'world'`}</code></li>
                </ul>
              </div>
            )}

            { this.section('config-options',
              <div>
                <p><code>/config/servers/web.js</code> contains the settings for the web server.  The relevant options are:</p>
                <Code>{Config}</Code>
                <p>Note that if you wish to create a secure (https) server, you will be required to complete the serverOptions hash with at least a cert and a keyfile:</p>
                <Code>{CertExample}</Code>
              </div>
            )}

            { this.section('the-connection-object',
              <div>
                <Code>{TheConnectionObject}</Code>
                <p>when inspecting <code>connection</code> in actions from web client, a few additional elements are added for convenience:</p>

                <ul>
                  <li><code>connection.rawConnection.responseHeaders</code>: array of headers which can be built up in the action.  Headers will be made unique, and latest header will be used (except setting cookies)</li>
                  <li><code>connection.rawConnection.method</code>: A string, GET, POST, etc</li>
                  <li><code>connection.rawConnection.cookies</code>: Hash representation of the connection's cookies</li>
                  <li><code>connection.rawConnection.responseHttpCode</code>: the status code to be rendered to the user.  Defaults to 200</li>
                  <li><code>connection.type</code> for a HTTP client is "web"</li>
                  <li><code>connection.rawConnection.params.body</code> will contain un-filtered form data</li>
                  <li><code>connection.rawConnection.params.files</code> will contain un-filtered form data</li>
                  <li><code>connection.extension</code>.  If are using a route to access an action, and the request path ends in a file extension (IE: <code>server.com/action/option.jpg</code>), the extension will be available.  Depending on the server's options, this extension may also be used to modify the response mime-type by configuring <code>matchExtensionMimeType</code> within each action.</li>
                </ul>

                <p>Of course, the generic connection attributes (<code>connection.error</code>, <code>connection.params</code>, etc) will be present.</p>

              </div>
            )}

            { this.section('sending-files',
              <div>
                <Code>{SendingFiles}</Code>
                <p>ActionHero can also serve up flat files.  ActionHero will not cache these files and each request to <code>file</code> will re-read the file from disk (like the nginx web server).</p>

                <p>There are helpers you can use in your actions to send files:</p>
                <ul>
                  <li><code>/public</code> and <code>/api</code> are  routes which expose the directories of those types.  These top level path can be configured in <code>/config/servers/web.js</code> with <code>api.config.servers.web.urlPathForActions</code> and <code>api.config.servers.web.urlPathForFiles</code>.</li>
                  <li>the root of the web server "/" can be toggled to serve the content between /file or /api actions per your needs <code>api.config.servers.web.rootEndpointType</code>. The default is <code>api</code>.</li>
                  <li>ActionHero will serve up flat files (html, images, etc) as well from your ./public folder.  This is accomplished via the <code>file</code> route as described above. <code>{`http://{baseUrl}/public/{pathToFile}`}</code> is equivalent to <code>{`http://{baseUrl}?action=file&fileName={pathToFile}`}</code> and <code>{`http://{baseUrl}/file/{pathToFile}`}</code>.</li>
                  <li>Errors will result in a 404 (file not found) with a message you can customize.</li>
                  <li>Proper mime-type headers will be set when possible via the <code>mime</code> package.</li>
                </ul>

                <p>See the <a href='/docs/core/file-server'>file server</a> page for more documentation</p>
              </div>
            )}

            { this.section('routes',
              <div>
                <p>For web clients (http and https), you can define an optional RESTful mapping to help route requests to actions.  If the client doesn't specify an action via a param, and the base route isn't a named action, the action will attempt to be discerned from this <code>config/routes.js</code> file.</p>

                <p>This variables in play here are:</p>

                <ul>
                  <li><code>api.config.servers.web.urlPathForActions</code></li>
                  <li><code>api.config.servers.web.rootEndpointType</code></li>
                  <li>and of course the content of <code>config/routes.js</code></li>
                </ul>

                <p>Say you have an action called ‘status' (like in a freshly generated ActionHero project).  Lets start with ActionHero's default config:</p>
                <Code>{RoutesOptions}</Code>

                <p>There are 3 ways a client can access actions via the web server.</p>

                <ul>
                  <li>no routing at all and use GET params: <code>server.com/api?action=status</code></li>
                  <li>with ‘basic' routing, where the action's name will respond after the /api path: <code>server.com/api/status</code></li>
                  <li>or you can modify this with routes. Say you want <code>server.com/api/stuff/statusPage</code></li>
                </ul>

                <Code>{RoutesSample1}</Code>

                <p>If the <code>api.config.servers.web.rootEndpointType</code> is <code>"file"</code> which means that the routes you are making are active only under the <code>/api</code> path.  If you wanted the route example to become <code>server.com/stuff/statusPage</code>, you would need to change <code>api.config.servers.web.rootEndpointType</code> to be ‘api'.  Note that making this change doesn't stop <code>server.com/api/stuff/statusPage</code> from working as well, as you still have <code>api.config.servers.web.urlPathForActions</code> set to be ‘api', so both will continue to work.</p>
                <p>For a route to match, all params must be satisfied.  So, if you expect a route to provide <code>api/:a/:b/:c</code> and the request is only for <code>api/:a/:c</code>, the route won't match. This holds for any variable, including <code>:apiVersion</code>.  If you want to match both with and without apiVersion, just define the rote 2x, IE:</p>

                <Code>{RoutesSample2}</Code>

                <p>If you want to shut off access to your action at <code>server.com/api/stuff/statusPage</code> and only allow access via <code>server.com/stuff/statusPage</code>, you can disable <code>api.config.servers.web.urlPathForActions</code> by setting it equal to <code>null</code> (but keeping the <code>api.config.servers.web.rootEndpointType</code> equal to <code>api</code>).</p>
                <p>Routes will match the newest version of <code>apiVersion</code>.  If you want to have a specific route match a specific version of an action, you can provide the <code>apiVersion</code> param in your route definitions:</p>

                <Code>{RoutesSample3}</Code>

                <p>This would create both <code>/api/myAction/old</code> and <code>/api/myAction/new</code>, mapping to apiVersion 1 and 2 respectively.</p>
                <p>In your actions and middleware, if a route was matched, you can see the details of the match by inspecting <code>data.connection.matchedRoute</code> which will include <code>path</code> and <code>action</code>.</p>
                <p>Finally, you can toggle an option, <code>matchTrailingPathParts</code>, which allows the final segment of your route to absorb all trailing path parts in a matched variable.</p>

                <Code>{RoutesSample4}</Code>

                <p>This also enables "catch all" routes, like:</p>

                <Code>{RoutesSample5}</Code>

                <p>If you have a route with multiple variables defined and <code>matchTrailingPathParts</code> is true, only the final segment will match the trailing sections:</p>

                <Code>{RoutesSample6}</Code>

                <p><strong>Note</strong>: In regular expressions used for routing, you cannot use the "/" character.</p>

                <h4>Handling Static Folders with Routes</h4>

                <p>If you want map a special public folder to a given route you can use the "dir" parameter in your "get" routes in the routes.js file:</p>

                <Code>{RoutesSample7}</Code>

                <p>After mapping this route all files/folders within the mapped folder will be accessible on the route.</p>
                <p>You have to map the specified public folder within the "dir" parameter, relative to the routes.js file or absolute. Make sure to set "matchTrailingPathParts" to "true", because when it is set to false, the route will never match when you request a file. (e.g.: site.com/my/special/folder/testfile.txt).</p>

                <h4>Route Notes</h4>

                <ul>
                  <li>actions defined in params directly <code>action=theAction</code> or hitting the named URL for an action <code>/api/theAction</code> will never override RESTful routing</li>
                  <li>you can mix explicitly defined params with route-defined params.  If there is an overlap, the route-defined params win
                    <ul>
                      <li>IE: /api/user/123?userId=456 =&gt; <code>connection.userId = 123</code></li>
                    </ul>
                  </li>
                  <li>routes defined with the "all" method will be duplicated to "get", "put", "post", and "delete"</li>
                  <li>use ":variable" to define "variable"</li>
                  <li>an undefined ":variable" will not match
                    <ul>
                      <li>IE: "/api/user/" will not match "/api/user/:userId"</li>
                      <li>You would need a second route in this case to match "/api/user"</li>
                    </ul>
                  </li>
                  <li>routes are matched as defined top-down in <code>routes.js</code></li>
                  <li>you can optionally define a regex match along with your route variable
                    <ul>
                      <li>IE: <code>{`path:"/game/:id(^[a-z]{0,10}$)", action: "gamehandler" }`}</code></li>
                      <li>be sure to double-escape when needed: <code>{` path: "/login/:userID(^\\d{3}$)", action: "login" }`}</code></li>
                    </ul>
                  </li>
                  <li>The HTTP verbs which you can route against are: <code>api.routes.verbs = ['head', 'get', 'post', 'put', 'patch', 'delete']</code></li>
                </ul>

                <Code>{RoutesSample8}</Code>
              </div>
            )}

            { this.section('hosts',
              <div>
                <p>ActionHero allows you to define a collection of host headers which this API server will allow access from.  You can set these via <code>api.config.servers.web.allowedRequestHosts</code>.  If the <code>Host</code> header of a client does not match one of those listed (protocol counts!), they will be redirected to the first one present.</p>
                <p>You can also set <code>process.env.ALLOWED_HOSTS</code> which will be parsed as a comma-separated list of Hosts which will set <code>api.config.servers.web.allowedRequestHosts</code></p>
              </div>
            )}

            { this.section('params',
              <div>
                <p>Params provided by the user (GET, POST, etc for http and https servers, setParam for TCP clients, and passed to action calls from a web socket client) will be checked against a whitelist defined by your action (can be disabled in <code>/config/servers/web.js</code>).  Variables defined in your actions by <code>action.inputs</code> will be added to your whitelist.  Special params which the api will always accept are:</p>
                <Code>{ParamsSample1}</Code>

                <p>Params are loaded in this order GET -&gt; POST (normal) -&gt; POST (multipart).  This means that if you have <code>{`{url}?key=getValue`}</code> and you post a variable <code>key=postValue</code> as well, the <code>postValue</code> will be the one used.  The only exception to this is if you use the URL method of defining your action.  You can add arbitrary params to the whitelist by adding them to the <code>api.postVariables</code> array in your initializers.</p>
                <p>File uploads from forms will also appear in <code>connection.params</code>, but will be an object with more information.  That is, if you uploaded a file called "image", you would have <code>connection.params.image.path</code>, <code>connection.params.image.name</code> (original file name), and <code>connection.params.image.type</code> available to you.</p>
                <p>A note on JSON payloads:</p>
                <p>You can post BODY json paylaods to actionHero in the form of a hash or array.</p>

                <p><strong>Hash</strong>: <code>{`curl -X POST -d '{"key":"something", "value":{"a":1, "b":2}}' http://localhost:8080/api/cacheTest`}</code>.  This will result in:</p>
                <Code>{ParamsSample2}</Code>

                <p><strong>Array</strong>: <code>{`curl -X POST -d '[{"key":"something", "value":{"a":1, "b":2}}]' http://localhost:8080/api/cacheTest`}</code>.  In this case, we set the array to the param key <code>payload</code>:</p>
                <Code>{ParamsSample3}</Code>

              </div>
            )}

            { this.section('uploading-files',
              <div>
                <p>ActionHero uses the <a href='https://github.com/felixge/node-formidable'>formidable</a> form parsing library.  You can set options for it via <code>api.config.servers.web.formOptions</code>.  You can upload multiple files to an action and they will be available within <code>connection.params</code> as formidable response objects containing references to the original file name, where the uploaded file was stored temporarily, etc.   Here is an example:</p>
                <Code>{UploadingFiles1}</Code>
                <Code language='html'>{UploadingFiles2}</Code>
                <Code>{UploadingFiles3}</Code>
              </div>
            )}

            { this.section('client-library',
              <div>
                <p>Although the <code>actionheroClient</code> client-side library is mostly for websockets, it can now be used to make http actions when not connected (and websocket clients will fall back to http actions when disconnected)</p>
                <Code>{ClientLibrary}</Code>
                <p>Note that we never called <code>client.connect</code>.  More information can be found on the <a href='/docs/servers/websocket'>websocket server docs page</a>.</p>
              </div>
            )}
          </Col>
        </Row>
      </DocsPage>
    )
  }
}
