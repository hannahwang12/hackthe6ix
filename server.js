const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const firebase = require('firebase');
const cors = require('cors');
const firebase_auth = require('./auth/firebase_auth.js');
const language = require('@google-cloud/language');
const moment = require('moment-timezone');


// Google Cloud Speech API
const fs = require('fs');
const record = require('node-record-lpcm16');

const app = express();
const port = process.env.PORT || 8080;

// ------------------------
// FIREBASE
// ------------------------
// Gear icon in left sidebar > General > Add Firebase to your Web App
// Don't bother with config variable
// npm install firebase and import it
firebase.initializeApp(firebase_auth.firebase_auth);

// Reference to database, this is automatically the root
const user_data = firebase.app().database().ref().child("user_data");
const user_identities = firebase.app().database().ref().child("user_identities");
const cg_identities = firebase.app().database().ref().child("cg_identities");

app.use(cors({origin: 'http://localhost:3000'}));

// Creates a client

app.get("/signup", async (req, res) => {
//app.post("/authenticate", async (req, res) => {
  //console.log(req);
  var exists = 0;
  let username = req.query.username;
  let password = req.query.password;
  let email = req.query.email;
  await user_identities.once('value', async function(data) {
    if (data.val()) {
      var usernames = Object.keys(data.val());
      exists = usernames.indexOf(username);
    } else {
      exists = -1;
    }
  });

  if (exists > -1) {
    res.status(200).send("exists");
  } else {
    const min = 10000000000000;
    const max = 99999999999999;
    const num = Math.floor(Math.random() * (max - min + 1)) + min;
  	user_identities.child(username).push(password);
    user_identities.child(username).push(email);
    user_identities.child(username).push(num);
    cg_identities.child("admin-" + username).push(password);
    cg_identities.child("admin-" + username).push(email);
    cg_identities.child("admin-" + username).push(num);
    res.sendStatus(200);
  }
});

app.get("/authenticate", async (req, res) => {
//app.post("/authenticate", async (req, res) => {
  let username = req.query.username;
  let password = req.query.password;
  //res.statusCode(200);
  user_identities.once('value', async function(data) {
    var usernames = Object.keys(data.val());
    var exists = usernames.indexOf(username);

    if (exists > -1) {
      var auth = Object.values(Object.values(data.val())[exists])[0];
      if (password === auth) {
        res.status(200).send("valid");
        return;
      } else {
        res.status(200).send("invalid");
        return;
      }
    } else {
      res.status(200).send("invalid");
      return;
    }
    /*
    waiting_links = Object.keys(data.val());

    if (contains_elem(req.query.hash, waiting_links) != -1) {
      moveFbRecord(verify_links.child(req.query.hash), tracked_courses);
      res.sendFile(path.join(__dirname, 'client/extra/verified.html'));
    } else {
      res.sendFile(path.join(__dirname, 'client/extra/unverified.html'));
    }
    */
  })
});

app.get("/cgauthenticate", async (req, res) => {
//app.post("/authenticate", async (req, res) => {
  let username = req.query.username;
  let password = req.query.password;
  //res.statusCode(200);
  cg_identities.once('value', async function(data) {
    var usernames = Object.keys(data.val());
    var exists = usernames.indexOf(username);

    if (exists > -1) {
      var auth = Object.values(Object.values(data.val())[exists])[0];
      if (password === auth) {
        res.status(200).send("valid");
        return;
      } else {
        res.status(200).send("invalid");
        return;
      }
    } else {
      res.status(200).send("invalid");
      return;
    }
  })
});

const NPLclient = new language.LanguageServiceClient({
  projectId: 'hackthe6ix-dd4d2',
  keyFilename: 'google_cloud_api_key.json',
});

app.get("/message", async (req, res) => {
  let index = req.query.index;
  let text = req.query.message;

  const document = {
    content: text,
    type: 'PLAIN_TEXT',
  };  

  switch (index) {
    case 0:
      const entities = new Array();
      NPLclient
       .analyzeEntities({document: document})
       .then(results => {
        entities = results[0].entities;

        entities.filter((elem) => elem.type == 'PERSON')});

      console.log(entities);
      break;
    case 1:
      break;
    case 2:
      break;
    case 3:
      break;
    case 4:
      break;
    case 5:
      break;
    case 6:
      break;
    case 7:
      break;

  }
});

const client = new speech.SpeechClient();

const encoding = 'LINEAR16';
const sampleRateHertz = 16000;
const LanguageCode = 'en-US';

const request = {
  config: {
    encoding: encoding,
    sampleRateHertz: sampleRateHertz,
    languageCode: languageCode,
  },
  interimResults: false, // If you want interim results, set this to true
};

const recognizeStream = client
  .streamingRecognize(request)
  .on('error', console.error)
  .on('data', data =>
    process.stdout.write(
      data.results[0] && data.results[0].alternatives[0]
        ? `Transcription: ${data.results[0].alternatives[0].transcript}\n`
        : `\n\nReached transcription time limit, press Ctrl+C\n`
    )
  );

