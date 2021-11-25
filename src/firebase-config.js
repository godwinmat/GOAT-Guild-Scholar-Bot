const { initializeApp } = require("firebase/app");
const { getFirestore } = require("@firebase/firestore");

const firebaseConfig = {
  apiKey: "AIzaSyCXzYie04M6ivh__eOllP7g896sU97gArs",
  authDomain: "goat-guild-scholar-bot.firebaseapp.com",
  projectId: "goat-guild-scholar-bot",
  storageBucket: "goat-guild-scholar-bot.appspot.com",
  messagingSenderId: "463762436286",
  appId: "1:463762436286:web:eae43efd2fa9d82c636eef"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
module.exports = db