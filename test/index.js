'use strict'

const should = require('should')
const createDiff = require('..')

const FIXTURE = {
  FIRST: [
    {id: 1, foo: 'bar'},
    {id: 1, foo: 'barz'},
    {id: 1, foo: 'baaz'}
  ],
  SECOND: [
    {id: 1, foo: 'bar'},
    {id: 1, foo: 'baarz'},
    {id: 1, foo: 'bax'}
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
      ids: ['id', 'foo']
    }, function (err, result) {
      should(err).be.null()
      result.added.should.be.eql([{ id: 1, foo: 'baarz' }, { id: 1, foo: 'bax' }])
      result.removed.should.be.eql([{ id: 1, foo: 'barz' }, { id: 1, foo: 'baaz' }])
      result.common.should.be.eql([{ id: 1, foo: 'bar' }])
      done()
    })
  })
})
