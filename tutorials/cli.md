## Overview

Allow Actionhero developers to create new files in `./bin` which can be run via the CLI. These commands will have access to a the Actionhero `api` and CLI arguments object within a `run` method.

You can create namespaces for commands by using folders. For example, a file in `./bin/redis/keys` would be run via `npx Actionhero redis keys`

```ts
import { api, log, CLI } from "actionhero";

export class RedisKeys extends CLI {
  constructor() {
    super();
    this.name = "redis keys";
    this.description = "I list all the keys in redis";
    this.example = "actionhero keys --prefix actionhero";
    this.inputs = {
      prefix: {
        required: true,
        default: "actionhero",
        note: "the redis prefix for searching keys",
      },
    };
  }

  async run({ params }) {
    let keys = await api.redis.clients.client.keys(params.prefix);
    log("Found " + keys.length + "keys:");
    keys.forEach((k) => {
      log(k);
    });
  }
}
```

## Syntax

actionhero CLI commands have:

- name
- description
- example

Inputs for CLI commands have:

- required (true/false)
- default (string only)
- note

These are sourced automatically by `actionhero help`, and the example above would return:

```bash
* redis keys
  description: I list all the keys in redis
  example: actionhero keys --prefix actionhero
  inputs:
    [prefix] (optional)
      note: the redis prefix for searching keys
      default: actionhero
```
