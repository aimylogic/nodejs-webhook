## Node JS webhook template

Please read more about Aimylogic webhooks in our [Help Center](https://help.aimylogic.com/en/article/webhook-14yx2uz/).

## How to run on Heroku
[heroku.com](http://heroku.com) provides a free plan for Node JS applications.
Please click on the button below to run your copy of this webhook on Heroku

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/aimylogic/nodejs-webhook)

Heroku will build and deploy your webhook automatically. After that you have to provide a public URL of your webhook in your bot's settings.

[![Clock to play](https://i.imgur.com/ePsgzmf.jpg)](https://player.vimeo.com/video/292581306 "Click to play")

### How to upload code changes
Please make the next steps to upload your changes on Heroku.

Install [git](https://git-scm.com/downloads) and [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli#download-and-install).
Run a terminal (or console) on your machine and type

```
heroku login
heroku git:clone -a <your Heroku application name>
cd <your Heroku application name>
git remote add origin https://github.com/aimylogic/nodejs-webhook
git pull origin master
```

_You have to do these steps only once._

Once you are ready to upload your changes to Heroku, please type

```
git add .
git commit -am "some comments"
git push
```

Heroku will build and deploy your changes automatically.

## How to run this template locally in development mode
Run a terminal (or console) and jump into the folder with your copy of this template.
Type `npm install`, then `node dev`.

You will see a temporal URL for your webhook. Like `https://42cbddca.ngrok.io`.
Copy it and paste into the field named "Webhook for tests" in your bot's settings.
**All requests to your webhook will go to your local machine** while you test your bot scenario via a test widget on Aimylogic. This is very useful for rapid development and debugging purposes.

_Note that you don't have to restart the local server each time you change any source file. Nodemon will handle it for you serving the same public URL._

## How to use this template
`webhook.js` file contains all source code you need to change.
Here you can add/remove action handlers for your webhook (please read more about webhook actions on [Help Center](https://help.aimylogic.com/en/article/webhook-14yx2uz/)).

### How to add action handler
Change the webhook.js file

```javascript
module.exports = (webhook) => {
  webhook.on('action1', (session) => session.variable = 'some value');
}
```

Once the bot steps into the screen with enabled action _action1_, it calls your webhook and receives variable named _variable_ with value _"some value"_.

### How to return multiple variables
Just add variables in _session_ object

```javascript
module.exports = (webhook) => {
  webhook.on('action1', (session) => {
      session.variable1 = 'some value';
      session.variable2 = 'some value';
  });
}
```

### How to run an asynchronious operation
Just return a Promise object if you need to run long operation like a HTTP request or database query

```javascript
const https = require('https');

module.exports = (webhook) => {
  webhook.on('action1', (session) => {
      return new Promise((resolve, reject) => {
         https.get('https://example.com', (resp) => {
             session.variable = 'some value';
             resolve();
         });
      });
  });
}
```

### How to handle multiple actions
You can add as many handlers as you need

```javascript
module.exports = (webhook) => {
  
  webhook.on('action1', (session) => {
            ...
        }
    );
    
  webhook.on('action2', (session) => {
            ...
        }
    );
}
```

### How to use a single handler for multiple actions
Just use an array instead of an action string

```javascript
module.exports = (webhook) => {
  webhook.on(['action1', 'action2'], (session) => {
      session.variable1 = 'some value';
  });
}
```

