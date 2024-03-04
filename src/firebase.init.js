import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCk84ZV0FJx_uhApHE1XHwnPxEZkvEmbVc",
  authDomain: "restaurantapp-bd68c.firebaseapp.com",
  databaseURL: "https://restaurantapp-bd68c-default-rtdb.firebaseio.com",
  projectId: "restaurantapp-bd68c",
  storageBucket: "restaurantapp-bd68c.appspot.com",
  messagingSenderId: "452827676096",
  appId: "1:452827676096:web:859a543e15d88e2dc15c25"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;