'use strict';

const https = require('https');

class JouloClient {

  constructor(token, debug = false) {
    this.token = token;
    this.debug = debug;

    this.hostname = 'api.joulo.nl';
    this.basePath = '/functions/v1/api';
  }

  async get(endpoint) {

    return new Promise((resolve, reject) => {

      const options = {
        hostname: this.hostname,
        path: `${this.basePath}/${endpoint}`,
        method: 'GET',
        headers: {
          Authorization: `Bearer ${this.token}`,
          Accept: 'application/json'
        }
      };

      const req = https.request(options, (res) => {

        let body = '';

        res.on('data', chunk => body += chunk);

        res.on('end', () => {

          if (this.debug) {
            console.log(`GET ${endpoint} -> ${res.statusCode}`);
          }

          if (res.statusCode !== 200) {
            return reject(new Error(`HTTP ${res.statusCode}\n${body}`));
          }

          try {
            resolve(JSON.parse(body));
          } catch (err) {
            reject(err);
          }

        });

      });

      req.on('error', reject);

      req.end();

    });

  }

}

module.exports = JouloClient;