'use strict';

const Homey = require('homey');

class ChargerDevice extends Homey.Device {

  /**
   * Initialize the device.
   */
  async onInit() {
    this.homey.app.logger.info(
      `Initializing charger: ${this.getName()}`
    );

    const charger = this.homey.app.poller.getCharger(
      this.getData().id
    );

    if (!charger) {
      this.homey.app.logger.warning(
        `Charger ${this.getData().id} not found in cache`
      );
      return;
    }

    this.homey.app.logger.info(
      `Connected to charger "${charger.name}"`
    );
  }

}

module.exports = ChargerDevice;