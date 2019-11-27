## Overview

**_AKA: Running Actionhero in a Cluster_**

Actionhero can be run either as a solitary server or as part of a cluster. The goal of these cluster helpers is to allow you to create a group of servers which will share state and each be able to handle requests and run tasks. You can add or remove nodes from the cluster without fear of data loss or task duplication. You can also run many instances of Actionhero on the same server using node.js cluster methods (`Actionhero start cluster`), which you [can learn more about here](/tutorials/production-notes).

Cluster instances are named sequentially, starting with `Actionhero-worker-1`, and can be retrieved from 'api.id'. Logs and PID's, as well as other instance-specific information follow this pattern as well.

## Cache

Using a [redis](http://redis.io) backend, Actionhero nodes share memory objects (using the `cache`) and have a common queue for tasks. This means that all peers will have access to all data stored in the cache. The task system also becomes a common queue which all peers will work on draining. There should be no changes required to deploy your application in a cluster.

Keep in mind that many clients/server can access a cached value simultaneously, so build your actions carefully not to have conflicting state. You can [learn more about the cache methods here](/tutorails/cache). You can also [review recommendations about Production Redis configurations](/tutorials/production-notes).

## RPC

In version 9.0.0, Actionhero introduced Remote Procedure Calls, or RPC for short. You can call an RPC method to be executed on all nodes in your cluster or just a node which holds a specific connection. You can call RPC methods with the `redis.doCluster` method. If you provide the optional callback, you will get the first response back (or a timeout error). RPC calls are invoked with `redis.doCluster(method, args, connectionId, waitForResponse)`.

For example, if you wanted all nodes to log a message, you would do: `redis.doCluster('api.log', ["hello from " + api.id])`

If you wanted the node which holds connection `abc123` to change their `authorized` status (perhaps because your room authentication relies on this), you would do:

```js
// This will ask all nodes connected to the cluster if they have connection #\`abc123\`
//   and if they do, run \`connection.set('auth', true)\` on it
await connections.apply("abc123", "set", ["auth", true]);
```

The RPC system is used heavily by Chat.

Two options have been added to the `config/redis.js` config file to support this: `config.general.channel` ( Which channel to use on redis pub/sub for RPC communication ) and `config.general.rpcTimeout` ( How long to wait for an RPC call before considering it a failure )

**WARNING**

RPC calls are authenticated against `config.serverToken` and communication happens over redis pub/sub. BE CAREFUL, as you can call _any_ method within the API namespace on an Actionhero server, including shutdown() and read _any_ data on that node.

## Connections

Some special RPC tools have been added so that you can interact with connections across multiple nodes. Specifically the chat sub-system needs to be able to boot and move connections into rooms, regardless of which node they are connected to.

Actionhero has exposed `connections.apply` which can be used to retrieve data about and modify a connection on any node.

**`connections.apply(connectionId, method, args)`**

- [Learn More](api.connections.html)
- connectionId is required
- Both `method` and `args` can be ignored if you just want to retrieve information about a connection, IE: `const connectionDetails = await api.connections.apply(connectionId)`

## PubSub

```js
import { redis } from "Actionhero";

// To subscribe to messages, add a callback for your \`messageType\`, IE:
redis.subscriptionHandlers["myMessageType"] = function(message) {
  // do stuff
};

// send a message
const payload = {
  messageType: "myMessageType",
  serverId: api.id,
  serverToken: api.config.general.serverToken,
  message: "hello!"
};

await api.redis.publish(payload);
```

Actionhero also uses redis to allow for pub/sub communication between nodes.

You can broadcast and receive messages from other peers in the cluster:

**`redis.publish(payload)`**

- [Learn More](api.redis.html)
- payload must contain:
  - `messageType` : the name of your payload type,
  - `serverId` : `api.id`,
  - `serverToken` : `api.config.general.serverToken`,
