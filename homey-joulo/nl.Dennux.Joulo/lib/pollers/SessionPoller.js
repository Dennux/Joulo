'use strict';

const BasePoller = require('./BasePoller');

const SessionMapper = require('../models/SessionMapper');

const {
    SETTINGS,
    SESSION_LIMIT,
} = require('../Constants');

class SessionPoller extends BasePoller {

    async update() {

        try {

            this.logger.info('Updating sessions...');

            let limit =
                this.homey.settings.get(SETTINGS.SESSION_LIMIT)
                ?? SESSION_LIMIT.DEFAULT;

            limit = Math.min(
                SESSION_LIMIT.MAX,
                Math.max(
                    SESSION_LIMIT.MIN,
                    Number(limit) || SESSION_LIMIT.DEFAULT
                )
            );

            this.logger.debug(
                `Loading ${limit} recent session(s)`
            );

            const response =
                await this.client.sessions.get(limit);

            if (!response || !Array.isArray(response.sessions)) {
                throw new Error('Invalid response from /sessions');
            }

            this.logger.debugObject(
                'Raw session response',
                response.sessions
            );

            this.cache.setSessions(
                response.sessions.map(SessionMapper.fromApi)
            );

            const sessions = this.cache.getSessions();

            this.logger.debugObject(
                'Mapped session model',
                sessions
            );

            this.logger.info(
                `${sessions.length} session(s) loaded`
            );

            // Later:
            // await this.syncDevices();

        } catch (err) {

            this.logger.error(
                'Error occurred while fetching sessions',
                err
            );

            throw err;

        }

    }

}

module.exports = SessionPoller;