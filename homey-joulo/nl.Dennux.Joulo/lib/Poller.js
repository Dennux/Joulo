'use strict';

const SessionPoller = require('./pollers/SessionPoller');
const ChargerPoller  = require('./pollers/ChargerPoller');

class Poller {



    constructor(app) {
        this.app = app;
        this.homey = app.homey;
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

        this.lastUpdate = {
            chargers: null,
            energy: null,
            sessions: null,
            ere: null,
        };

        this.sessionPoller = new SessionPoller(this);
        this.chargerPoller = new ChargerPoller(this);
    }

    /**
     * Initialiseer de poller.
     */
    async init() {
        this.logger.info('Poller Initialized');
    }

    async poll() {

        await this.chargerPoller.update();
        await this.sessionPoller.update();

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
        await this.poll();

        // Daarna elke 30 seconden
        this.interval = setInterval(async () => {
            try {
                await this.poll();
            } catch (err) {
                this.logger.error('Poller update failed', err);
            }
        }, this.intervalMs);
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