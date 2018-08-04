'use strict';

var express    = require('express');
var bodyParser = require('body-parser');
var webhook = require('./webhook.js');

var app = express();
app.use(bodyParser.json());

const handlers = {};
const registry = {
    on: (...args) => {
        if (args.length) {
            let handler = args[args.length - 1];
            if (typeof handler === 'function') {
                args.slice(0, args.length - 1).forEach((action) => {
                    if (typeof action === 'string') {
                        action = [action];
                    }
                    action.forEach((a) => handlers[action] = handler);
                });
            }
        }
    }
};

webhook(registry);

app.post('/', (req, res) => {
    let session = req.body;
    let action = session.action;
    var handler = handlers[action];
    if (handler) {
        let promise = handler.call(this, session);
        if (promise && typeof promise.then === 'function') {
            promise.then(() => res.json(session));
        } else {
            res.json(session);
        }
    } else {
        res.json(session);
    }
});

app.listen(process.env.PORT || 3000, () => console.log('Webhook is ready'));
