'use strict';

const BaseApi = require('./BaseApi');

class Sessions extends BaseApi {

  async get(limit = 25) {

    return this.getRequest(`/sessions?limit=${limit}`);

  }

}

module.exports = Sessions;