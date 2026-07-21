'use strict';

let energyData = null;
let selectedIndex = 0;

/**
 * Formats a number using the Dutch locale.
 *
 * @param {number} value
 * @param {number} decimals
 * @returns {string}
 */
function formatNumber(value, decimals = 1) {

    return Number(value).toLocaleString('nl-NL', {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals
    });

}

/**
 * Updates the summary values.
 */
function renderTotals() {

    const totals = energyData.energy.totals;

    document.getElementById('total-kwh').textContent =
        `${formatNumber(totals.kwh)} kWh`;

    document.getElementById('total-credits').textContent =
        `€ ${formatNumber(totals.ereCredits, 2)}`;

    document.getElementById('total-sessions').textContent =
        totals.sessions;

}

/**
 * Updates the selected month.
 */
function renderMonth() {

    const month = energyData.energy.months[selectedIndex];

    if (!month) {

        document.getElementById('selected-month').textContent = '--';
        return;

    }

    document.getElementById('selected-month').textContent =
        month.label;

}

/**
 * Updates the chart placeholder.
 *
 * Sprint 3 replaces this with Chart.js.
 */
function renderChartPlaceholder() {

    const month = energyData.energy.months[selectedIndex];

    const placeholder =
        document.getElementById('chart-placeholder');

    if (!month) {

        placeholder.textContent = 'Geen gegevens';

        return;

    }

    placeholder.innerHTML = `
        <strong>${month.kwh.toLocaleString('nl-NL')} kWh</strong><br>
        € ${month.ereCredits.toLocaleString('nl-NL')} credits
    `;

}

/**
 * Refreshes the widget.
 */
function render() {

    renderTotals();
    renderMonth();
    renderChartPlaceholder();

}

/**
 * Select previous month.
 */
function previousMonth() {

    if (selectedIndex <= 0) {
        return;
    }

    selectedIndex--;

    render();

}

/**
 * Select next month.
 */
function nextMonth() {

    if (selectedIndex >= energyData.energy.months.length - 1) {
        return;
    }

    selectedIndex++;

    render();

}

/**
 * Loads widget data.
 *
 * @param {Homey} Homey
 */
async function load(Homey) {

    try {

        energyData = await Homey.api('GET', '/totals');

        if (!energyData.success) {

            document.getElementById('chart-placeholder').textContent =
                'Geen gegevens beschikbaar';

            return;

        }

        selectedIndex =
            Math.max(0, energyData.energy.months.length - 1);

        render();

    } catch (err) {

        console.error(err);

        document.getElementById('chart-placeholder').textContent =
            'Fout bij laden';

    }

}

/**
 * Homey ready.
 *
 * @param {Homey} Homey
 */
function onHomeyReady(Homey) {

    Homey.ready();

    document
        .getElementById('previous-month')
        .addEventListener('click', previousMonth);

    document
        .getElementById('next-month')
        .addEventListener('click', nextMonth);

    load(Homey);

}