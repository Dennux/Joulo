'use strict';

module.exports = async function () {

  const chargers = this.homey.app.poller.getChargers();

  return chargers.map(charger => ({
    name: charger.name,
    data: {
      id: charger.id,
    },
  }));

};