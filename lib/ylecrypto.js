var crypto = require('crypto');
var ALGORITHM = 'aes-128-cbc';

var YleCrypto = {};

YleCrypto.decryptMediaUrl = function(encryptedUrlBase64, decryptKey) {
    var encryptedUrl = new Buffer(encryptedUrlBase64, 'base64').toString('hex');
    var decryptKeyHex = new Buffer(decryptKey, 'utf8');
    var iv = new Buffer(encryptedUrl.substr(0,32), 'hex');
    var message = encryptedUrl.substr(32);

    var decipher = crypto.createDecipheriv(ALGORITHM, decryptKeyHex, iv);
    var decodedUrl  = decipher.update(new Buffer(message, 'hex'));
    decodedUrl += decipher.final();
    return decodedUrl;
};

module.exports = YleCrypto;
