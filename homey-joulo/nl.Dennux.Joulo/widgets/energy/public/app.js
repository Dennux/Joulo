'use strict';

let energyData = null;

/**
 * Loads widget data.
 *
 * @param {Homey} Homey
 */
async function load(Homey) {

    try {

        energyData = await Homey.api('GET', '/totals');

        if (!energyData.success) {

            console.error('No energy data available.');

            return;

        }

        window.Joulo.render(
            energyData.energy
        );

    } catch (err) {

        console.error(err);

    }

}

/**
 * Homey ready.
 *
 * @param {Homey} Homey
 */
function onHomeyReady(Homey) {

    Homey.ready();

    window.Joulo.createChart(
        document.getElementById('energy-chart')
    );

    document
        .getElementById('previous-month')
        .addEventListener('click', () => {

            window.Joulo.previous();

        });

    document
        .getElementById('next-month')
        .addEventListener('click', () => {

            window.Joulo.next();

        });

    load(Homey);

}