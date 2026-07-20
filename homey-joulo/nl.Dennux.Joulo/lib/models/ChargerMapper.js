'use strict';

class ChargerMapper {

    static fromApi(charger) {
        return {
            id: charger.id,
            name: charger.nickname,

            status: charger.status,
            connectionType: charger.connection_type,

            isCharging: charger.is_charging,

            latestMeterWh: charger.latest_meter_wh,
            meterUpdatedAt: charger.meter_updated_at,

            midCertified: charger.mid_certified,
            midEligible: charger.mid_eligible,
        };
    }

}

module.exports = ChargerMapper;