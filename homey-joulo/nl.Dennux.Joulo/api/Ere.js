'use strict';

const BaseApi = require('./BaseApi');

class Ere extends BaseApi {

  async get() {
    return this.getRequest('/ere');
  }

}

module.exports = Ere;