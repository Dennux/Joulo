'use strict';

const Homey = require('homey');

class BaseDevice extends Homey.Device {

    async onInit() {
        this.logger = this.homey.app.logger;
    }

    async setCapability(capability, value) {

        if (!this.hasCapability(capability)) {
            return;
        }

        if (value === undefined || value === null) {
            return;
        }

        value = this.roundCapabilityValue(capability, value);

        const currentValue = this.getCapabilityValue(capability);

        if (currentValue === value) {
            return;
        }

        this.logger.debug(
            `${this.getName()} → ${capability}: ${currentValue} → ${value}`
        );

        try {

            await this.setCapabilityValue(
                capability,
                value
            );

        } catch (error) {

            this.logger.error(
                `Unable to update capability "${capability}"`,
                error
            );

        }

    }

    roundCapabilityValue(capability, value) {

        if (typeof value !== 'number') {
            return value;
        }

        switch (capability) {

            case 'meter_power':
                return Number(value.toFixed(2));

            default:
                return value;

        }

    }

    async updateCapabilities(model, capabilityMap) {

        for (const [capability, getter] of Object.entries(capabilityMap)) {

            await this.setCapability(
                capability,
                getter(model)
            );

        }

    }

}

module.exports = BaseDevice;