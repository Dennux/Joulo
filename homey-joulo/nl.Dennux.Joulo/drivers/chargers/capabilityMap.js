'use strict';

module.exports = {

    meter_power: model =>
        model.latestMeterWh != null
            ? model.latestMeterWh / 1000
            : null,

    charger_status: model => model.status,

    charger_charging: model => model.isCharging,

    charger_integration: model => model.connectionType,

    charger_mid_certified: model => model.midCertified,

    charger_mid_eligible: model => model.midEligible,

};