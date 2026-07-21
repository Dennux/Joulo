'use strict';

const BasePoller = require('./BasePoller');

const EreMapper = require('../models/EreMapper');

class ErePoller extends BasePoller {

    async update() {

        try {

            this.logger.info('Updating ERE statistics...');

            const response = await this.client.ere.get();

            if (!response) {
                throw new Error('Invalid response from /ere');
            }

            this.logger.debugObject(
                'Raw ERE response',
                response
            );

            this.cache.setEre(
                EreMapper.fromApi(response)
            );

            const ere = this.cache.getEre();

            this.logger.debugObject(
                'Mapped ERE model',
                ere
            );

            this.logger.info(
                'ERE statistics updated'
            );

        } catch (err) {

            this.logger.error(
                'Error occurred while fetching ERE statistics',
                err
            );

            throw err;

        }

    }

}

module.exports = ErePoller;