'use strict';

const SessionPoller = require('./pollers/SessionPoller');
const ChargerPoller  = require('./pollers/ChargerPoller');
const EnergyPoller  = require('./pollers/EnergyPoller');
const ErePoller  = require('./pollers/ErePoller');

const { POLLER } = require('./Constants');

class Poller {



    constructor(app) {
        this.app = app;
        this.homey = app.homey;
        this.client = app.client;
        this.logger = app.logger;

        // Polling
        this.interval = null;
        this.intervalMs = POLLER.FAST_INTERVAL;

        this.sessionPoller = new SessionPoller(this);
        this.chargerPoller = new ChargerPoller(this);
        this.energyPoller = new EnergyPoller(this);
        this.erePoller = new ErePoller(this);
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
        await this.energyPoller.update();
        await this.erePoller.update();  

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