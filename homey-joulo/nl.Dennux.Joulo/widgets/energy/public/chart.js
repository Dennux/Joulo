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

        type: 'bar',

        data: {

            labels: [],

            datasets: [

                {
                    label: 'kWh',
                    data: [],
                    yAxisID: 'kwh',
                    backgroundColor: [],
                    borderRadius: 8,
                    borderSkipped: false,
                    maxBarThickness: 18
                },

                {
                    label: 'ERE Credits',
                    data: [],
                    yAxisID: 'credits',
                    backgroundColor: [],
                    borderRadius: 8,
                    borderSkipped: false,
                    maxBarThickness: 18
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

                            return `Credits: ${window.Joulo.formatCredits(
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

    window.Joulo.chart.data.datasets[0].data = months.map(month =>
        month.kwh
    );

    window.Joulo.chart.data.datasets[1].data = months.map(month =>
        month.ereCredits
    );

    window.Joulo.chart.data.datasets[0].backgroundColor =
        months.map((month, index) =>

            index === selectedIndex
                ? '#3B82F6'
                : 'rgba(59,130,246,.28)'

        );

    window.Joulo.chart.data.datasets[1].backgroundColor =
        months.map((month, index) =>

            index === selectedIndex
                ? '#22C55E'
                : 'rgba(34,197,94,.28)'

        );

    window.Joulo.chart.update();

};