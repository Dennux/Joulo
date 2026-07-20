'use strict';

const BaseDevice = require('../../lib/BaseDevice');

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

            await this.setCapability(
                'onoff',
                charger.isCharging
            );

            await this.setCapability(
                'meter_power',
                Number((charger.latestMeterWh / 1000).toFixed(2))
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