const firebase = require("firebase/app");
require("firebase/auth");

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBmvz6vhcTWle0R9csW1sOgiKhVtG8quVI",
  authDomain: "otpsend-593e3.firebaseapp.com",
  projectId: "otpsend-593e3",
  storageBucket: "otpsend-593e3.appspot.com",
  messagingSenderId: "353533144829",
  appId: "1:353533144829:web:1f7209cd9930bde195d894",
  measurementId: "G-VN3SWYCPR3",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

module.exports = firebase;