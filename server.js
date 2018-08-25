const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const firebase = require('firebase');

const app = express();
const port = process.env.PORT || 8080;

// ------------------------
// FIREBASE
// ------------------------
// Gear icon in left sidebar > General > Add Firebase to your Web App
// Don't bother with config variable
// npm install firebase and import it
firebase.initializeApp({
  apiKey: "AIzaSyCfxOTiqUJ6k66ygoChsUdKN4o-Nr6nYJ8",
  authDomain: "hackthe6ix-dd4d2.firebaseapp.com",
  databaseURL: "https://hackthe6ix-dd4d2.firebaseio.com",
  projectId: "hackthe6ix-dd4d2",
  storageBucket: "hackthe6ix-dd4d2.appspot.com",
  messagingSenderId: "1023103574623"
});

// Reference to database, this is automatically the root
const user_data = firebase.app().database().ref().child("user_data");
const user_identities = firebase.app().database().ref().child("user_identities");
const cg_identities = firebase.app().database().ref().child("cg_identities");

// uw.classwatch.notif@gmail.com
// UWclasswatch!
app.get("/authenticate", async (req, res) => {
	let username = req.query.user;
	let password = req.query.password;
	user_data.push(username);
	user_data.push(password);
});

app.listen(port);

app.use(express.static(path.join(__dirname, 'client/build')));