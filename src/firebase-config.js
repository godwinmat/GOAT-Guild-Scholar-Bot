const { initializeApp } = require("firebase/app");
const { getFirestore } = require("@firebase/firestore");

const firebaseConfig = {
  apiKey: "AIzaSyAyhXtqQuVD6sbYOuSGqp31QNtZBqUUG3o",
  authDomain: "goat-bot-4d6b3.firebaseapp.com",
  projectId: "goat-bot-4d6b3",
  storageBucket: "goat-bot-4d6b3.appspot.com",
  messagingSenderId: "587659836924",
  appId: "1:587659836924:web:4aa1609020071d904b0679"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
module.exports = db