var assert = require('assert'),
  YleAPI = require('../lib/yleapi'),
  testconfig = require('../config1');

describe('ylepi', function () {
  describe('config', function () {
    it('throws when passing empty config', function (done) {
      assert.throws(function () {
        var api = new YleAPI({});
      }, Error);
      done();
    });
  });

  describe('GET \'programs/categories\'', function () {
    var api = null;
    before(function () {
      api = new YleAPI({
        APP_ID: 'a',
        APP_KEY: 'b'
      });
    });

    it('returns a promise', function (done) {
      var promise = api.get('programs', {});
      assert.ok(typeof promise.then === "function");
      assert.ok(typeof promise.catch === "function");
      done();
    });

    describe('has error handling', function () {

      it('returns when request was not successful', function (done) {
        // should fail because our credentials are not valid
        api.get('programs/categories', {}).catch(function(responseStatus, responseBody) {
          done();
        });
      });
    });

    describe('returns data', function () {
      before(function () {
        api = new YleAPI(testconfig);
      });

      it('resolves into parsed response JSON', function (done) {
        // should fail because our credentials are not valid
        api.get('programs/categories', {}).then(function(response) {
          assert.ok(response.meta);
          assert.ok(response.data);
          done();
        });
      });
    });

  });
});
