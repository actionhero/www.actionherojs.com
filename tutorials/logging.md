## Overview

Actionhero uses the **[Winston logger](https://github.com/flatiron/winston)**. This allows for better, more customizable logging. With one simple `log` command provided by Actionhero, you can log to files, the console, and more!

## Levels

```ts
import { log } form 'actionhero'

log("hello"); // will use the default, 'info' level
log("debug message", "debug"); // will not show up unless you have configured your logger in this NODE_ENV to be debug
log("OH NO", "emerg"); // will show up in all logger levels
log("the params were", "info", data.params); // you can log objects too
```

Note that you can set a `level` which indicates which level (and those above it) you wish to log per transport. The log levels are:

- 0=debug
- 1=info
- 2=notice
- 3=warning
- 4=error
- 5=crit
- 6=alert
- 7=emerg

You can customize these via `config.logger.levels` and `config.logger.colors`. See [Winston's documentation for more information](https://github.com/winstonjs/winston#using-custom-logging-levels)

For example, if you set the logger's level to "notice", you would also see "crit" messages, but not "debug" messages.

To invoke the logger from your code, use: `log(message, severity, metadata)`. Learn more [here](api.html#.log)

## Defaults

```ts
const cluster = require("cluster");
const winston = require("winston");

// learn more about winston v3 loggers @
// - https://github.com/winstonjs/winston
// - https://github.com/winstonjs/winston/blob/master/docs/transports.md

function buildConsoleLogger(level = "info") {
  return function(config) {
    return winston.createLogger({
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.colorize(),
        winston.format.printf(info => {
          return `${config.process.id} @ ${info.timestamp} - ${info.level}: ${
            info.message
          } ${stringifyExtraMessagePropertiesForConsole(info)}`;
        })
      ),
      level,
      levels: winston.config.syslog.levels,
      transports: [new winston.transports.Console()]
    });
  };
}

function stringifyExtraMessagePropertiesForConsole(info) {
  const skippedProperties = ["message", "timestamp", "level"];
  let response = "";

  for (const key in info) {
    const value = info[key];
    if (skippedProperties.includes(key)) {
      continue;
    }
    if (value === undefined || value === null || value === "") {
      continue;
    }
    response += `${key}=${value} `;
  }

  return response;
}

function buildFileLogger(
  path,
  level = "info",
  maxFiles = undefined,
  maxsize = 20480
) {
  return function(config) {
    const filename = `${path}/${config.process.id}-${config.process.env}.log`;

    return winston.createLogger({
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
      ),
      level,
      levels: winston.config.syslog.levels,
      transports: [
        new winston.transports.File({
          filename,
          maxsize,
          maxFiles
        })
      ]
    });
  };
}

export const DEFAULT = {
  logger: config => {
    const loggers = [];

    if (cluster.isMaster) {
      loggers.push(buildConsoleLogger());
    }

    config.general.paths.log.forEach(p => {
      loggers.push(buildFileLogger(p));
    });

    return {
      loggers,

      // the maximum length of param to log (we will truncate)
      maxLogStringLength: 100
    };
  }
};

export const test = {
  logger: config => {
    const loggers = [];

    config.general.paths.log.forEach(p => {
      loggers.push(buildFileLogger(p, "debug", 1));
    });

    return {
      loggers
    };
  }
};
```

In your `config/logger.js`, you can customize which `transports` you would like the logger to use. If none are provided, a default logger which only will print to stdout will be used. See winston's documentation for all the logger types, but know that they include console, file, s3, Riak, and more.

You can set a transport directly, IE `new (winston.transports.Console)()` or in a function which will be passed the `api` object like the examples above. The benefit of using the function invocation is you will have access to other methods and configuration options (like the title of the process).
