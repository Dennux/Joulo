'use strict';

const { SETTINGS } = require('../lib/Constants');

const Energy = require('./Energy');
const Chargers = require('./Chargers');
const Sessions = require('./Sessions');
const Ere = require('./Ere');

class Client {

  constructor(app) {

    this.app = app;

    this.token = null;

    this.energy = new Energy(this);
    this.chargers = new Chargers(this);
    this.sessions = new Sessions(this);
    this.ere = new Ere(this);

  }

  async initialize() {

    this.token = this.app.homey.settings.get(SETTINGS.TOKEN);

  }

  setToken(token) {

    this.token = token;

  }

  hasToken() {

    return Boolean(this.token);

  }

}

module.exports = Client;