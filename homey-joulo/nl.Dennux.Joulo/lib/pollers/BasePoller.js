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
        return this.parent.cache;
    }

    get lastUpdate() {
        return this.parent.lastUpdate;
    }

}

module.exports = BasePoller;