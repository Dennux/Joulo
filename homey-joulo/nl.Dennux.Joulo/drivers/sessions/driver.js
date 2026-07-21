'use strict';

const Homey = require('homey');

class SessionsDriver extends Homey.Driver {

    async onInit() {
        this.homey.app.logger.info('Sessions Driver initialized');
    }

}

module.exports = SessionsDriver;