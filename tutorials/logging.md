## Overview

Actionhero uses the **[Winston logger](https://github.com/flatiron/winston)**. This allows for better, more customizable logging. With one simple `log` command provided by Actionhero, you can log to files, the console, and more!

## Levels

```ts
import { log } from "actionhero";

log("hello"); // will use the default, 'info' level
log("debug message", "debug"); // will not show up unless you have configured your logger in this NODE_ENV to be debug
log("OH NO", "emerg"); // will show up in all logger levels
log("the params were", "info", data.params); // you can log objects too
```

Note that you can set a `level` which indicates which level (and those above it) you wish to log per transport. Each logger in Actionhero has it's own level. That means that each logger (eg a file or the console - STDERR and STDOUT) will ignore or print messages it chooses to be relevant. By default, `info` and above messages are shown while `debug` messages are not shown. If you are using the default logger config in `./src/config/logger.ts` (see below), you can use `process.env.LOG_LEVEL` to change the level that both the default console and file logger log at. e.g.: `LOG_LEVEL=debug npm run dev` would run development mode with the log level increased to `debug` and you would see the previously ignored `debug` log messages.

- The default log levels are: `emerg: 0, alert: 1, crit: 2, error: 3, warning: 4, notice: 5, info: 6, debug: 7`.
- Logging levels in winston conform to the severity ordering specified by RFC5424: severity of all levels is assumed to be numerically ascending from most important to least important.
- You can customize these via `config.logger.levels` and `config.logger.colors`. See [Winston's documentation for more information](https://github.com/winstonjs/winston#using-custom-logging-levels)

For example, if you set the logger's level to "notice", you would also see "crit" messages, but not "debug" messages.

To invoke the logger from your code, use: `log(message, severity, metadata)`.

## Loggers

You can access the loggers you build up directly, getting the Winston Logger objects from `import { loggers } from "actionhero"` once your server has started.

## Defaults

```ts
import * as winston from "winston";

/*
import * as winston from "winston";

/*
The loggers defined here will eventually be available via `import { loggers } from "actionhero"`

You may want to customize how Actionhero sets the log level.  By default, you can use `process.env.LOG_LEVEL` to change each logger's level (default: 'info')

learn more about winston v3 loggers @
 - https://github.com/winstonjs/winston
 - https://github.com/winstonjs/winston/blob/master/docs/transports.md
*/

type ActionheroConfigLoggerBuilderArray = Array<
  (config: any) => winston.Logger
>;

export const DEFAULT = {
  logger: (config) => {
    const loggers: ActionheroConfigLoggerBuilderArray = [];
    loggers.push(buildConsoleLogger(process.env.LOG_LEVEL));
    config.general.paths.log.forEach((p) => {
      loggers.push(buildFileLogger(p, process.env.LOG_LEVEL));
    });

    return {
      loggers,
      maxLogStringLength: 100, // the maximum length of param to log (we will truncate)
      maxLogArrayLength: 10, // the maximum number of items in an array to log before collapsing into one message
    };
  },
};

export const test = {
  logger: (config) => {
    const loggers: ActionheroConfigLoggerBuilderArray = [];
    loggers.push(buildConsoleLogger("crit"));
    config.general.paths.log.forEach((p) => {
      loggers.push(buildFileLogger(p, "debug", 1));
    });

    return { loggers };
  },
};

// helpers for building the winston loggers

function buildConsoleLogger(level = "info") {
  return function (config) {
    return winston.createLogger({
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.colorize(),
        winston.format.printf((info) => {
          return `${info.timestamp} - ${info.level}: ${
            info.message
          } ${stringifyExtraMessagePropertiesForConsole(info)}`;
        })
      ),
      level,
      levels: winston.config.syslog.levels,
      transports: [new winston.transports.Console()],
    });
  };
}

function buildFileLogger(path, level = "info", maxFiles = undefined) {
  return function (config) {
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
          maxFiles,
        }),
      ],
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
```

In your `config/logger.js`, you can customize which `transports` you would like the logger to use. If none are provided, a default logger which only will print to stdout will be used. See winston's documentation for all the logger types, but know that they include console, file, s3, Riak, and more.

You can set a transport directly, IE `new (winston.transports.Console)()` or in a function which will be passed the `api` object like the examples above. The benefit of using the function invocation is you will have access to other methods and configuration options (like the title of the process).
