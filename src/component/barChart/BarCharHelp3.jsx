import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChart3 = ({todos}) => {

    const trueCount = todos.filter(todo => todo.completed === true).length;
    const falseCount = todos.filter(todo => todo.completed === false).length;
    const data = {
        labels: ['True ', 'False '], // Menampilkan label dengan jumlah 'True' dan 'False'
        datasets: [
            {
                data: [trueCount, falseCount], // Menggunakan data yang dihitung
                backgroundColor: ['#5971C0', '#D9534F'], // Misalnya, dua warna untuk true dan false
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
            x: { beginAtZero: true, min: 0, max: 20, ticks: { stepSize: 1 } },
            y: { beginAtZero: true },
        },
    };

    return (
        <div style={{ width: '100%', height: '230px', marginTop: '20px' }}>
            <Bar data={data} options={options} />
        </div>
    );
};

export default BarChart3;
