'use strict';

window.Joulo = window.Joulo || {};

/**
 * Gebruik mockdata tijdens het ontwerpen.
 * Zet op false om weer de API-data te gebruiken.
 */
const USE_MOCK_DATA = true;

/**
 * Mock dataset.
 */
const MOCK_ENERGY = {

    totals: {

        kwh: 4120,
        ereCredits: 503,
        sessions: 74

    },

    selectedMonth: {
        month: '2026-07-01'
    },

    months: [

        {
            month: '2026-01-01',
            label: 'Januari',
            kwh: 128,
            ereCredits: 16,
            sessions: 2
        },

        {
            month: '2026-02-01',
            label: 'Februari',
            kwh: 182,
            ereCredits: 22,
            sessions: 3
        },

        {
            month: '2026-03-01',
            label: 'Maart',
            kwh: 284,
            ereCredits: 35,
            sessions: 5
        },

        {
            month: '2026-04-01',
            label: 'April',
            kwh: 396,
            ereCredits: 48,
            sessions: 7
        },

        {
            month: '2026-05-01',
            label: 'Mei',
            kwh: 482,
            ereCredits: 59,
            sessions: 8
        },

        {
            month: '2026-06-01',
            label: 'Juni',
            kwh: 556,
            ereCredits: 68,
            sessions: 9
        },

        {
            month: '2026-07-01',
            label: 'Juli',
            kwh: 612,
            ereCredits: 76,
            sessions: 10
        },

        {
            month: '2026-08-01',
            label: 'Augustus',
            kwh: 531,
            ereCredits: 66,
            sessions: 9
        },

        {
            month: '2026-09-01',
            label: 'September',
            kwh: 421,
            ereCredits: 52,
            sessions: 7
        },

        {
            month: '2026-10-01',
            label: 'Oktober',
            kwh: 308,
            ereCredits: 38,
            sessions: 6
        },

        {
            month: '2026-11-01',
            label: 'November',
            kwh: 176,
            ereCredits: 22,
            sessions: 4
        },

        {
            month: '2026-12-01',
            label: 'December',
            kwh: 132,
            ereCredits: 17,
            sessions: 2
        }

    ]

};

/**
 * Current widget state.
 */
window.Joulo.state = {

    months: [],
    selectedIndex: 0

};

/**
 * Renders the complete widget.
 *
 * @param {Object} energy
 */
window.Joulo.render = function (energy) {

    if (USE_MOCK_DATA) {
        energy = MOCK_ENERGY;
    }

    if (!energy) {
        return;
    }

    const months = window.Joulo.lastMonths(
        energy.months || []
    );

    window.Joulo.state.months = months;

    let selectedIndex =
        window.Joulo.findSelectedMonthIndex(
            months,
            energy.selectedMonth
        );

    if (selectedIndex < 0) {
        selectedIndex = months.length - 1;
    }

    window.Joulo.state.selectedIndex = selectedIndex;

    window.Joulo.renderTotals(
        energy.totals
    );

    window.Joulo.renderSelectedMonth();

    window.Joulo.updateChart(
        months,
        selectedIndex
    );

    window.Joulo.updateNavigation();

};
/**
 * Updates the totals.
 *
 * @param {Object} totals
 */
window.Joulo.renderTotals = function (totals) {

    if (!totals) {
        return;
    }

    document.getElementById('total-kwh').textContent =
        window.Joulo.formatKwh(
            totals.kwh
        );

    document.getElementById('total-credits').textContent =
        window.Joulo.formatCredits(
            totals.ereCredits
        );

    document.getElementById('total-sessions').textContent =
        window.Joulo.formatInteger(
            totals.sessions
        );

};

/**
 * Updates the selected month.
 */
window.Joulo.renderSelectedMonth = function () {

    const month =
        window.Joulo.state.months[
        window.Joulo.state.selectedIndex
        ];

    if (!month) {
        return;
    }

    document.getElementById('selected-month').textContent =
        month.label;

    document.getElementById('month-kwh').textContent =
        window.Joulo.formatKwh(
            month.kwh
        );

    document.getElementById('month-credits').textContent =
        window.Joulo.formatCredits(
            month.ereCredits
        );

    document.getElementById('month-sessions').textContent =
        window.Joulo.formatInteger(
            month.sessions
        );

};

/**
 * Refreshes navigation buttons and chart.
 */
window.Joulo.updateNavigation = function () {

    const previous =
        document.getElementById(
            'previous-month'
        );

    const next =
        document.getElementById(
            'next-month'
        );

    previous.disabled =
        window.Joulo.state.selectedIndex === 0;

    next.disabled =
        window.Joulo.state.selectedIndex >=
        window.Joulo.state.months.length - 1;

    window.Joulo.updateChart(

        window.Joulo.state.months,

        window.Joulo.state.selectedIndex

    );

};

/**
 * Previous month.
 */
window.Joulo.previous = function () {

    if (
        window.Joulo.state.selectedIndex <= 0
    ) {
        return;
    }

    window.Joulo.state.selectedIndex--;

    window.Joulo.renderSelectedMonth();

    window.Joulo.updateNavigation();

};

/**
 * Next month.
 */
window.Joulo.next = function () {

    if (
        window.Joulo.state.selectedIndex >=
        window.Joulo.state.months.length - 1
    ) {
        return;
    }

    window.Joulo.state.selectedIndex++;

    window.Joulo.renderSelectedMonth();

    window.Joulo.updateNavigation();

};