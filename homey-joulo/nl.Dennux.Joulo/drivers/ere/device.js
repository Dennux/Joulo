'use strict';

const Homey = require('homey');

class EreDevice extends Homey.Device {

  async onInit() {
    this.homey.app.logger.info(`${this.getName()} initialized.`);
  }

}

module.exports = EreDevice;