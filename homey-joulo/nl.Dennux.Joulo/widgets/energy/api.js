'use strict';

module.exports = {

  /**
   * Returns all data required by the Energy widget.
   *
   * @param {Object} options
   * @param {Homey} options.homey
   * @returns {Object}
   */
  async getTotals({ homey }) {

    const energy = homey.app.getEnergy();

    if (!energy) {

      return {
        success: false,
        energy: {
          totals: {
            ereCredits: 0,
            kwh: 0
          },
          months: []
        },
        updated: null
      };

    }

    const formatter = new Intl.DateTimeFormat('nl-NL', {
      month: 'long',
      year: 'numeric'
    });

    const months = energy.months.map(month => ({

      month: month.month,

      label:
        formatter.format(new Date(month.month))
          .replace(/^./, c => c.toUpperCase()),

      kwh: month.kwh,
      kwhAll: month.kwhAll,

      sessions: month.sessions,
      sessionsAll: month.sessionsAll,

      ereCredits: month.ereCredits

    }));

    return {

      success: true,

      energy: {

        totals: {

          kwh: energy.totalKwhAll,

          ereCredits: energy.totalEreCredits

        },

        months

      },

      updated: homey.app.cache.getLastUpdate('energy')

    };

  }

};