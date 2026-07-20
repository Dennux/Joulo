'use strict';

const BaseApi = require('./BaseApi');

class Chargers extends BaseApi {

  async get() {
    return this.getRequest('/chargers');
  }

}

module.exports = Chargers;