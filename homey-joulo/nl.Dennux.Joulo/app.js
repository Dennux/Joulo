'use strict';

const Homey = require('homey');

const Logger = require('./lib/Logger');
const Client = require('./api/Client');

class JouloApp extends Homey.App {

  async onInit() {

    this.logger = new Logger(this);

    this.client = new Client(this);
    await this.client.initialize();

    this.logger.info('========================================');
    this.logger.info('Joulo app starting...');
    this.logger.info('========================================');

    if (!this.client.hasToken()) {
      this.logger.warn('No API token configured.');
    }

  }

  async testConnection() {

    return this.client.testConnection();

  }

}

module.exports = JouloApp;