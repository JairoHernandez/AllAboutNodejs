'use strict';

const qr = require('qr-image');
const fs = require('fs');

// node qr "Encode this string" "QRImage.png"

let dataToEncode = process.argv[2] || null; // Set to null if user does not provide string.
let outImage = process.argv[3] || null;

if (dataToEncode !== null && outImage) {
    qr.image(dataToEncode, {
        type: 'png',
        size: 20 // pixels
    }).pipe(fs.createWriteStream(outImage));

    console.log('QR Image Generated');
} else {
    console.log('Please check the command line arguments');
}