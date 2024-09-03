import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Daftarkan komponen ChartJS
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChart2 = ({ filteredData }) => {
    const data = {
        labels: filteredData.map(item => item.ticketNo),
        datasets: [
            {
                data: filteredData.map(item => item.status === 'Open' ? 1 : 0),
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
            x: { beginAtZero: true, min: 0, max: 5, ticks: { stepSize: 1 } },
            y: { beginAtZero: true },
        },
    };

    return (
        <div style={{ width: '100%', height: '230px', marginTop: '20px' }}>
            <Bar data={data} options={options} />
        </div>
    );
};

export default BarChart2;
