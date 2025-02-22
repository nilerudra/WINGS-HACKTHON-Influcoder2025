const admin = require("firebase-admin");
const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "learning-pod-9a1c8.appspot.com",
});

const bucket = admin.storage().bucket();

module.exports = { bucket };
