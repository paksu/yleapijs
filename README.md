Simple promise based API client for YLE API http://developer.yle.fi/

by [@joonapaak](http://twitter.com/joonapaak)

```
var YleAPI = require('yleapi');

var api = new YleAPI({
    APP_ID: 'appid',
    APP_KEY: 'appkey',
    MEDIA_DECRYPT_KEY: 'secret' // not required to use HTTP API but needed if you want to decrypt media urls
});
```

### API
```
// get and filter stuff from a single endpoint
// returns a promise
api.get('resource/path', {params})

// decrypt media urls with your secret key
// returns the encrypted url
api.decryptMediaUrl(encryptedUrl)
```

###Examples
```
// get most popular programs
api.get('programs/items', {
    order: 'playcount.24h:desc',
    offset: 150
}).then(function(response) {
    // do stuff with the result
    console.log(response.meta);
    console.log(response.data);
})
.catch(function(error) {
    console.log("got error", error.statusCode, error.responseBody);
})


// get a program and decrypt media url
api.get('media/playouts', {
  program_id: '1-820561',
  media_id: '6-8e9d45c1221544f3be76394fa1a6a102',
  protocol: 'HLS'
}).then(function(response) {
  var mediaUrl = api.decryptMediaUrl(response.data[0].url);
});

```

### Logging
YleAPI uses `util.debuglog`. To requests run your script with `NODE_DEBUG`:

`$ env NODE_DEBUG=yleapi node myscript.js`

### Develop

Run tests: `$ npm test`
