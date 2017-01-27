'use strict'

const json = require('json-future')
const diff = require('hyperdiff')
const redis = require('redis')

const exists = (val) => val != null
const noop = () => {}

function createDiff (opts) {
  const client = redis.createClient(opts)

  function set (opts, cb = noop) {
    const {key, value} = opts
    if (!exists(key)) return cb(TypeError('Need to provide a key.'))
    if (!exists(value)) return cb(TypeError('Need to provide a value.'))

    json.stringifyAsync(value, function (err, stringified) {
      if (err) return cb(err)
      return client.set(key, stringified, cb)
    })
  }

  function get (opts, cb = noop) {
    const {key} = opts
    if (!exists(key)) return cb(TypeError('Need to provide a key.'))

    client.get(key, function (err, value) {
      if (err) return cb(err)
      if (!exists(value)) return cb(null, [])
      return json.parseAsync(value, cb)
    })
  }

  function compare (opts, cb = noop) {
    const {key, value, ids} = opts
    if (!exists(key)) return cb(TypeError('Need to provide a key.'))
    if (!exists(value)) return cb(TypeError('Need to provide a value.'))
    if (!exists(ids)) return cb(TypeError('Need to provide a id.'))

    get({key}, function (err, data) {
      if (err) return cb(err)
      return cb(null, diff(data, value, ids))
    })
  }

  return {set, get, compare, client}
}

module.exports = createDiff
