'use strict';

var ngrok = require('ngrok');
var nodemon = require('nodemon');

(async () => {
    const url = await ngrok.connect(3000);
    console.log("Webhook URL: " + url);
    nodemon(`-x 'NGROK_URL=${url} node' ./app.js`);
})();
