'use strict';

class Poller {

    constructor(app) {
        this.app = app;
        this.client = app.client;
        this.logger = app.logger;

        // Polling
        this.interval = null;
        this.intervalMs = 30000;

        // Centrale cache
        this.cache = {
            chargers: [],
            energy: null,
            sessions: [],
            ere: null,
        };

        // Laatste succesvolle update per endpoint
        this.lastUpdate = {
            chargers: null,
            energy: null,
            sessions: null,
            ere: null,
        };
    }

    /**
     * Initialiseer de poller.
     */
    async init() {
        this.logger.info('Poller Initialized');
    }

    /**
     * Haal alle chargers op en werk de cache bij.
     */
    async updateChargers() {
        try {
            this.logger.info('Updating chargers...');

            const response = await this.client.chargers.get();

            if (!response || !Array.isArray(response.chargers)) {
                throw new Error('invalid response from /chargers');
            }

            this.cache.chargers = response.chargers;
            this.lastUpdate.chargers = new Date();

            this.logger.info(`${response.chargers.length} charger(s) loaded`);

        } catch (err) {
            this.logger.error('Error occurred while fetching chargers', err);
            throw err;
        }
    }

    /**
     * Geef alle chargers terug.
     * Retourneert een kopie zodat de cache niet aangepast kan worden.
     */
    getChargers() {
        return [...this.cache.chargers];
    }

    /**
     * Geef één charger terug op basis van het id.
     */
    getCharger(id) {
        return this.cache.chargers.find(charger => charger.id === id) ?? null;
    }

    /**
     * Geef het tijdstip van de laatste succesvolle update terug.
     */
    getLastUpdate(type) {
        return this.lastUpdate[type] ?? null;
    }

    /**
     * Controleer of er charger-data beschikbaar is.
     */
    hasChargers() {
        return this.cache.chargers.length > 0;
    }

    async start() {
        this.logger.info(
            `Poller started (${this.intervalMs / 1000}s interval)`
        );

        // Direct een eerste update
        await this.updateChargers();

        // Daarna elke 30 seconden
        this.interval = setInterval(async () => {
            try {
                await this.updateChargers();
            } catch (err) {
                this.logger.error('Poller update failed', err);
            }
        }, 30000);
    }

    stop() {
        if (this.interval) {
            clearInterval(this.interval);
            this.interval = null;
            this.logger.info('Poller gestopt');
        }
    }

}

module.exports = Poller;