## Overview

Tasks are background jobs meant to be run separately from a client's request. They can be started by an action or by the server itself. With Actionhero, there is no need to run a separate daemon to process these jobs. Actionhero uses the [node-resque](https://github.com/actionhero/node-resque) package to store and process tasks in a way compatible with the [resque](https://github.com/resque/resque) ecosystem.

There are 3 types of tasks Actionhero can process: `normal`, `delayed`, and `periodic`.

- `normal` tasks are enqueued and processed one-by-one by the task TaskProcessors
- `delayed` tasks are enqueued in a special `delayed` queue to only be processed at some time in the future (defined either by a timestamp in ms or milliseconds-from-now)
- `periodic` tasks are like delayed tasks, but they run on a set frequency (e.g. every 5 minutes).
  - Periodic tasks can take no input parameters.

## Enqueing Tasks

Here are examples of the 3 ways to programmatically enqueue a task:

```ts
import { task } from "actionhero";

// Enqueue the task now, and process it ASAP
await task.enqueue("sendWelcomeEmail", { to: "evan@actionherojs.com" });

// Enqueue the task now, and process it once \`timestamp\` has arrived
await task.enqueueAt(10000, "sendWelcomeEmail", {
  to: "evan@actionherojs.com",
});

// Enqueue the task now, and process it once \`delay\` (ms) has passed
await task.enqueueIn(10000, "sendWelcomeEmail", {
  to: "evan@actionherojs.com",
});
```

`sendWelcomeEmail` should be a task defined in the project, and `{to: 'evan@actionherojs.com'}` are arguments to that task. This task will be processed by TaskProcessors assigned to the "default" queue.

You can also enqueue tasks to be run at some time in the future (timestamp is in ms): `enqueueAt` asks for a timestamp (in ms) to run at, and `enqueueIn` asks for the number of ms from now to run.

The final type of task, periodic tasks, are defined with a `task.frequency` of greater than 0, and are loaded in by Actionhero when it boots. You cannot modify these tasks once the server is running.

## Processing Tasks

```ts
// From /config/tasks.js:

export const DEFAULT = {
  tasks: (config) => {
    return {
      _toExpand: false,

      // Should this node run a scheduler to promote delayed tasks?
      scheduler: false,

      // what queues should the taskProcessors work?
      queues: ["*"],
      // Or, rather than providing a static list of `queues`, you can define a method that returns the list of queues.
      // queues: async () => { return ["queueA", "queueB"]; },

      // Logging levels of task workers
      workerLogging: {
        failure: "error", // task failure
        success: "info", // task success
        start: "info",
        end: "info",
        cleaning_worker: "info",
        poll: "debug",
        job: "debug",
        pause: "debug",
        internalError: "error",
        multiWorkerAction: "debug",
      },
      // Logging levels of the task scheduler
      schedulerLogging: {
        start: "info",
        end: "info",
        poll: "debug",
        enqueue: "debug",
        reEnqueue: "debug",
        working_timestamp: "debug",
        transferred_job: "debug",
      },
      // how long to sleep between jobs / scheduler checks
      timeout: 5000,
      // at minimum, how many parallel taskProcessors should this node spawn?
      // (have number > 0 to enable, and < 1 to disable)
      minTaskProcessors: 0,
      // at maximum, how many parallel taskProcessors should this node spawn?
      maxTaskProcessors: 0,
      // how often should we check the event loop to spawn more taskProcessors?
      checkTimeout: 500,
      // how many ms would constitute an event loop delay to halt taskProcessors spawning?
      maxEventLoopDelay: 5,
      // how long before we mark a resque worker / task processor as stuck/dead?
      stuckWorkerTimeout: 1000 * 60 * 60,
      // should the scheduler automatically try to retry failed tasks which were failed due to being 'stuck'?
      retryStuckJobs: false,
      // Customize Resque primitives, replace null with required replacement.
      resque_overrides: {
        queue: null,
        multiWorker: null,
        scheduler: null,
      },
      connectionOptions: {
        tasks: {},
      },
    };
  },
};
```

