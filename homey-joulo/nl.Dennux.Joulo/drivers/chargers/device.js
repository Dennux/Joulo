'use strict';

const BaseDevice = require('../../lib/BaseDevice');
const capabilityMap = require('./capabilityMap');

class ChargerDevice extends BaseDevice {

    async onInit() {

        await super.onInit();

        this.logger.info(
            `Initializing charger device "${this.getName()}"`
        );

        await this.setAvailable();

        this.logger.info(
            `Charger device "${this.getName()}" initialized`
        );

    }

    /**
     * Update Homey device from the internal charger model.
     *
     * @param {Object} charger Internal charger model.
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