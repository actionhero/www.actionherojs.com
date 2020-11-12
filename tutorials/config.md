## Overview

There are 2 ways to manage Actionhero configuration: configuration files and overrides. In both cases, Actionhero starts by reading the config in `./config/`. [Here is what config files for a new Actionhero project look like](https://github.com/actionhero/Actionhero/blob/master/config/).

The normal way to deal with configuration changes is to use the files in `/config/` and to have changed options for each environment, based on NODE_ENV. First we load in all settings from the `default` config block, and then we replace those with anything defined in the relevant `environment` section. Actionhero uses the standard node environment variable `NODE_ENV` to determine environment, and defaults to ‘development' when one isn't found. This pattern is very similar the Rails and Sails frameworks. A good way to visualize this is to note that, by default, the server will return metadata in response JSON, but we change that in the production NODE_ENV and disable it.

```js
export const DEFAULT = {
  general: config => {
    return {
      //...
      developmentMode: true
      //...
    };
  }
};

export const production = {
  general: config => {
    return {
      developmentMode: false
    };
  }
};

```

```general``` represent the name of your config.

The priority order of configs is:

1.  options passed in to boot with `actionhero.start({configChanges: configChanges})`
2.  environment-specific values in `/config`
3.  default values in `/config`

When building config files of your own, note that an `exports.default` is always required, and any environment overrides are optional. What is exported is a hash which eventually resolves a synchronous function which accepts the `api` variable.

## Boot Options to find the Config Directory

When launching Actionhero you can specify which config directory to use with `--config '/path/to/dir'` or the environment variable `ACTIONHERO_CONFIG`, otherwise `./config/` will be used from your working directory.

The priority of arguments is:

1.  Use the project's `./config` folder, if it exists.
2.  `actionhero --config=PATH1 --config=PATH2 --config=PATH3,PATH4`
3.  `ACTIONHERO_CONFIG=PATH1,PATH2 npm start`

Note that if `--config` or `ACTIONHERO_CONFIG` are used, they _overwrite_ the use of the default `/config` folder. If you wish to use both, you need to re-specify "config", e.g. `--config=config,local-config`. Also, note that specifying multiple `--config` options on the command line does exactly the same thing as using one parameter with comma separators, however the environment variable method only supports the comma-delimited syntax.


## Exemple


- Configure your database with your key word ```db``` 

```src/config/db.ts```

```ts
export interface MyDbInterface {
    host: string;
    port: number;
    database: string;
    username: string;
    password: string;
}

export const DEFAULT = {
  db: (config) => {
    return {
      host: 'HOST_A',
      port: 5432,
      database: 'DB_A',
      username: 'USERNAME_A',
      password: 'PASSWORD_A',
    };
  }
};
module.exports.DEFAULT = DEFAULT;

export const production = {
  db: (config) => {
    return {
      host: 'HOST_B',
      port: 5432,
      database: 'DB_B',
      username: 'USERNAME_B',
      password: 'PASSWORD_B',
    };
  }
};
module.exports.production = production;

```

- Initialisation: Retrieve your configuration from ```src/config/db.ts```

```src/initializers/db.ts```

```ts

export class DbInitializer extends Initializer {
    constructor() {
        super();
        this.name = "db";
    }

    async initialize(config: {db: MyDbInterface }) {
        // acces to your config ...
        // config.db.*
    }

    async start(config: {db: MyDbInterface }) {
        // acces to your config ...
        // config.db.*
    }

    async stop(config: {db: MyDbInterface }) {
        // acces to your config ...
        // config.db.*
    }

}
```
