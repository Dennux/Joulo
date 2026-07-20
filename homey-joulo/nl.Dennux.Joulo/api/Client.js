'use strict';

const https = require('https');

const API_HOST = 'api.joulo.nl';
const API_BASE = '/functions/v1/api';
const USER_AGENT = 'Homey Joulo/0.1.0';

class JouloClient {

  constructor(token, logger, debug = false) {
    this.token = token;
    this.logger = logger;
    this.debug = debug;
  }

  /**
   * Algemene GET methode
   * @param {string} endpoint
   * @returns {Promise<Object>}
   */
  async get(endpoint) {

    return new Promise((resolve, reject) => {

      const options = {
        hostname: API_HOST,
        port: 443,
        path: `${API_BASE}/${endpoint}`,
        method: 'GET',
        headers: {
          Authorization: `Bearer ${this.token}`,
          Accept: 'application/json',
          'User-Agent': USER_AGENT,
        },
      };

      if (this.debug) {
        this.logger.info(`GET ${options.path}`);
      }

      const req = https.request(options, res => {

        let body = '';

        res.on('data', chunk => {
          body += chunk;
        });

        res.on('end', () => {

          if (this.debug) {
            this.logger.info(`HTTP ${res.statusCode}`);
          }

          if (res.statusCode < 200 || res.statusCode >= 300) {
            return reject(new Error(`HTTP ${res.statusCode}: ${body}`));
          }

          try {

            const json = JSON.parse(body);

            resolve(json);

          } catch (err) {

            reject(new Error(`Invalid JSON response: ${err.message}`));

          }

        });

      });

      req.on('error', err => {
        reject(err);
      });

      req.end();

    });

  }

  /**
   * ERE Position
   */
  async getErePosition() {
    return this.get('ere-position');
  }

}

module.exports = JouloClient;
