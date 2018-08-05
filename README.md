#### Шаблон вебхука для ботов на Node.js

О том, что такое вебхуки и для чего они нужны, читайте в [справочном центре Aimylogic](https://docs.aimylogic.com/%D0%BF%D1%80%D0%BE%D0%B4%D0%B2%D0%B8%D0%BD%D1%83%D1%82%D1%8B%D0%B5-%D0%B8%D0%BD%D1%81%D1%82%D1%80%D1%83%D0%BC%D0%B5%D0%BD%D1%82%D1%8B/%D0%B8%D0%BD%D1%82%D0%B5%D0%B3%D1%80%D0%B0%D1%86%D0%B8%D0%B8/%D0%B2%D0%B5%D0%B1%D1%85%D1%83%D0%BA).

## Как запустить на Heroku
[heroku.com](http://heroku.com) предоставляет бесплатный хостинг для Node.js приложений.
Чтобы запустить вашу копию этого вебхука на Heroku, нажмите на кнопку

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/aimylogic/nodejs-webhook)

Сервер на Heroku будет создан автоматически. После этого вам будет доступен публичный URL, на котором работает ваш вебхук.
Его нужно указать в настройках вашего бота на Aimylogic в поле "URL вашего вебхука".

[![Нажмите, чтобы посмотреть](https://i.imgur.com/ePsgzmf.jpg)](https://player.vimeo.com/video/283196539 "Нажмите, чтобы посмотреть")

### Как загружать изменения на Heroku
Чтобы загружать изменения кода вебхука на Heroku, выполните следующие шаги.

Установите [git](https://git-scm.com/downloads) и [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli#download-and-install).
Запустите терминал и выполните следующие команды

```
heroku login
heroku git:clone -a <название вашего приложения на Heroku>
cd <название вашего приложения на Heroku>
git remote add origin https://github.com/aimylogic/nodejs-webhook
git pull origin master
```

_Это нужно проделать только один раз._

Теперь каждый раз, как вы готовы изменить код на вашем сервере, выполняйте команды

```
git add .
git commit -am "комментарий"
git push
```

После этого Heroku самостоятельно пересоберет ваш вебхук и запустит новую версию кода.

## Как запускать локально в режиме разработки
Откройте терминал и перейдите в папку, в которую вы скопировали проект.
Выполните команду `npm install`, а затем `node dev`.

Вы увидите временный URL для вашего вебхука в консоли. Например, `https://42cbddca.ngrok.io`.
Скопируйте его и вставьте в настройках вашего бота на aimylogic.com в поле "Вебхук для тестов".
После этого, когда вы будете тестировать вашего бота в тестовом виджете, **все запросы будут приходить к серверу на вашей машине**.

_При изменении любого файла сервер будет автоматически перезапускаться, поэтому не нужно останавливать и перезапускать его вручную._

Теперь вы можете вносить изменения и тестировать код локально во время разработки бота.
И только после того как все протестировано, запускать вебхук на публичном сервере (см выше, как запустить вебхук на Heroku).

## Как работать с этим шаблоном
Код для вашего вебхука находится в файле `webhook.js`.
В нем вы можете добавлять обработчики для событий от вашего бота (подробнее про события читайте в [справочном центре](https://docs.aimylogic.com/%D0%BF%D1%80%D0%BE%D0%B4%D0%B2%D0%B8%D0%BD%D1%83%D1%82%D1%8B%D0%B5-%D0%B8%D0%BD%D1%81%D1%82%D1%80%D1%83%D0%BC%D0%B5%D0%BD%D1%82%D1%8B/%D0%B8%D0%BD%D1%82%D0%B5%D0%B3%D1%80%D0%B0%D1%86%D0%B8%D0%B8/%D0%B2%D0%B5%D0%B1%D1%85%D1%83%D0%BA)).

### Как добавить обработчик события
В файле webhook.js напишите

```javascript
module.exports = (webhook) => {
  webhook.on('event1', (session) => session.variable = 'значение');
}
```

После того, как бот перейдет на экран с включенным событием _event1_, он выполнит запрос к вашему вебхуку, после чего в боте появится переменная _variable_ со значением _"значение"_.

### Как вернуть несколько переменных
Просто добавьте переменные в объект _session_. Например

```javascript
module.exports = (webhook) => {
  webhook.on('event1', (session) => {
      session.variable1 = 'значение';
      session.variable2 = 'значение';
  });
}
```

После этого в боте появятся переменные _variable1_ и _variable2_.

### Как выполнить асинхронную операцию
Если вашему вебхуку на какой-то событие нужно выполнить асинхронную операцию (например, запрос к БД или к стороннему сервису), то в вашем обработчике верните Promise в качестве результата.
Например

```javascript
const https = require('https');

module.exports = (webhook) => {
  webhook.on('event1', (session) => {
      return new Promise((resolve, reject) => {
         https.get('https://example.com', (resp) => {
             session.variable = 'значение';
             resolve();
         });
      });
  });
}
```

### Как добавить несколько событий
Чтобы добавить обработчиков событий, добавьте несколько событий таким образом

```javascript
module.exports = (webhook) => {
  webhook
    .on('event1', (session) => {
            ...
        }
    )
    .on('event2', (session) => {
            ...
        }
    );
}
```

### Как назначить один обработчик на несколько событий
Вы можете передать массив вместо строки с именем события, например

```javascript
module.exports = (webhook) => {
  webhook.on(['event1', 'event2'], (session) => {
      session.variable1 = 'значение';
  });
}
```

