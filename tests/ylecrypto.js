var assert = require('assert'),
  ylecrypto = require('../lib/ylecrypto'),
  testconfig = require('../config1');

describe('ylecrypto', function () {
  it('should decrypt media urls', function(done) {
    var result = 'http://areenahdfi-vh.akamaihd.net/i/fi/b8/b86fa488d63f18b5930b5c7123f41aea_,148480,397312,640000,993280,.mp4.csmil/master.m3u8?hdnea=st=1431964909~exp=1431965209~acl=/i/fi/b8/b86fa488d63f18b5930b5c7123f41aea_*~hmac=4757b4b97bec0b890dc949c2f16b671513d97e01acd25aa9eac44c72cb00606d';
    var input = 'r8R6VwcCw9k1297L1KwLV6fHTkqHC8xBlehhWARvsfmNKlropCRsYyYkenLh4NDWw4k+S+IzmA6PVYr1uhsTTMq8P1xwHTWpOZTYLwq3WGBHp1w08PU+CS07hFzF8jc59/J3NypzWF2W8M7xDAxhr0uNynq/8pNJ2NURFdspSIQnXgZqRnNK0q+FzGU+lIpGx9H8uUAxV5Qo5FL8L27n60ridVbbgZ34aicTdwv/u1wTnx/aLjikV1tnqG1UfVTQ3/7CFUJUa903udl12Ppar5O5aB+1LLFQxHk07VA7EWLCGCS9N7CZ1c5vV+eAzQ7kBYvi/TocKRYcv5ILU60j9LnIXkqJWyPbLE1oItZ4umDR9E/F9A6ujiYxAVshXhXHaD7a7rYE6hTV4rI+la7WAg==';
    var decryptedResult = ylecrypto.decryptMediaUrl(input, testconfig.MEDIA_DECRYPT_KEY);
    assert.ok(decryptedResult == result);
    done();
  });
});
