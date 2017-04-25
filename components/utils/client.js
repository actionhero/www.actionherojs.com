require('isomorphic-fetch') // ensure fech is in-scope, even on the server

let hosts = {
  dev: 'http://localhost:8080',
  production: 'https://api.scoreboard.guru'
}

export default class Client {
  apiEndpoint () {
    if (process && process.title === 'node') {
      // request coming from node server
      if (process.env.NODE_ENV === 'production') { return hosts.production }
      return hosts.dev
    } else {
      // request coming from client browser
      let parts = window.location.host.split('.')
      if (parts[0] === 'www') {
        parts.shift()
        return hosts.production
      } else {
        return hosts.dev
      }
    }
  }

  // this should be overwritten by the parent with something fancier.
  notify (message, level) {
    let reporter = 'log'
    if (level === 'error' || level === 'warning') {
      reporter = 'error'
      this.error = message
    }
    console[reporter](level, message)
  }

  actionPromise (data, path, verb) {
    let self = this

    return new Promise(function (resolve, reject) {
      self.action(data, path, verb, (response) => {
        return resolve(response)
      }, (error) => {
        reject(error)
      })
    })
  }

  action (data, path, verb, successCallback, errorCallback) {
    let i

    // TODO
    // $('button').prop('disabled', true)

    if (typeof successCallback !== 'function') {
      successCallback = (response) => {
        let successMessage = 'OK!'
        if (response.message) { successMessage = response.message }
        this.notify(successMessage, 'success')
      }
    }

    if (typeof errorCallback !== 'function') {
      errorCallback = (errorMessage, error) => {
        this.notify(errorMessage, 'warning')
        return Promise.reject(error)
      }
    }

    for (i in data) {
      if (data[i] === null || data[i] === undefined) { delete data[i] }
    }

    let options = {
      credentials: 'include',
      method: verb,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }

    if (data.locale) {
      options.headers['locale'] = data.locale
    }

    if (Object.keys(data).length > 0 && (verb.toUpperCase() === 'GET') && path.indexOf('?') < 0) {
      path += '?'
      for (i in data) {
        if (data[i]) {
          path += i + '=' + data[i] + '&'
        }
      }
    }

    if (verb.toUpperCase() === 'GET') {
      //
    } else if (data.file) {
      delete options.headers
      options.body = new FormData()
      for (i in data) {
        if (data[i]) {
          options.body.append(i, data[i])
        }
      }
    } else {
      options.body = JSON.stringify(data)
    }

    function parseJSON (response) {
      return response.json()
    }

    fetch(this.apiEndpoint() + path, options).then(parseJSON).then(function (response) {
      // $('button').prop('disabled', false)
      if (response.error) { return errorCallback(response.error) }
      return successCallback(response)
    }).catch(function (error) {
      // $('button').prop('disabled', false)
      if (error) { return errorCallback(error.toString(), error) }
    })
  }
}
