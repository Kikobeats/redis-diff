'use strict'

const should = require('should')
const createDiff = require('..')

const FIXTURE = {
  FIRST: [
    {foo: 'bar'},
    {foo: 'barz'},
    {foo: 'baaz'}
  ],
  SECOND: [
    {foo: 'bar'},
    {foo: 'baarz'},
    {foo: 'bax'}
  ]
}

describe('redis-diff', function () {
  it('.set', function (done) {
    const diff = createDiff()
    diff.set({
      key: 'mykey',
      value: FIXTURE.FIRST
    }, function (err) {
      should(err).be.null()
      done()
    })
  })

  it('.get', function (done) {
    const diff = createDiff()
    diff.get({
      key: 'mykey'
    }, function (err, value) {
      should(err).be.null()
      value.should.be.eql(FIXTURE.FIRST)
      done()
    })
  })

  it('.compare', function (done) {
    const diff = createDiff()
    diff.compare({
      key: 'mykey',
      value: FIXTURE.SECOND,
      id: 'foo'
    }, function (err, result) {
      console.log(result)
      should(err).be.null()
      result.added.should.be.eql([{ foo: 'baarz' }, { foo: 'bax' }])
      result.removed.should.be.eql([{ foo: 'barz' }, { foo: 'baaz' }])
      result.common.should.be.eql([{ foo: 'bar' }])
      done()
    })
  })
})
