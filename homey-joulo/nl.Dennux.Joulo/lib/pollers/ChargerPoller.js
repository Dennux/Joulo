'use strict';

const BasePoller = require('./BasePoller');

const ChargerMapper = require('../models/ChargerMapper');

class ChargerPoller extends BasePoller {

    async update() {

        try {

            this.logger.info('Updating chargers...');

            const response = await this.client.chargers.get();

            if (!response || !Array.isArray(response.chargers)) {
                throw new Error('Invalid response from /chargers');
            }

            this.logger.debugObject(
                'Raw charger response',
                response.chargers
            );

            this.cache.setChargers(response.chargers.map(ChargerMapper.fromApi));


            const chargers = this.cache.getChargers();

            this.logger.debugObject(
                'Mapped charger model',
                chargers
            );



            this.logger.info(
                `${chargers.length} charger(s) loaded`
            );

            await this.syncDevices();

        } catch (err) {

            this.logger.error(
                'Error occurred while fetching chargers',
                err
            );

            throw err;

        }

    }

    async syncDevices() {

        let driver;

        try {

            driver = this.homey.drivers.getDriver('chargers');

        } catch (error) {

            this.logger.debug(
                'Chargers driver not initialized yet'
            );

            return;

        }

        const devices = driver.getDevices();

        this.logger.debug(
            `Synchronizing ${devices.length} charger device(s)`
        );

        for (const device of devices) {

           const charger = this.cache.getCharger(device.getData().id);

            if (!charger) {

                this.logger.warn(
                    `No charger found for device ${device.getName()}`
                );

                continue;

            }

            await device.updateFromModel(charger);

        }

    }

}

module.exports = ChargerPoller;