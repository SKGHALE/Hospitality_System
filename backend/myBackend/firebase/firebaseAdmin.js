const admin = require("firebase-admin");

// Path to your service account JSON file
const serviceAccount = require("../firebase-service-account.json");

// Initialize Firebase Admin SDK
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

module.exports = admin;
