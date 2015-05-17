var client = require('https');
var options = {
            hostname: 'host.tld',
            path: '/{uri}',
            method: 'GET',
            port: 80,
            headers: {}
          };
pRequest = client.request(options, function(response){
console.log("Code: "+response.statusCode+ "\n Headers: "+response.headers);
response.on('data', function (chunk) {
      console.log(chunk);
});
response.on('end',function(){
      console.log("\nResponse ended\n");
});
response.on('error', function(err){
      console.log("Error Occurred: "+err.message);
});
