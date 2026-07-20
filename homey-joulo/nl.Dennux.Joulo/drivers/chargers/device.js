'use strict';

const Homey = require('homey');

class ChargerDevice extends Homey.Device {

    async onInit() {

        this.logger = this.homey.app.logger;

        this.logger.info(
            `Initializing charger: ${this.getName()}`
        );

        await this.setAvailable();

        this.logger.info(
            `Connected to charger "${this.getName()}"`
        );
    }

    /**
     * Safely update a capability only when the value has changed.
     *
     * @param {string} capability
     * @param {*} value
     */
    async setCapability(capability, value) {

        if (!this.hasCapability(capability)) {
            return;
        }

        if (value === undefined || value === null) {
            return;
        }

        const currentValue = this.getCapabilityValue(capability);

        if (currentValue === value) {
            return;
        }

        try {

            await this.setCapabilityValue(capability, value);

            this.logger.debug(
                `${this.getName()} → ${capability}: ${currentValue} → ${value}`
            );

        } catch (error) {

            this.logger.error(
                `Failed to update capability "${capability}" for "${this.getName()}"`,
                error
            );

        }

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