'use strict';

module.exports = {

  SETTINGS: {
    TOKEN: 'api_token',
    DEBUG: 'debug',
    SESSION_LIMIT: 'session_limit',
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
  SESSION_LIMIT: {
    DEFAULT: 25,
    MIN: 5,
    MAX: 50,
  },

};