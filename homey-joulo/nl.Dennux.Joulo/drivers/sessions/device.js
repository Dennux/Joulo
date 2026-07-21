'use strict';

const BaseDevice = require('../../lib/BaseDevice');

class SessionDevice extends BaseDevice {

    async onInit() {

        await super.onInit();

        this.logger.info(`Session device "${this.getName()}" initialized`);
    }

}

module.exports = SessionDevice;