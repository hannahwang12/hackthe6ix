const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const firebase = require('firebase');

const app = express();
const port = process.env.PORT || 8080;

app.listen(port);

app.use(express.static(path.join(__dirname, 'client/build')));