app.get("/audio", async (req, res) => {
  record
    .start({
      sampleRateHertz: sampleRateHertz,
      threshold: 0,
      // Other options, see https://www.npmjs.com/package/node-record-lpcm16#options
      verbose: true,
      recordProgram: 'sox', // Try also "arecord" or "sox"
      silence: '4.0',
    })
    .on('error', console.error)
    .pipe(recognizeStream);
  // client
  // .recognize({
  //   config: config,
  //   audio: {
  //     uri: blob.slice(5),
  //   }
  // })
  // .then(data => {
  //   const response = data[0];
  //   const transcription = response.results
  //     .map(result => result.alternatives[0].transcript)
  //     .join('\n');
  //   console.log(`Transcription: `, transcription);
  // })
  // .catch(err => {
  //   console.error('ERROR:', err);
  // });
});

const text = 'From the comfort of our modern lives we tend to look back at the turn of the twentieth century as a dangerous time for sea travellers. With limited communication facilities, and shipping technology still in its infancy in the early nineteen hundreds, we consider ocean travel to have been a risky business. But to the people of the time it was one of the safest forms of transport. At the time of the Titanic’s maiden voyage in 1912, there had only been four lives lost in the previous forty years on passenger ships on the North Atlantic crossing.';

const ignoreWords = [
  'I',
  'he',
  'him',
  'her',
  'she',
  'a',
  'the',
  'them',
  'it',
  'if',
  'me',
  'am',
  'are',
  'and',
  'was',
  'is',
  'were',
  'but',
  'who',
  'in',
  'you',
  'on',
  'our',
  'my',
  'to',
  'of',
  'we',
  'from',
  'at',
  'as',
  'for',
  'its',
  'had',
  'have',
];

app.get("/update", async (req, res) => {
  var message = req.query.message;
  var user = req.query.user;
  var score = 0;
  var magnitude = 0;
  const document = {
    content: text,
    type: 'PLAIN_TEXT',
  };

  await NPLclient
    .analyzeSentiment({document: document})
    .then(results => {
      const sentiment = results[0].documentSentiment;
      score = Math.round( sentiment.score * 10) / 10;
      magnitude = Math.round( sentiment.magnitude * 10) / 10;


      console.log("Score: " + score);
      console.log("Magnitude: " + magnitude);
  })

  var dateTime = moment().format("YYYY-MM-DD");
  var date = dateTime.substring(5, 10);
  user = "user"; //REMOVE

  user_data.child(user).child("time").child(date).child("sentiment").push(score);

  /*
  await NPLclient
    .analyzeEntity({document: document})
    .then(results => {
      const entities = results[0].entities;

      console.log(`Entities and sentiments:`);
      entities.forEach(entity => {
      console.log(`  Name: ${entity.name}`);
      console.log(`  Type: ${entity.type}`);
      console.log(`  Score: ${entity.sentiment.score}`);
      console.log(`  Magnitude: ${entity.sentiment.magnitude}`);
    });
  })
  */

  var words_hold = {};

  user_data.child(user).once('value', async function(data) {
    var words_hold = data.val().global.words;
    /*console.log(words_hold);
    console.log(message);*/
    message.replace(/[.]/g, '')
      .split(/\s/)
      .filter((word) => !ignoreWords.includes(word))
      .map((word) => {
        if (words_hold.hasOwnProperty(word)) {
          //console.log('contains word already');
          words_hold[word]++;
        } else {
          words_hold[word] = 1;
        }
      });
    console.log(words_hold);

    Object.keys(words_hold).map(function(elem) {
      user_data.child(user).child("global").child("words").child(elem).set(words_hold[elem]);
    });

    var num_entries = 0;
    if (data.val().time) {
      num_entries = Object.keys(data.val().time).length;
    }

    user_data.child(user).child("global").child("sentiment").set(((data.val().global.sentiment * num_entries) + score)/(num_entries + 1));
  })
});

// The text to analyze



//console.log(freq);

// Detects the sentiment of the text
// NPLclient
//   .analyzeSentiment({document: document})
//   .then(results => {
//     const sentiment = results[0].documentSentiment;

//     console.log(`Text: ${text}`);
//     console.log(`Sentiment score: ${sentiment.score}`);
//     console.log(`Sentiment magnitude: ${sentiment.magnitude}`);
//   })
//   .catch(err => {
//     console.error('ERROR:', err);
//   });

// NPLclient
//   .analyzeEntitySentiment({document: document})
//   .then(results => {
//     console.log(results);
//     const entities = results[0].entities;
//     entities.map((elem) => console.log(elem.mentions));
//     console.log(entities)

//     // console.log(`Text: ${text}`);
//     // console.log(`Sentiment score: ${sentiment.score}`);
//     // console.log(`Sentiment magnitude: ${sentiment.magnitude}`);
//   })
//   .catch(err => {
//     console.error('ERROR:', err);
//   });

app.listen(port);

app.use(express.static(path.join(__dirname, 'client/build')));