'use strict';

const { SETTINGS } = require('./Constants');

class Logger {

    constructor(app) {
        this.app = app;
    }

    isDebugEnabled() {
        return this.app.homey.settings.get(SETTINGS.DEBUG) === true;
    }

    info(...args) {
        this.app.log('[INFO]', ...args);
    }

    warn(...args) {
        this.app.log('[WARN]', ...args);
    }

    error(...args) {
        this.app.error('[ERROR]', ...args);
    }

    debug(...args) {
        if (!this.isDebugEnabled()) {
            return;
        }

        this.app.log('[DEBUG]', ...args);
    }

    debugObject(title, object) {
        if (!this.isDebugEnabled()) {
            return;
        }

        this.app.log(
            '[DEBUG]',
            `${title}\n${JSON.stringify(object, null, 2)}`
        );
    }

}

module.exports = Logger;