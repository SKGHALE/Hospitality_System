const crypto = require('crypto');

// Generate a 256-bit (32-byte) random secret key
const secretKey = crypto.randomBytes(32).toString('base64');
console.log('JWT Secret Key:', secretKey);
