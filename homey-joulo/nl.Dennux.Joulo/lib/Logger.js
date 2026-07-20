'use strict';

const Homey = require('homey');

class Logger {

  constructor(app) {
    this.app = app;
  }

  info(message) {
    this.app.log(`[INFO] ${message}`);
  }

  warn(message) {
    this.app.log(`[WARN] ${message}`);
  }

  error(message) {
    this.app.error(`[ERROR] ${message}`);
  }

}

module.exports = Logger;