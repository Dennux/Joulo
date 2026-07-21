'use strict';

class Cache {

    constructor() {

        this.reset();

    }

    reset() {

        this.chargers = [];
        this.sessions = [];
        this.energy = null;
        this.ere = null;

        this.lastUpdate = {
            chargers: null,
            sessions: null,
            energy: null,
            ere: null,
        };

    }

    // -------------------------------------------------------------------------
    // Chargers
    // -------------------------------------------------------------------------

    getChargers() {

        return structuredClone(this.chargers);

    }

    getCharger(id) {

        const charger = this.chargers.find(c => c.id === id);

        return charger
            ? structuredClone(charger)
            : null;

    }

    hasChargers() {

        return this.chargers.length > 0;

    }

    setChargers(chargers) {

        this.chargers = structuredClone(chargers);
        this.lastUpdate.chargers = new Date();

    }

    // -------------------------------------------------------------------------
    // Sessions
    // -------------------------------------------------------------------------

    getSessions() {

        return structuredClone(this.sessions);

    }

    hasSessions() {

        return this.sessions.length > 0;

    }

    setSessions(sessions) {

        this.sessions = structuredClone(sessions);
        this.lastUpdate.sessions = new Date();

    }

    // -------------------------------------------------------------------------
    // Energy
    // -------------------------------------------------------------------------

    getEnergy() {

        return this.energy
            ? structuredClone(this.energy)
            : null;

    }

    hasEnergy() {

        return this.energy !== null;

    }

    setEnergy(energy) {

        this.energy = structuredClone(energy);
        this.lastUpdate.energy = new Date();

    }

    // -------------------------------------------------------------------------
    // ERE
    // -------------------------------------------------------------------------

    getEre() {

        return this.ere
            ? structuredClone(this.ere)
            : null;

    }

    hasEre() {

        return this.ere !== null;

    }

    setEre(ere) {

        this.ere = structuredClone(ere);
        this.lastUpdate.ere = new Date();

    }

    // -------------------------------------------------------------------------
    // General
    // -------------------------------------------------------------------------

    getLastUpdate(type) {

        return this.lastUpdate[type] ?? null;

    }

}

module.exports = Cache;