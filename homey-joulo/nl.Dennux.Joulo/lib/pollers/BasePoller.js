'use strict';

class BasePoller {

    constructor(parent) {

        this.parent = parent;

        this.app = parent.app;
        this.homey = parent.homey;
        this.client = parent.client;
        this.logger = parent.logger;

    }

    get cache() {
        return this.app.cache;
    }

    get lastUpdate() {
        return this.app.cache.lastUpdate;
    }

}

module.exports = BasePoller;