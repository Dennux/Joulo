'use strict';

module.exports = {

  SETTINGS: {
    TOKEN: 'api_token',
    DEBUG: 'debug',
  },

  API: {
    BASE_URL: 'https://api.joulo.nl/functions/v1/api',
    TIMEOUT: 10000,
  },

  POLLER: {
    FAST_INTERVAL: 30000,
    NORMAL_INTERVAL: 60000,
    SLOW_INTERVAL: 86400000,
  },

};