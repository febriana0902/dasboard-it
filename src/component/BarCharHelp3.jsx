import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChart3 = () => {
    const currentYear = new Date().getFullYear();
    const lastFiveYears = Array.from({ length: 5 }, (_, i) => currentYear - i);

    const [selectedYear, setSelectedYear] = useState(lastFiveYears[0]);

    const data = {
        labels: ['PPM1', 'TI1', 'TI2'],
        datasets: [
            {
                data: [15, 25, 35, 45],
                backgroundColor: ['#5971C0'],
                borderWidth: 0,
            },
        ],
    };

    const options = {
        indexAxis: 'y',
        responsive: true,
        plugins: {
            legend: { position: 'top', display: false },
            title: { display: false },
            tooltip: { bodyFont: { size: 12 } },
        },
        scales: {
            x: { beginAtZero: true, min: 0, max: 50, ticks: { stepSize: 10 } },
            y: { beginAtZero: true },
        },
    };

    return (
        <div className="bar-chart-container">
            <div className="filter-container">
                <select
                    className="dropdown"
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(e.target.value)}
                >
                    {lastFiveYears.map((year) => (
                        <option key={year} value={year}>{year}</option>
                    ))}
                </select>
            </div>

            <div style={{ width: '100%', height: '230px', marginTop: '20px' }}>
                <Bar data={data} options={options} />
            </div>
        </div>
    );
};

export default BarChart3;
