'use strict';

module.exports = {

  async testConnection({ homey }) {

    await homey.app.testConnection();

    return {
      success: true,
    };

  },

};