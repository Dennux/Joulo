'use strict';

const Homey = require('homey');

const JouloClient = require('./api/Client');
const Logger = require('./lib/Logger');

class JouloApp extends Homey.App {

  async onInit() {


    
    this.logger = new Logger(this);

    this.logger.info('========================================');
    this.logger.info('Joulo app starting...');
    this.logger.info('========================================');

    // Lees instellingen
    //this.token = this.homey.settings.get('api_token');
    this.debug = this.homey.settings.get('debug') || false;

    this.token = 'DaBvuTQKxRtawGG2Ar76UYkA6H4JCtQv';
this.debug = true;

    if (!this.token) {
      this.logger.warn('No API token configured.');
      return;
    }

    // Maak API client
    this.client = new JouloClient(
      this.token,
      this.logger,
      this.debug
    );

    // Test verbinding
    await this.testConnection();

    this.logger.info('Joulo app initialized.');

  }

  async testConnection() {

    try {

      this.logger.info('Connecting to Joulo API...');

      const response = await this.client.getErePosition();

      this.logger.info('Connection successful.');

      if (this.debug) {
        this.logger.info(
          JSON.stringify(response, null, 2)
        );
      }

    } catch (error) {

      this.logger.error(error.message);

    }

  }

}

module.exports = JouloApp;