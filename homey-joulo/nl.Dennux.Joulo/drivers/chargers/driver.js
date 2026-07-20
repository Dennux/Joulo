'use strict';

const Homey = require('homey');

class ChargersDriver extends Homey.Driver {

  async onInit() {
    this.homey.app.logger.info('Chargers driver initialized');
  }

  async onPairListDevices() {

    this.homey.app.logger.info('onPairListDevices called');

    const chargers = this.homey.app.poller.getChargers();

    this.homey.app.logger.info(
      `Found ${chargers.length} charger(s)`
    );

    return chargers.map(charger => ({
      name: charger.name,
      data: {
        id: String(charger.id),
      },
    }));
  }

}

module.exports = ChargersDriver;