## Overview

Allow Actionhero developers to create new files in `./bin` which can be run via the CLI. These commands will have access to a the Actionhero `api` and CLI arguments object within a `run` method.

You can create namespaces for commands by using folders. For example, a file in `./bin/redis/keys` would be run via `npx Actionhero redis keys`

```ts
import { api, log, CLI } from "Actionhero";

export class RedisKeys extends CLI {
  constructor() {
    super();
    this.name = "redis keys";
    this.description = "I list all the keys in redis";
    this.example = "Actionhero keys --prefix Actionhero";
  }

  inputs() {
    return {
      prefix: {
        required: true,
        default: "Actionhero",
        note: "the redis prefix for searching keys"
      }
    };
  }

  async run({ params }) {
    let keys = await api.redis.clients.client.keys(params.prefix);
    log("Found " + keys.length + "keys:");
    keys.forEach(k => {
      log(k);
    });
  }
}
```

## Syntax

Actionhero CLI commands have:

- name
- description
- example

Inputs for CLI commands have:

- required (true/false)
- default (string only)
- note

These are sourced automatically by `Actionhero help`, and the example above would return:

```bash
* redis keys
  description: I list all the keys in redis
  example: Actionhero keys --prefix Actionhero
  inputs:
    [prefix] (optional)
      note: the redis prefix for searching keys
      default: Actionhero
```
