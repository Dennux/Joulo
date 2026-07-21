'use strict';

window.Joulo = window.Joulo || {};

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