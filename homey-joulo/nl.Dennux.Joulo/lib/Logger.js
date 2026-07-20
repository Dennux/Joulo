'use strict';

const { SETTINGS } = require('./Constants');

class Logger {

  constructor(homey) {
    this.homey = homey;
  }

  isDebugEnabled() {
    return this.homey.settings.get(SETTINGS.DEBUG) === true;
  }

  info(...args) {
    this.homey.log('[INFO]', ...args);
  }

  warn(...args) {
    this.homey.log('[WARN]', ...args);
  }

  error(...args) {
    this.homey.error('[ERROR]', ...args);
  }

  debug(...args) {
    if (!this.isDebugEnabled()) {
      return;
    }

    this.homey.log('[DEBUG]', ...args);
  }

}

module.exports = Logger;