To work these tasks, you need to run Actionhero with at least one `taskProcessor`. `TaskProcessor`s run in-line with the rest of your server and process jobs. This is controlled by settings in [/config/tasks.js](https://github.com/Actionhero/Actionhero/blob/master/src/config/tasks.ts).

If you are enqueuing delayed or periodic tasks, you also need to enable the scheduler. This is a part of Actionhero that will periodically check the delayed queues for jobs that are ready to work now, and move them to the normal queues when the time comes.

Because node and Actionhero are asynchronous, we can process more than one job at a time. However, if the jobs we are processing are CPU-intensive, we want to limit how many we are working on at one time. To do this, we tell Actionhero to run somewhere between `minTaskProcessors` and `maxTaskProcessors` and check every so often if the server could be working more or less jobs at a time. Depending on the response characteristics you want for your server, you can modify these values.

In production, it is best to set up some Actionhero servers that only handle requests from clients (that is, servers with no TaskProcessors) and others that handle no requests, and only process jobs (that is, no servers, many `TaskProcessor`s).

As you noticed above, when you enqueue a task, you tell it which queue to be enqueued within. This is so you can separate load or priority. For example, you might have a `high` priority queue which does jobs like "sendPushMessage" and a `low` priority queue which does a task like "cleanupCache". You tell the `taskProcessor`s which jobs to work, and in which priority. For the example above, you would ensure that all `high` jobs happen before all `low` jobs by setting: `config.tasks.queues = ['high', 'low']`. You could also configure more nodes to work on the `high` queue than the `low` queue, thus further ensuring that `high` priority jobs are processed faster and sooner than `low` priority jobs.

Alternatively, `config.tasks.queues` can be an async function, so you can set the list of queues to work on this server dynamically.

## Creating A Task

An few ways to define a task:

```ts
// define a single task in a file
import { Task } from "actionhero";
import { sendWelcomeEamail } from "./../modules/email";

export class SendWelcomeMessage extends Task {
  constructor() {
    super();
    this.name = "SendWelcomeEmail";
    this.description = "I send the welcome email to new users";
    this.frequency = 0;
    this.queue = "high";
    this.middleware = [];
  }

  async run(data) {
    await sendWelcomeEmail({ address: data.email });
    return true;
  }
}
```

You can also define more than one task in a file, exporting each with a separate `exports` directive, ie:.

```ts
import { Task } from "actionhero";

export class SayHello extends Task {
  constructor() {
    super();
    this.name = "sayHello";
    this.description = "I say hello";
    this.frequency = 1000;
    this.queue = "low";
    this.middleware = [];
  }

  async run() {
    api.log("hello");
  }
}

export class SayGoodbye extends Task {
  constructor() {
    super();
    this.name = "sayGoodbye";
    this.description = "I say goodbye";
    this.frequency = 2000;
    this.queue = "low";
    this.middleware = [];
  }

  async run() {
    api.log("goodbye");
  }
}
```

Output of the above:

```bash
# The output of running the last 2 tasks would be:

2013-11-28 15:21:56 - debug: resque scheduler working timestamp 1385680913
2013-11-28 15:21:56 - debug: resque scheduler enqueuing job 1385680913 class=sayHello, queue=default,
2013-11-28 15:21:56 - debug: resque scheduler working timestamp 1385680914
2013-11-28 15:21:56 - debug: resque scheduler enqueuing job 1385680914 class=sayGoodbye, queue=default,
2013-11-28 15:21:56 - debug: resque worker #1 working job default class=sayHello, queue=default,
2013-11-28 15:21:56 - info: hello
2013-11-28 15:21:56 - debug: re-enqueued recurrent job sayHello
2013-11-28 15:21:56 - debug: resque worker #1 working job default class=sayGoodbye, queue=default,
2013-11-28 15:21:56 - info: goodbye
2013-11-28 15:21:56 - debug: re-enqueued recurrent job sayGoodbye
```

You can create you own tasks by placing them in a `./tasks/` directory at the root of your application. You can use the generator `actionhero generate task --name=myTask`. Like actions, all tasks have some required metadata:

- `task.name`: The unique name of your task
- `task.description`: a description
- `task.queue`: the default queue to run this task within (can be overwritten when enqueued)
- `task.frequency`: In milliseconds, how often should I run?. A frequency of `> 0` denotes this task as periodic and Actionhero will automatically enqueued when the server boots. Only one instance of a periodic task will be enqueued within the cluster at a time, regardless of how many Actionhero nodes are connected.
- `task.middleware`: middleware modify how your tasks are enqueued. For example, if you use the `queue-lock` plugin, only one instance of any job (with similar arguments) can be enqueued at a time. You can [learn more about middleware here](tutorial-middleware.html)

`task.run` contains the actual work that the task does. It takes the following arguments:

- `params`: An array of parameters that the task was enqueued with. This is whatever was passed as the second argument to `api.tasks.enqueue`.

Throwing an error will stop the task, and log it as a failure in resque, which you can inspect via the various [tasks](api.tasks.html) methods. If a periodic task throws an error, it will not be run again.

## Task Inputs

Just like [Actions](/tutorials/actions), you can optionally define the inputs your task expects.
Inputs can be:

- required
- default
- validated

Unlike actions, we don’t need a formatter, as the inputs should already be of the proper type, coming from the server. We can check the inputs at `enqueue` rather than at runtime. This will ensure that no task without the required inputs is enqueued.

For example, with this task:

```ts
import { Task } from "actionhero";

class SendWelcomeEmail extends Task {
  constructor() {
    super();
    this.name = "sendWelcomeEmail";
    this.description = "send a new user a welcome email";
    this.queue = "email";
    this.frequency = 0;
    this.inputs = {
      email: { required: true },
      template: { required: true, default: "welcome-email-en" },
    };
  }

  async run(params) {
    // send the email
  }
}
```

- `await task.enqueue('sendWelcomeEmail')` would throw an error, as "email" is a required input
- `await task.enqueue('sendWelcomeEmail', {email: 'evan@actionherojs.com'})` would be ok, and in the task `params.template` would be set to `welcome-email-en` when the task is run, per the defaults.

There are also validators you can use, and like actions, you can throw a custom error or return false to prevent the task from being enqueued, ie:

```ts
import { Task } from "actionhero";

function emailValidator(p) {
  if (p.indexOf("@") < 0) {
    throw new Error("that is not an email address");
  }
}

class SendWelcomeEmail extends Task {
  constructor() {
    super();
    this.name = "sendWelcomeEmail";
    this.description = "send a new user a welcome email";
    this.queue = "email";
    this.frequency = 0;
    this.inputs = {
      email: { required: true, validator: emailValidator },
      template: { required: true, default: "welcome-email-en" },
    };
  }

  async run(params) {
    // send the email
  }
}
```

- `await task.enqueue('sendWelcomeEmail', {email: 'someone'})` would throw an error, as the email is missing the `"@"`
- `await task.enqueue('sendWelcomeEmail', {email: 'evan@actionherojs.com'})` would be ok

## Job Schedules

You may want to schedule jobs every minute/hour/day, like a distributed CRON job. There are a number of excellent node packages to help you with this, like [node-schedule](https://github.com/tejasmanohar/node-schedule) and [node-cron](https://github.com/ncb000gt/node-cron). Actionhero exposes [node-resque's](https://github.com/taskrabbit/node-resque) scheduler to you so you can use the scheduler package of your choice.

Assuming you are running Actionhero across multiple machines, you will need to ensure that only one of your processes is actually scheduling the jobs. To help you with this, you can inspect which of the scheduler processes is correctly acting as master, and flag only the master scheduler process to run the schedule. An [initializer for this](tutorial-initializers.html) would look like:

```ts
// file: initializers/node_schedule.js

import * as schedule from "node-schedule";
import { api, task, Initializer } from "actionhero";

export class Scheduler extends Initializer {
  constructor() {
    super();
    this.name = "scheduler";
  }

  initialize() {
    this.scheduledJobs = [];
  }

  start() {
    // do this job every 10 seconds, cron style
    const job = schedule.scheduleJob("0,10,20,30,40,50 * * * * *", async () => {
      // we want to ensure that only one instance of this job is scheduled in our environment at once,
      // no matter how many schedulers we have running
      if (api.resque.scheduler && api.resque.scheduler.leader) {
        await task.enqueue(
          "sayHello",
          { time: new Date().toString() },
          "default"
        );
      }
    });

    this.scheduledJobs.push(job);
  }

  stop() {
    this.scheduledJobs.forEach((job) => {
      job.cancel();
    });
  }
}
```

Be sure to have the scheduler enabled on at least one of your Actionhero servers!

## Failed Job Management

Sometimes a worker crashes is a severe way, and it doesn't get the time/chance to notify redis that it is leaving the pool (this happens all the time on PAAS providers like Heroku). When this happens, you will not only need to extract the job from the now-zombie worker's "working on" status, but also remove the stuck worker. To aid you in these edge cases, `api.tasks.cleanOldWorkers(age)` is available.

Because there are no 'heartbeats' in resque, it is impossible for the application to know if a worker has been working on a long job or it is dead. You are required to provide an "age" for how long a worker has been "working", and all those older than that age will be removed, and the job they are working on moved to the error queue (where you can then use `api.tasks.retryAndRemoveFailed`) to re-enqueue the job.

You can handle this with an own initializer and the following logic:

```ts
import { log, task } from "actionhero";

const removeStuckWorkersOlderThan = 10000; // 10000ms

log(
  `removing stuck workers solder than ${removeStuckWorkersOlderThan}ms`,
  "info"
);

const result = task.cleanOldWorkers(removeStuckWorkersOlderThan);

if (Object.keys(result).length > 0) {
  log("removed stuck workers with errors: ", "info", result);
}
```

## Testing Tasks

Tasks are expected to be as lean as possible, with most of their logic living in other methods you've created via initializers or middleware (or included via packages). This helps keep your task logic concise, limited to execution and scheduling... and the executing functions easier to test.

Actionhero ships with a method to help you check if a task is enqueued, `api.specHelper.findEnqueuedTasks(taskName)`:

```ts
import { api, task } from "actionhero";

describe("task testing", () => {
  beforeEach(async () => {
    // if you are testing tasks, you likely want to start each test with an empty test redis
    await api.resque.queue.connection.redis.flushdb();
  });

  test("detect that a task was enqueued to run now", async () => {
    await task.enqueue("regularTask", { word: "testing" });
    const found = await api.specHelper.findEnqueuedTasks("regularTask");
    expect(found.length).toEqual(1);
    expect(found[0].args[0].word).toEqual("testing");
    expect(found[0].timestamp).toBeNull();
  });
});
```

## Resque Health

Monitoring the health of your task queues is important. We use [node-resque](https://github.com/actionhero/node-resque) and connect to Redis to store task data. Actionhero promotes a number of methods from node-resque to the task namespace so that you can check the length of your task queues (are they growing? shrinking?), see what the workers are working on, and more. A great starting point is `await task.details()`, an async method which will collect the results of many information queries from resque:

```ts
/**
 * Return wholistic details about the task system, including failures, queues, and workers.
 * Will throw an error if redis cannot be reached.
 */
export async function details(): Promise<{ [key: string]: any }> {
  const details = { queues: {}, workers: {}, stats: null };

  details.workers = await task.allWorkingOn();
  details.stats = await task.stats();
  const queues = await api.resque.queue.queues();

  for (const i in queues) {
    const queue = queues[i];
    const length = await api.resque.queue.length(queue);
    details.queues[queue] = { length: length };
  }

  return details;
}
```

You can then use this information in an action, which you can then hit to check the status of your cluster. The default `status` action does a basic version of this:

```ts
async checkResqueQueues(data) {
  const maxResqueQueueLength = 1000
  const details = await task.details();
  let length = 0;
  Object.keys(details.queues).forEach(q => {
    length += details.queues[q].length;
  });

  if (length > maxResqueQueueLength) {
    // return this information in some way...
  }
}
```

Learn more at https://docs.actionherojs.com/modules/task.html

You can also ask for information about the redis database itself, like how much RAM it is currently using with `api.resque.clients[name-of-client].info()`. Note there are 3 connections to redis, each with a different client name.

## Notes

Note that the `frequency`, `enqueueIn` and `enqueueAt` times are when a task is **allowed** to run, not when it **will** run. TaskProcessors will work tasks in a first-in-first-out manner. TaskProcessors also `sleep` when there is no work to do, and will take some time (default 5 seconds) to wake up and check for more work to do.

Remember that each Actionhero server uses one thread and one event loop, so that if you have computationally intensive task (like computing Fibonacci numbers), this **will** block tasks, actions, and clients from working. However, if your tasks are meant to communicate with external services (reading from a database, sending an email, etc), then these are perfect candidates to be run simultaneously as the single thread can work on other things while waiting for these operations to complete.

If you are running a single Actionhero server, all tasks will be run locally. As you add more servers, the work will be split evenly across all nodes. It is very likely that your job will be run on different nodes each time.
