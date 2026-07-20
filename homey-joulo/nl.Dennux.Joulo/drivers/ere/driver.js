'use strict';

const Homey = require('homey');

class EreDriver extends Homey.Driver {

  async onInit() {
    this.homey.app.logger.info('ERE Driver initialized.');
  }

}

module.exports = EreDriver;