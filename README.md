Simple promise based API client for YLE API http://developer.yle.fi/

by [@joonapaak](twitter.com/joonapaak)

```
var YleAPI = require('yleapi');

var api = new YleAPI({
	APP_ID: 'appid',
	APP_KEY: 'appkey'
});


api.get('programs/categories')
.then(function(response) {
	// do stuff
})
.catch(function(error) {
	console.log("got error, error.statusCode, error.responseBody");
})
```
