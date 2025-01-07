// Functions for generating and updating charts

import Chart from 'chart.js/auto';

let chartInstance = null;

export function renderPriorityChart(tasks) {
    const priorityCounts = {
        low: 0,
        medium: 0,
        high: 0
    };

    tasks.forEach(task => {
        const priority = task.Priority.toLowerCase();
        if (priorityCounts.hasOwnProperty(priority)) {
            priorityCounts[priority]++;
        }
    });

    const ctx = document.getElementById('myChart').getContext('2d');

    if (chartInstance) {
        chartInstance.destroy();
    }

    chartInstance = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ['Low', 'Medium', 'High'],
            datasets: [{
                label: 'Number of Tasks',
                data: [priorityCounts.low, priorityCounts.medium, priorityCounts.high],
                backgroundColor: ['#17a2b8', '#ffc107', '#dc3545'],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
                tooltip: {
                    callbacks: {
                        label: function(tooltipItem) {
                            return `${tooltipItem.label}: ${tooltipItem.raw}`;
                        }
                    }
                }
            }
        }
    });
}
