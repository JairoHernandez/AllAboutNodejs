'use strict';

// exports.hello = (user) => {
//     return "Hello " + user;
// };

// exports.goodmorning = (user) => {
//     return "Good morning " + user;
// };

// Exporting a function constructor.

const crypto = require('crypto');
// const qr = require('qr-image');
// const fs = require('fs'); 

// module.exports = function(key) {
//     this.key = key;
//     return {
//         encode: (str) => {
//             let encoder = crypto.createCipher('aes-256-ctr', this.key);
//             return encoder.update(str, 'utf8', 'hex');
//         },
//         decode: (str) => {
//             let decoder = crypto.createDecipher('aes-256-ctr', this.key);
//             return decoder.update(str, 'hex', 'utf8');
//         },
//         qrgen: (data, file) => {
//             let dataToEncode = data || null;
//             let outImage = file || null;
//             if (dataToEncode !== null && outImage !== null) {
//                     qr.image(dataToEncode, {
//                     type: 'png',
//                     size: 20 // pixels
//                 }).pipe(fs.createWriteStream(outImage));
//                 return true;
//             } 
//             return false;
//         }
//     }
// };

class Enigma {

    constructor(key) {
        this.key = key;
    }

    encode(str) {
        // Generate a unique Initialization Vector or IV.
        // Why 16? Because, aes-256 algorithm demands a 16-byte initialization 
        // vector, as a mandatory requirement.
        // crypto.pbkdf2Sync(password, salt, iterations, keylen, digest);
        // 10,000 This is the number of times, our function will iterate through 
        // to generate a secure and unique key. 
        // const iv = crypto.pbkdf2Sync(this.key, crypto.randomBytes(16), 10000, 16, 'sha512');
        const iv = crypto.pbkdf2Sync(this.key, crypto.randomBytes(16), 10000, 16, 'sha512');
        
        // Create new buffer from the key and encode buffer as 'binary'.
        // const key = Buffer.from(this.key, 'binary');
        const key = Buffer.from(this.key, 'binary');

        // Now create encryption cipher with IV and key. Creates an object.
        // const cipher = crypto.createCipheriv("aes-256-ctr", key, iv);
        const cipher = crypto.createCipheriv("aes-256-ctr", key, iv);

        // Feed cipher object some data to encrypt.
        // let encodedText = cipher.update(str, 'utf8', 'base64');
        let encodedText = cipher.update(str, 'utf8', 'base64');

        // Once we've updated our cipher object with the string to encode, we'll have to
        // return any remaining encrypted data and close the cipher. This is done by 
        // calling the cipher.final() method as shown below:
        // encodedText += cipher.final();
        encodedText += cipher.final();

        // Since the Initiazliation Vector(IV) is needed for decrypting the text, we'll
        // simply concatenate it to the encrypted string using a dot as a separator. 
        // The idea here is that the final resulting string will contain the encrypted 
        // string and the associated IV. Since the IV can be public, it’s being bundled 
        // along directly and will be consumed when we decipher. Since the IV is a 
        // buffer, we’re converting it into a base64 string by using the 
        // toString(‘base64’) method first.
        return encodedText + "." + iv.toString('base64');

    }

    decode(str) {

    }
}

module.exports = Enigma;