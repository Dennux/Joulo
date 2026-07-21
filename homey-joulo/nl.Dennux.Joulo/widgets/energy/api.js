'use strict';

module.exports = {

  /**
   * Returns all data required by the Energy widget.
   *
   * @param {Object} options
   * @param {Homey} options.homey
   * @returns {Promise<Object>}
   */
  async getTotals({ homey }) {

    const energy = homey.app.getEnergy();

    const formatter = new Intl.DateTimeFormat('nl-NL', {
      month: 'long',
      year: 'numeric'
    });

    // No data available yet
    if (!energy) {
      return {
        success: false,

        energy: {
          totals: {
            kwh: 0,
            ereCredits: 0,
            sessions: 0
          },
          months: [],
          selectedMonth: null
        },

        updated: null
      };
    }

    const sortedMonths = [...energy.months].sort(
    (a, b) => a.month.localeCompare(b.month)
);

    const months = sortedMonths.map(month => ({

      month: month.month,

      label: formatter
        .format(new Date(month.month))
        .replace(/^./, c => c.toUpperCase()),

      kwh: month.kwh,
     // kwhAll: month.kwhAll,

      sessions: month.sessions,
     // sessionsAll: month.sessionsAll,

      ereCredits: month.ereCredits

    }));

    return {

      success: true,

      energy: {

        totals: {

          kwh: energy.totalKwhAll,
          ereCredits: energy.totalEreCredits,
          sessions: energy.totalSessionsAll

        },

        months,

        selectedMonth: months.length
          ? months[months.length - 1]
          : null

      },

      updated: homey.app.cache.getLastUpdate('energy')

    };

  }

};