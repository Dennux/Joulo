'use strict';

const { API } = require('../lib/Constants');

class BaseApi {

  constructor(client) {
    this.client = client;
  }

  get headers() {
    return {
      Accept: 'application/json',
      Authorization: `Bearer ${this.client.token}`,
    };
  }

  async getRequest(path) {

    const response = await fetch(`${API.BASE_URL}${path}`, {
      method: 'GET',
      headers: this.headers,
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    return response.json();

  }

}

module.exports = BaseApi;