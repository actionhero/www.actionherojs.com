module.exports = {
  exportPathMap: function () {
    return {
      '/': { page: '/' },
      '/index': { page: '/index' },
      '/community': { page: '/community' },
      '/docs': { page: '/docs' },
      '/downloads': { page: '/downloads' },
      '/get-started': { page: '/get-started' },
      '/solutions': { page: '/solutions' },
      '/terms': { page: '/terms' },

      '/docs/core': { page: '/docs/core/' },
      '/docs/core/action-cluster': { page: '/docs/core/action-cluster' },
      '/docs/core/actions': { page: '/docs/core/actions' },
      '/docs/core/api-object': { page: '/docs/core/api-object' },
      '/docs/core/cache': { page: '/docs/core/cache' },
      '/docs/core/chat': { page: '/docs/core/chat' },
      '/docs/core/cli': { page: '/docs/core/cli' },
      '/docs/core/config': { page: '/docs/core/config' },
      '/docs/core/file-server': { page: '/docs/core/file-server' },
      '/docs/core/initializers': { page: '/docs/core/initializers' },
      '/docs/core/localization': { page: '/docs/core/localization' },
      '/docs/core/logging': { page: '/docs/core/logging' },
      '/docs/core/middleware': { page: '/docs/core/middleware' },
      '/docs/core/plugins': { page: '/docs/core/plugins' },
      '/docs/core/servers': { page: '/docs/core/servers' },
      '/docs/core/tasks': { page: '/docs/core/tasks' },
      '/docs/core/utils': { page: '/docs/core/utils' },

      '/docs/ops': { page: '/docs/ops/' },
      '/docs/ops/development-mode': { page: '/docs/ops/development-mode' },
      '/docs/ops/production-notes': { page: '/docs/ops/production-notes' },
      '/docs/ops/running-actionhero': { page: '/docs/ops/running-actionhero' },
      '/docs/ops/testing': { page: '/docs/ops/testing' },
      '/docs/ops/upgrade-path': { page: '/docs/ops/upgrade-path' },

      '/docs/servers': { page: '/docs/servers/' },
      '/docs/servers/socket': { page: '/docs/servers/socket' },
      '/docs/servers/web': { page: '/docs/servers/web' },
      '/docs/servers/websocket': { page: '/docs/servers/websocket' }
    }
  }
}
