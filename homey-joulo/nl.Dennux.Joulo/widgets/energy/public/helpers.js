'use strict';

window.Joulo = window.Joulo || {};

/**
 * Formats a number.
 *
 * @param {number|string} value
 * @param {number} decimals
 * @returns {string}
 */
window.Joulo.formatNumber = function (value, decimals = 1) {

    const number = Number(value);

    if (!Number.isFinite(number)) {
        return '0';
    }

    return number.toLocaleString('nl-NL', {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals
    });

};

/**
 * Formats energy.
 *
 * @param {number|string} value
 * @returns {string}
 */
window.Joulo.formatKwh = function (value) {

    return `${window.Joulo.formatNumber(value, 1)} kWh`;

};

/**
 * Formats ERE credits.
 *
 * @param {number|string} value
 * @returns {string}
 */
window.Joulo.formatCredits = function (value) {

    const number = Number(value);

    if (!Number.isFinite(number)) {
        return '0,00';
    }

    return number.toLocaleString('nl-NL', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });

};

/**
 * Formats an integer.
 *
 * @param {number|string} value
 * @returns {string}
 */
window.Joulo.formatInteger = function (value) {

    const number = Number(value);

    if (!Number.isFinite(number)) {
        return '0';
    }

    return Math.round(number).toLocaleString('nl-NL');

};

/**
 * Returns a safe array.
 *
 * @param {*} value
 * @returns {Array}
 */
window.Joulo.safeArray = function (value) {

    return Array.isArray(value)
        ? value
        : [];

};

/**
 * Returns true when data exists.
 *
 * @param {*} value
 * @returns {boolean}
 */
window.Joulo.hasData = function (value) {

    return value !== undefined &&
        value !== null;

};

/**
 * Limits the chart to the last X months.
 *
 * @param {Array} months
 * @param {number} maxMonths
 * @returns {Array}
 */
window.Joulo.lastMonths = function (months, maxMonths = 12) {

    months = window.Joulo.safeArray(months);

    if (months.length <= maxMonths) {
        return months;
    }

    return months.slice(months.length - maxMonths);

};

/**
 * Finds the selected month index.
 *
 * @param {Array} months
 * @param {Object} selectedMonth
 * @returns {number}
 */
window.Joulo.findSelectedMonthIndex = function (months, selectedMonth) {

    if (!selectedMonth) {
        return 0;
    }

    return months.findIndex(month =>
        month.month === selectedMonth.month
    );

};

/**
 * Returns previous month.
 *
 * @param {Array} months
 * @param {number} index
 * @returns {Object|null}
 */
window.Joulo.previousMonth = function (months, index) {

    if (index <= 0) {
        return null;
    }

    return months[index - 1];

};

/**
 * Returns next month.
 *
 * @param {Array} months
 * @param {number} index
 * @returns {Object|null}
 */
window.Joulo.nextMonth = function (months, index) {

    if (index >= months.length - 1) {
        return null;
    }

    return months[index + 1];

};