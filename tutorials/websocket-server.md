## Overview

Actionhero uses [Primus](https://github.com/primus/primus) for web socket connections. The Primus project allows you to choose from many websocket backends, including `ws`, `engine.io`, `socket.io`, and more. Within Actionhero, web sockets are bound to the web server (either http or https).

Actionhero will generate the client-side javascript needed for you (based on the ActionheroWebsocketClient library, primus, and the underlying ws transport). This file is regenerated each time you boot the application.

## Connection Details

```html
// In the Browser...
<script src="/public/javascript/ActionheroWebsocketClient.js"></script>

<script>
  client = new ActionheroWebsocketClient();

  client.on("connected", function () {
    console.log("connected!");
  });
  client.on("disconnected", function () {
    console.log("disconnected :(");
  });

  client.on("error", function (error) {
    console.log("error", error.stack);
  });
  client.on("reconnect", function () {
    console.log("reconnect");
  });
  client.on("reconnecting", function () {
    console.log("reconnecting");
  });

  // this will log all messages send the client
  // client.on('message',      function(message){ console.log(message) })

  client.on("alert", function (message) {
    alert(message);
  });
  client.on("api", function (message) {
    alert(message);
  });

  client.on("welcome", function (message) {
    appendMessage(message);
  });
  client.on("say", function (message) {
    appendMessage(message);
  });

  client.connect(function (error, details) {
    if (error != null) {
      console.log(error);
    } else {
      client.roomAdd("defaultRoom");
      client.action("someAction", { key: "k", value: "v" }, function (data) {
        // do stuff
      });
    }
  });
</script>
```

`connection.type` for a webSocket client is "websocket". This type will not change regardless of if the client has fallen back to another protocol.

Data is always returned as JSON objects to the webSocket client.

An example web socket session might be the following:

You can also inspect `client.state` (‘connected', ‘disconnected', etc). The websocket client will attempt to re-connect automatically.

If you want to communicate with a websocket client outside of an action, you can call `connection.send(message)` on the server. In the client lib, the event message will be fired. So, client.on('message, function(m){ ... })`. Be sure to add some descriptive content to the message you send from the sever (like perhaps {"type": 'message type'}`) so you can route message types on the client.

## Linking WebSockets to Web Clients

Actionhero provides `connection.fingerprint` where available to help you link websocket connections to related web connections. While every connection will always have a unique `connection.id`, we attempt to build `connection.fingerprint` by checking the headers the websocket connection began with. If the cookie defined by `config.web.fingerprint.cookieKey` is present, we will store its value on the websocket connection.

You can read more about using a value like `connection.fingerprint` in an [authentication middleware](/tutorials/middleware) or using it as a key for session information.

## Config Options

You can create your client with options. Options for both the server and client are stored in [`/config/websocket.ts`](https://github.com/actionhero/actionhero/blob/main/src/config/websocket.ts). Note there are 2 sections: `server` and `client`.
