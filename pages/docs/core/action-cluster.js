import React from 'react'
import DocsPageWithNav from './../../../pageClasses/docsPageWithSideNav.js'
import { Row, Col } from 'react-bootstrap'
import DocsPage from './../../../components/layouts/docsPage.js'

import Code from './../../../components/code.js'

const RPC =
`// This will ask all nodes connected to the cluster if they have connection #\`abc123\` and if they do, run \`connection.set('auth', true)\` on it
api.connections.apply('abc123', 'set', ['auth', true], function(error){
  // do stuff
});
`

const PubSub =
`// To subscribe to messages, add a callback for your \`messageType\`, IE:
api.redis.subscriptionHandlers['myMessageType'] = function(message){
  // do stuff
}

// send a message
var payload = {
  messageType: 'myMessageType',
  serverId: api.id,
  serverToken: api.config.general.serverToken,
  message: 'hello!',
}
api.redis.publish(payload)`

export default class extends DocsPageWithNav {
  constructor (props) {
    super(props)

    this.state = {
      titleSection: {
        title: 'Core: Action Cluster',
        icon: '/static/images/cluster-ready.svg'
      },
      sections: {
        'overview': 'Overview',
        'cache': 'Cluster Cache',
        'rpc': 'Cluster RPC',
        'connections': 'Clustered Connections',
        'pubsub': 'Generic Pub/Sub'
      },
      links: [
        {link: '/docs/core/cache', title: '» Core: Cache'},
        {link: '/docs/core/cli', title: '« Core: CLI'}
      ]
    }
  }

  render () {
    return (
      <DocsPage sideNav={this.state.sections} titleSection={this.state.titleSection} links={this.state.links} currentSection={this.state.currentSection}>
        <Row>
          <Col md={12}>
            { this.section('overview',
              <div>
                <p><strong><em>AKA: Running ActionHero in a Cluster</em></strong></p>
                <p>ActionHero can be run either as a solitary server or as part of a cluster.  The goal of these cluster helpers is to allow you to create a group of servers which will share state and each be able to handle requests and run tasks.  You can add or remove nodes from the cluster without fear of data loss or task duplication.  You can also run many instances of ActionHero on the same server using node.js cluster methods (<code>ActionHero start cluster</code>), which you <a href='/docs/deployment/#production-notes'>can learn more about here</a>.</p>
                <p>Cluster instances are named sequentially, starting with actionhero-worker-1, and can be retrieved from 'api.id'. Logs and PID's, as well as other instance-specific information follow this pattern as well.</p>

              </div>
            )}

            { this.section('cache',
              <div>
                <p>Using a <a href='http://redis.io'>redis</a> backend, ActionHero nodes share memory objects (using the <code>api.cache methods</code>) and have a common queue for tasks. This means that all peers will have access to all data stored in the cache.  The task system also becomes a common queue which all peers will work on draining.  There should be no changes required to deploy your application in a cluster.</p>
                <p>Keep in mind that many clients/server can access a cached value simultaneously, so build your actions carefully not to have conflicting state.  You can <a href='/docs/core/#cache-overview'>learn more about the cache methods here</a>.  You can also <a href='/docs/deployment/production'>review recommendations about Production Redis configurations</a>.</p>
              </div>
            )}

            { this.section('rpc',
              <div>
                <Code>{RPC}</Code>
                <p>In version 9.0.0, ActionHero introduced Remote Procedure Calls, or RPC for short.  You can call an RPC method to be executed on all nodes in your cluster or just a node which holds a specific connection.  You can call RPC methods with the <code>api.redis.doCluster</code> method.  If you provide the optional callback, you will get the first response back (or a timeout error).  RPC calls are invoked with <code>api.redis.doCluster(method, args, connectionId, callback)</code>.</p>
                <p>For example, if you wanted all nodes to log a message, you would do: <code>api.redis.doCluster('api.log', [&quot;hello from &quot; + api.id]);</code></p>
                <p>If you wanted the node which holds connection <code>abc123</code> to change their <code>authorized</code> status (perhaps because your room authentication relies on this), you would do:</p>
                <p>The RPC system is used heavily by Chat.</p>
                <p>Two options have been added to the <code>config/redis.js</code> config file to support this: <code>api.config.general.channel</code> ( Which channel to use on redis pub/sub for RPC communication ) and <code>api.config.general.rpcTimeout</code> ( How long to wait for an RPC call before considering it a failure )</p>
                <p><strong>WARNING</strong></p>
                <p>RPC calls are authenticated against <code>api.config.serverToken</code> and communication happens over redis pub/sub. BE CAREFUL, as you can call <em>any</em> method within the API namespace on an ActionHero server, including shutdown() and read <em>any</em> data on that node.</p>
              </div>
            )}

            { this.section('connections',
              <div>
                <p>Some special RPC tools have been added so that you can interact with connections across multiple nodes.  Specifically the chat sub-system needs to be able to boot and move connections into rooms, regardless of which node they are connected to.</p>
                <p>ActionHero has exposed <code>api.connections.apply</code> which can be used to retrieve data about and modify a connection on any node.</p>

                <h3><code>api.connections.apply(connectionId, method, args, callback)</code></h3>
                <ul>
                  <li>connectionId is required</li>
                  <li>if <code>method</code> and <code>args</code> can be ignored if you just want to retrieve information about a connection, IE: <code>api.connections.apply(connectionId, callback)</code></li>
                  <li><code>callback</code> is of the form <code>{'function(error, connectionDetails)'}</code></li>
                </ul>

              </div>
            )}

            { this.section('pubsub',
              <div>
                <Code>{PubSub}</Code>
                <p>ActionHero also uses redis to allow for pub/sub communication between nodes.</p>
                <p>You can broadcast and receive messages from other peers in the cluster:</p>

                <h3><code>api.redis.publish(payload)</code></h3>
                <ul>
                  <li>payload must contain:
                    <ul>
                      <li><code>messageType</code> : the name of your payload type,</li>
                      <li><code>serverId</code> : <code>api.id</code>,</li>
                      <li><code>serverToken</code> : <code>api.config.general.serverToken</code>,</li>
                    </ul>
                  </li>
                </ul>
              </div>
            )}
          </Col>
        </Row>
      </DocsPage>
    )
  }
}
