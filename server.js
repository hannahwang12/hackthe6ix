const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const firebase = require('firebase');
const cors = require('cors');
const firebase_auth = require('./auth/firebase_auth.js');
const moment = require('moment');


// Google Cloud Speech API
const fs = require('fs');
const Speech = require('@google-cloud/speech');
const record = require('node-record-lpcm16');
// // Creates a client
/*const client = new speech.SpeechClient({
  projectId: 'hackthe6ix-dd4d2',
  keyFilename: 'google_cloud_api_key.json',
});*/
const filename = './output.raw';


/*
const audio = {
  content: fs.readFileSync(filename).toString('base64'),
};
let blob;

const encoding = 'LINEAR16';
const sampleRateHertz = 16000;
const languageCode = 'en-US';

const config = {
  encoding: encoding,
  sampleRateHertz: sampleRateHertz,
  languageCode: languageCode,
};

const request = {
  config: {
    encoding: encoding,
    sampleRateHertz: sampleRateHertz,
    languageCode: languageCode,
  },
  interimResults: true, // If you want interim results, set this to true
};
*/

// const request = {
//   config: config,
//   uri: blob.slice(5),
// };

function streamtoParser() {
  const speech = Speech({
    projectId: 'hackthe6ix-dd4d2',
    keyFilename: 'google_cloud_api_key.json',
  });
  const request = {
    config: {
      encoding: 'LINEAR16',
      sampleRateHertz: '16000',
      languageCode: 'en-US',
    },
    interimResults: true,
  }

  const recognizeStream = speech.createRecognizeStream(request)
  .on('error', console.error)
  .on('data', data => {console.log(data.results)}
  );

  record
  .start({
    sampleRate: 16000,
    threshold: .6,
    verbose: true,
    silence: '5.0',
  }).on('error', console.error)
  .pipe(recognizeStream)

  console.log("listening");
}

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

app.get("/audio", async (req, res) => {
 //console.log('req' + req);
  //blob = req.query.blob;
  //console.log(blob.slice(5));

  streamtoParser();
  /*
  record
  .start({
    sampleRateHertz: sampleRateHertz,
    threshold: 0,
    // Other options, see https://www.npmjs.com/package/node-record-lpcm16#options
    verbose: true,
    recordProgram: 'sox', // Try also "arecord" or "sox"
    silence: '1.0',
  })
  .on('error', console.error)
  .pipe(recognizeStream);*/
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

app.get("/updatefirebase", async (req, res) => {
  user_data.child(user).child(time).push(date);

})



// Detects speech in the audio file
// setTimeout(() => {
//   client
//   .recognize(request)
//   .then(data => {
//     const response = data[0];
//     const transcription = response.results
//       .map(result => result.alternatives[0].transcript)
//       .join('\n');
//     console.log(`Transcription: `, transcription);
//   })
//   .catch(err => {
//     console.error('ERROR:', err);
//   });
// }, 1000);


// Imports the Google Cloud client library
const language = require('@google-cloud/language');

// Instantiates a client
const NPLclient = new language.LanguageServiceClient({
  projectId: 'hackthe6ix-dd4d2',
  keyFilename: 'google_cloud_api_key.json',
});

// The text to analyze
const text = 'From the comfort of our modern lives we tend to look back at the turn of the twentieth century as a dangerous time for sea travellers. With limited communication facilities, and shipping technology still in its infancy in the early nineteen hundreds, we consider ocean travel to have been a risky business. But to the people of the time it was one of the safest forms of transport. At the time of the Titanic’s maiden voyage in 1912, there had only been four lives lost in the previous forty years on passenger ships on the North Atlantic crossing.';
const date = moment().format('MM-DD');

const freq = {};
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

const words = text.replace(/[.]/g, '')
  .split(/\s/)
  .filter((word) => !ignoreWords.includes(word))
  .map((word) => {
    if (freq[word]) {
      // console.log('contains word already');
      freq[word]++;
    } else {
      freq[word] = 1;
    }
  }); 
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


app.get("/message", async (req, res) => {
  const message = req.query.message;
  const document = {
    content: message,
    type: 'PLAIN_TEXT',
  };
  let sentiment, entity;
  await NPLclient
    .analyzeSentiment({document: document})
    .then(results => {
      sentiment = results[0].documentSentiment;

      // console.log(`Text: ${message}`);
      // console.log(`Sentiment score: ${sentiment.score}`);
      // console.log(`Sentiment magnitude: ${sentiment.magnitude}`);
      // if (sentiment.score > 0) {
      //   console.log('positive');
      //   res.status(200).send({sentiment: "positive"});
      // } else {
      //   res.status(200).send({sentiment: "negative"});
      // }
    })
    .catch(err => {
      console.error('ERROR:', err);
    });
  await NPLclient
    .analyzeEntities({document: document})
    .then(results => {
      entity = results[0].entities[0];
      entity = entity.name || null;

      // console.log(`Text: ${message}`);
      // console.log(`Sentiment score: ${sentiment.score}`);
      // console.log(`Sentiment magnitude: ${sentiment.magnitude}`);
      // if (sentiment.score > 0) {
      //   console.log('positive');
      //   res.status(200).send({sentiment: "positive"});
      // } else {
      //   res.status(200).send({sentiment: "negative"});
      // }
    })
    .catch(err => {
      console.error('ERROR:', err);
    });
  if (sentiment.score > 0) {
    console.log('positive');
    res.status(200).send({sentiment: "positive", entity});
  } else {
    res.status(200).send({sentiment: "negative", entity});
  }
})





app.listen(port);

app.use(express.static(path.join(__dirname, 'client/build')));