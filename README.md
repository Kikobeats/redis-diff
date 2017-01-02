# redis-diff

![Last version](https://img.shields.io/github/tag/Kikobeats/redis-diff.svg?style=flat-square)
[![Build Status](https://img.shields.io/travis/Kikobeats/redis-diff/master.svg?style=flat-square)](https://travis-ci.org/Kikobeats/redis-diff)
[![Coverage Status](https://img.shields.io/coveralls/Kikobeats/redis-diff.svg?style=flat-square)](https://coveralls.io/github/Kikobeats/redis-diff)
[![Dependency status](https://img.shields.io/david/Kikobeats/redis-diff.svg?style=flat-square)](https://david-dm.org/Kikobeats/redis-diff)
[![Dev Dependencies Status](https://img.shields.io/david/dev/Kikobeats/redis-diff.svg?style=flat-square)](https://david-dm.org/Kikobeats/redis-diff#info=devDependencies)
[![NPM Status](https://img.shields.io/npm/dm/redis-diff.svg?style=flat-square)](https://www.npmjs.org/package/redis-diff)
[![Donate](https://img.shields.io/badge/donate-paypal-blue.svg?style=flat-square)](https://paypal.me/Kikobeats)

> Perform a diff comparison backed by redis.

## Install

```bash
$ npm install redis-diff --save
```

## Usage

```js
const diff = createDiff()
const noop = () => {}

diff.set({
  key: 'mykey',
  value: [
    {foo: 'bar'},
    {foo: 'barz'},
    {foo: 'baaz'}
  ]
}, noop)

diff.compare({
  key: 'mykey',
  value: [
    {foo: 'bar'},
    {foo: 'baarz'},
    {foo: 'bax'}
  ],
  id: 'foo'
}, console.log)

// {
//   added: [ { foo: 'baarz' }, { foo: 'bax' } ],
//   removed: [ { foo: 'barz' }, { foo: 'baaz' } ],
//   common: [ { foo: 'bar' } ]
// }
```

## License

MIT © [Kiko Beats](https://github.com/Kikobeats).
