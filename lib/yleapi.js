var Promise = require('q'),
      https = require('https'),
      zlib  = require('zlib');

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

    // clone `params` object so we can modify it without modifying the user's reference
    var paramsClone = JSON.parse(JSON.stringify(params));

    var fullPath = "/" + API_VERSION + "/" + path + ".json";
    var x = this.request('GET', fullPath, params);
    return x;

  },

  request: function(method, path, params) {
    var deferred = Promise.defer();
    var options = {
      hostname: 'external.api.yle.fi',
      port: 443,
      path: path,
      method: method
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
          deferred.resolve(JSON.parse(responseBody));
        }
      });

    }).end();

    return deferred.promise;
  }
};

module.exports = YleAPI;
