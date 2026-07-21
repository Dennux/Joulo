'use strict';

const BasePoller = require('./BasePoller');

const EnergyMapper = require('../models/EnergyMapper');

class EnergyPoller extends BasePoller {

    async update() {

        try {

            this.logger.info('Updating energy statistics...');

            const response = await this.client.energy.get();

            if (!response || !Array.isArray(response.months)) {
                throw new Error('Invalid response from /energy');
            }

            this.logger.debugObject(
                'Raw energy response',
                response
            );

            this.cache.setEnergy(
                EnergyMapper.fromApi(response)
            );

            const energy = this.cache.getEnergy();

            this.logger.debugObject(
                'Mapped energy model',
                energy
            );

            this.logger.info(
                'Energy statistics updated'
            );

        } catch (err) {

            this.logger.error(
                'Error occurred while fetching energy statistics',
                err
            );

            throw err;

        }

    }

}

module.exports = EnergyPoller;