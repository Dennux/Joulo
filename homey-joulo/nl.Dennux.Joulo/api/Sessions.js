'use strict';

const BaseApi = require('./BaseApi');

class Sessions extends BaseApi {

  async get() {
    return this.getRequest('/sessions');
  }

}

module.exports = Sessions;