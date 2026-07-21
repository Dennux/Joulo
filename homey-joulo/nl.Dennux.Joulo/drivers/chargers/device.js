'use strict';

const BaseDevice = require('../../lib/BaseDevice');
const capabilityMap = require('./capabilityMap');

class ChargerDevice extends BaseDevice {

    async onInit() {

        await super.onInit();

        this.logger.info(
            `Initializing charger: ${this.getName()}`
        );

        await this.setAvailable();

        this.logger.info(
            `Connected to charger "${this.getName()}"`
        );
    }



    /**
     * Update Homey device from internal charger model.
     *
     * @param {Object} charger
     */
    async updateFromModel(charger) {

        if (!charger) {
            return;
        }

        try {

            await this.setAvailable();

            await this.updateCapabilities(
                charger,
                capabilityMap
            );

        } catch (error) {

            this.logger.error(
                `Failed updating charger "${this.getName()}"`,
                error
            );

            await this.setUnavailable(
                'Unable to update charger'
            );

        }

    }

}

module.exports = ChargerDevice;