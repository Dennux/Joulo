'use strict';

const BaseApi = require('./BaseApi');

class Energy extends BaseApi {

  async get() {
    return this.getRequest('/energy');
  }

}

module.exports = Energy;