'use strict';

/**
 * Maps Energy API responses to the internal Energy model.
 */
class EnergyMapper {

    /**
     * Maps the Energy API response.
     *
     * @param {Object} energy
     * @returns {Object}
     */
    static fromApi(energy) {

        return {

            totalKwh: energy?.total_kwh,
            totalKwhAll: energy?.total_kwh_all,
            totalSessions: energy?.total_sessions,
            totalSessionsAll: energy?.total_sessions_all,
            totalEreCredits: energy?.total_ere_credits,

            months: (energy?.months ?? []).map(month => ({

                month: month?.month,
                kwh: month?.kwh,
                kwhAll: month?.kwh_all,
                sessions: month?.sessions,
                sessionsAll: month?.sessions_all,
                ereCredits: month?.ere_credits,

            })),

        };

    }

}

module.exports = EnergyMapper;