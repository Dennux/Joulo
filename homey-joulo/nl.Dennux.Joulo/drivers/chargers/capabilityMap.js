'use strict';

module.exports = {

    onoff: model => model.isCharging,

    meter_power: model => model.latestMeterWh / 1000,
     charger_status: model => model.status,
     charger_connection_type: model => model.connectionType,
     charger_mid_certified: model => model.midCertified,
     charger_mid_eligible: model => model.midEligible,

};