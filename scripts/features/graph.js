export function graphCanvas() {
    const equationInput = document.getElementById('equation-input');
    const canvas = document.getElementById('graph-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let chart;

    function plotGraph() {
        try {
            const expression = equationInput.value.split('=')[1].trim();
            const node = math.parse(expression);
            const compiled = node.compile();

            const xValues = [];
            const yValues = [];

            for (let x = -10; x <= 10; x += 0.5) {
                const scope = { x: x };
                const y = compiled.evaluate(scope);
                xValues.push(x);
                yValues.push(y);
            }

            const data = {
                labels: xValues,
                datasets: [
                    {
                        label: equationInput.value,
                        data: yValues,
                        borderColor: 'rgba(255, 99, 132, 1)',
                        borderWidth: 2,
                        fill: false,
                        tension: 0.1,
                        pointRadius: 0
                    }
                ]
            };

            if (chart) {
                chart.destroy();
            }

            chart = new Chart(ctx, {
                type: 'line',
                data: data,
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        x: {
                            type: 'linear',
                            position: 'bottom',
                            title: {
                                display: true,
                                text: 'X-Axis'
                            }
                        },
                        y: {
                            title: {
                                display: true,
                                text: 'Y-Axis'
                            }
                        }
                    }
                }
            });
        } catch (err) {
            console.error("Error plotting graph:", err);
            if (chart) {
                chart.clear();
            }
        }
    }

    equationInput.addEventListener('keyup', function(event) {
        if (event.key === 'Enter') {
            plotGraph();
        }
    });

    // Initial plot
    const graphingCalculatorTab = document.querySelector('[data-nav-target="graphing-calculator"]');
    graphingCalculatorTab.addEventListener('click', () => {
        setTimeout(plotGraph, 0);
    });

    if(!document.getElementById('graphing-calculator').classList.contains('hidden')) {
        plotGraph();
    }
}