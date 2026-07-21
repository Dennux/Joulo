'use strict';

const Homey = require('homey');

const Logger = require('./lib/Logger');
const Client = require('./api/Client');
const Poller = require('./lib/Poller');
const Cache = require('./lib/Cache');

class JouloApp extends Homey.App {

  async onInit() {



    this.logger = new Logger(this);
    this.cache = new Cache();
    this.client = new Client(this);
    await this.client.initialize();

    this.logger.info('========================================');
    this.logger.info('Joulo app starting...');
    this.logger.info('========================================');

    if (!this.client.hasToken()) {
      this.logger.warn('No API token configured.');
    }

    this.poller = new Poller(this);

    await this.poller.init();
    await this.poller.start();

  }

  async testConnection() {

    return this.client.testConnection();

  }

  async onUninit() {
    if (this.poller) {
      this.poller.stop();
    }
  }

}

module.exports = JouloApp;