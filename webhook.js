/**
 * Once your bot steps into the screen with webhook action enabled, it requests your webhook URL with a full set of currently available variables.
 * Here you can add handlers for such actions to calculate any data for your bot.
 * Every handler is a simple function that accepts an object with variables from your bot and can modify it.
 * Once the handler has modified or added some variables, the bot receives them and continues to execute blocks in scenario.
 * Please read more here https://github.com/aimylogic/nodejs-webhook
 */

'use strict';

module.exports = (webhook) => {
    /**
     * Register some handlers here
     *
     * webhook.on('action1', (session) => session.variable = 'some value');
     */
};
