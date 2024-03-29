## Overview

Actionhero uses the **[Winston logger](https://github.com/flatiron/winston)**. This allows for better, more customizable logging. With one simple `log` command provided by Actionhero, you can log to files, the console, and more!

To invoke the logger from your code, use:

```ts
import { log } from "actionhero";

log(message: string, severity: string, metadata: any);
```

For example:

```ts
import { log } from "actionhero";

log("hello"); // will use the default, 'info' level
log("debug message", "debug"); // will not show up unless you have configured your logger in this NODE_ENV to be debug
log("OH NO", "emerg"); // will show up in all logger levels
log("the params were", "info", { key: "k", value: "v" }); // you can log objects too
```

The log messages above would produce the following in the console:

```bash
2021-09-07T17:16:48.826Z - info: hello
# note the debug message did not appear
2021-09-07T17:16:48.827Z - emerg: ON NO
2021-09-07T17:16:48.828Z - info: the params were key=k value=v
```

## Levels

You can set a `level` which indicates which level (and those above it) you wish to log per transport. Each logger in Actionhero has it's own level. That means that each logger (eg a file or the console - STDERR and STDOUT) will ignore or print messages it chooses to be relevant. By default, `info` and above messages are shown while `debug` messages are not shown. If you are using the default logger config in `./src/config/logger.ts` (see below), you can use `process.env.LOG_LEVEL` to change the level that both the default console and file logger log at. e.g.: `LOG_LEVEL=debug npm run dev` would run development mode with the log level increased to `debug` and you would see the previously ignored `debug` log messages.

The log levels in order from highest priority to lowest are: `["emerg", "alert", "crit", "error", "warning", "notice", "info", "debug"]`. For example, if you set the logger's level to "notice", you would see "crit" messages, but not "debug" messages. The default log level of the console logger is `"info"`, so by default you would see all messages except for `"debug"` messages.

## Loggers

You can access the loggers you build up directly, getting the Winston Logger objects from `import { loggers } from "actionhero"` once your server has started.

## Defaults

In your [`config/logger.js`](https://github.com/actionhero/actionhero/blob/main/src/config/logger.ts), you can customize which `transports` you would like the logger to use. If none are provided, a default logger which only will print to stdout will be used. See winston's documentation for all the logger types, but know that they include console, file, s3, Riak, and more.

You can set a transport directly, IE `new (winston.transports.Console)()` or in a function which will be passed the `api` object like the examples above. The benefit of using the function invocation is you will have access to other methods and configuration options (like the title of the process).
