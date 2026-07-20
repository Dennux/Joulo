'use strict';

const Homey = require('homey');

class ChargersDriver extends Homey.Driver {

  /**
   * Initialize the driver.
   */
  async onInit() {
    this.homey.app.logger.info('Chargers driver initialized');
  }

}

module.exports = ChargersDriver;