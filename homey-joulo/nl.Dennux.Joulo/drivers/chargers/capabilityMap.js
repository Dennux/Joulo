'use strict';

module.exports = {

    onoff: model => model.isCharging,

    meter_power: model => model.latestMeterWh / 1000,

};cd