'use strict';

window.Joulo = window.Joulo || {};

window.Joulo.chart = null;

/**
 * Creates the Chart.js chart.
 *
 * @param {HTMLCanvasElement} canvas
 */
window.Joulo.createChart = function (canvas) {

    if (window.Joulo.chart) {
        return;
    }

    window.Joulo.chart = new Chart(canvas, {

        data: {

            labels: [],

            datasets: [

                {
                    type: 'bar',

                    label: 'kWh',

                    data: [],

                    yAxisID: 'kwh',

                    backgroundColor: [],

                    borderRadius: 8,
                    borderSkipped: false,
                    maxBarThickness: 28,

                    order: 10
                },

                {
                    type: 'line',

                    label: 'ERE Credits',

                    data: [],

                    yAxisID: 'credits',

                    borderColor: '#22C55E',
                    backgroundColor: '#22C55E',

                    borderWidth: 3,

                    pointRadius: [],
                    pointHoverRadius: 8,

                    pointBackgroundColor: [],
                    pointBorderColor: '#FFFFFF',
                    pointBorderWidth: 2,

                    tension: 0.35,

                    fill: false,

                    order: 1
                }

            ]

        },

        options: {

            responsive: true,

            maintainAspectRatio: false,

            animation: {
                duration: 300
            },

            interaction: {

                mode: 'index',
                intersect: false

            },

            plugins: {

                legend: {
                    display: false
                },

                tooltip: {

                    callbacks: {

                        title(items) {

                            return window.Joulo.chart.$months[
                                items[0].dataIndex
                            ].label;

                        },

                        label(context) {

                            if (context.datasetIndex === 0) {

                                return `Energie: ${window.Joulo.formatKwh(
                                    context.raw
                                )}`;

                            }

                            return `ERE Credits: ${window.Joulo.formatCredits(
                                context.raw
                            )}`;

                        },

                        footer(items) {

                            const month =
                                window.Joulo.chart.$months[
                                items[0].dataIndex
                                ];

                            return `Sessies: ${window.Joulo.formatInteger(
                                month.sessions
                            )}`;

                        }

                    }

                }

            },

            scales: {

                x: {

                    grid: {
                        display: false
                    },

                    ticks: {

                        color: '#9CA3AF'

                    }

                },

                kwh: {

                    beginAtZero: true,

                    position: 'left',

                    ticks: {
                        display: false
                    },

                    grid: {

                        color: 'rgba(255,255,255,.06)'

                    }

                },

                credits: {

                    beginAtZero: true,

                    position: 'right',

                    ticks: {
                        display: false
                    },

                    grid: {
                        drawOnChartArea: false
                    }

                }

            }

        }

    });

};

/**
 * Refreshes the chart.
 *
 * @param {Array} months
 * @param {number} selectedIndex
 */
window.Joulo.updateChart = function (months, selectedIndex) {

    if (!window.Joulo.chart) {
        return;
    }

    months = window.Joulo.lastMonths(months);

    if (selectedIndex >= months.length) {
        selectedIndex = months.length - 1;
    }

    window.Joulo.chart.$months = months;

    window.Joulo.chart.data.labels = months.map(month =>
        month.label.substring(0, 3)
    );

    // Energie (bars)
    window.Joulo.chart.data.datasets[0].data = months.map(month =>
        month.kwh
    );

    // ERE Credits (line)
    window.Joulo.chart.data.datasets[1].data = months.map(month =>
        month.ereCredits
    );

    const maxCredits = Math.max(
        ...months.map(month => month.ereCredits)
    );

    window.Joulo.chart.options.scales.credits.max =
        Math.ceil(maxCredits / 0.4);

    // Bar colours
    window.Joulo.chart.data.datasets[0].backgroundColor =
        months.map((month, index) =>

            index === selectedIndex
                ? '#3B82F6'
                : 'rgba(59,130,246,.28)'

        );

    // Highlight selected point
    window.Joulo.chart.data.datasets[1].pointRadius =
        months.map((month, index) =>

            index === selectedIndex ? 7 : 4

        );

    window.Joulo.chart.data.datasets[1].pointBackgroundColor =
        months.map((month, index) =>

            index === selectedIndex
                ? '#22C55E'
                : '#16A34A'

        );

    window.Joulo.chart.update();

};