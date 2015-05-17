var Promise = require('q'),
      https = require('https'),
      zlib  = require('zlib');
      url  = require('url'),
      extend  = require('extend');

var API_ROOT = 'external.api.yle.fi';
var API_VERSION = 'v1';

var YleAPI = function(config) {
  ['APP_ID', 'APP_KEY'].forEach(function(key) {
    if(key in config) {}
    else {
      throw new Error("YleAPI missing config key: ", key);
    }
  });

  this.config = config;
  this.config.api_root = API_ROOT;
};

YleAPI.prototype = {
  get: function (path, params) {
    var fullPath = url.format({
      pathname: "/" + API_VERSION + "/" + path + ".json",
      query: extend({}, params, {
        app_id: this.config.APP_ID,
        app_key: this.config.APP_KEY
      })
    });
    return this.request('GET', fullPath);
  },

  request: function(method, path) {
    var deferred = Promise.defer();
    var options = {
      hostname: API_ROOT,
      port: 443,
      path: path,
      method: method,
      headers: {
        'Accept-Encoding': 'gzip'
      }
    };

    https.request(options, function(response) {
      var responseBody = "";
      var output;

      if(response.headers['content-encoding'] == 'gzip' ) {
        var gzip = zlib.createGunzip();
        response.pipe(gzip);
        output = gzip;
      } else {
        output = response;
      }

      response.on('error', function(error) {
        deferred.reject({
          statusCode: "UNKNOWN ERROR",
          responseBody: error.message
        });
      });

      output.on('data', function (data) {
        data = data.toString('utf-8');
        responseBody += data;
      });

      output.on('end', function() {
        if(response.statusCode > 201) {
          deferred.reject({
            statusCode: response.statusCode,
            responseBody: responseBody
          });
        } else {
          // TODO: what should happen when response is empty?
          deferred.resolve(JSON.parse(responseBody));
        }
      });

    }).end();

    return deferred.promise;
  }
};

module.exports = YleAPI;
