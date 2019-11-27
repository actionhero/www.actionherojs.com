## Overview

Actionhero includes a powerful cache system based on Redis. It can be used to store and retrive data, but also to create more complext data structures based on queues and epiring object.

## Methods

[The cache methods are docuemnted in detail with annotations here](https://docs.actionherojs.com/modules/cache.html). There are methods fall into 3 categories:

- **data**: read, write, check, delete
- **locks** you can lock and unlock objects in the cache so that only one Actionhero node can claim it
- **queues** you can share a distributed array and access it via push and pop methods

## Example Usage

An Action:

```ts
import { cache, Action } from "Actionhero";

export class CacheTest extends Action {
  constructor() {
    super();
    this.name = "cacheTest";
    this.description = "I will test the internal cache functions of the API";
    this.inputs = {
      key: {
        required: true,
        formatter: this.stringFormatter,
        validator: this.stringValidator
      },

      value: {
        required: true,
        formatter: this.stringFormatter,
        validator: this.stringValidator
      }
    };
    this.outputExample = {
      cacheTestResults: {
        saveResp: true,
        sizeResp: 1,
        loadResp: {
          key: "cacheTest_key",
          value: "value",
          expireTimestamp: 1420953274716,
          createdAt: 1420953269716,
          readAt: null
        },
        deleteResp: true
      }
    };
  }

  stringFormatter(s) {
    return String(s);
  }

  stringValidator(s) {
    if (s.length < 3) {
      return "inputs should be at least 3 letters long";
    } else {
      return true;
    }
  }

  async run({ params, response }) {
    const key = `cacheTest_${params.key}`;
    const value = params.value;

    response.cacheTestResults = {
      saveResp: await cache.save(key, value, 5000),
      sizeResp: await cache.size(),
      loadResp: await cache.load(key),
      deleteResp: await cache.destroy(key)
    };
  }
}
```
